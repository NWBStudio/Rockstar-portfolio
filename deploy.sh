#!/bin/sh

message="${1:-Uptade gh-pages}"

git branch --delete --force gh-pages
git checkout --orphan gh-pages
git add -f dist
git commit -m $message
git filter-branch -f --prune-empty --subdirectory-filter dist
git push -f origin gh-pages