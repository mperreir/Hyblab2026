#!/bin/bash

REPO_DIR="/home/lanouvellerepublique/Hyblab2026"
BRANCH="main"

cd "$REPO_DIR"
git fetch origin "$BRANCH"

LOCAL_HASH=$(git rev-parse "$BRANCH")
REMOTE_HASH=$(git rev-parse "origin/$BRANCH")

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
    git clean -fd
    git reset --hard "origin/$BRANCH"

    cd lanouvellerepublique
    npm run build
    cd ..
    pm2 restart all
fi