#!/bin/bash

# Script bash permettant de vérifier si le dépot local est à jour avec le dépot distant.
# Si oui, reset tout (pour éviter un conflit avec git pull) et récupère la dernière version sur git.
# 
# A mettre dans la crontab avec : (exécution toutes les 2min)
# */2 * * * * /home/lanouvellerepublique/Hyblab2026/lanouvellerepublque/git_checker.sh 

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