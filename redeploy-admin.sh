cd ../Appliance-Shop-Admin
git remote update
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Admin: Up-to-date"
else
    git reset -q --hard
    echo "Admin: Pulling from git..."
    git pull -q
    echo "Admin: Rebuilding..."
    /www/server/nodejs/v18.20.3/bin/yarn build
fi

