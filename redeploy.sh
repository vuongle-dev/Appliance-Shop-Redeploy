cd ../Appliance-Shop-API
git -q remote update
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
else
    git -q reset --hard
    echo "Pulling from git..."
    git -q pull
    echo "Rebuilding..."
    /www/server/nodejs/v18.20.3/bin/yarn build
fi

