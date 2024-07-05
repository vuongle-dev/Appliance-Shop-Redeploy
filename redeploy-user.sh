cd ../Appliance-Shop-Users
git remote update
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "User: Up-to-date"
else
    git reset -q --hard
    echo "User: Pulling from git..."
    git -q pull
    echo "User: Rebuilding..."
    /www/server/nodejs/v18.20.3/bin/yarn build
    echo "User: Restarting project"
fi

