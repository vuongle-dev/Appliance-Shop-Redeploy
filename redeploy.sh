cd ../Appliance-Shop-API
git remote update 2>log && rm log
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
else
    git reset --hard 2>log && rm log
    echo "Pulling from git..."
    git pull 2>log && rm log
    echo "Rebuilding..."
    /www/server/nodejs/v18.20.3/bin/yarn build
fi

