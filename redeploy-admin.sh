cd ../Appliance-Shop-Admin
git remote update 2>log && rm log
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Admin: Up-to-date"
else
    git reset --hard 2>log && rm log
    echo "Admin: Pulling from git..."
    git pull 2>log && rm log
    echo "Admin: Rebuilding..."
    /www/server/nodejs/v18.20.3/bin/yarn build 2>log && rm log
fi

