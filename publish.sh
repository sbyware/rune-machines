#!/bin/bash

pubtype=$1

if [ -z "$pubtype" ]; then
  echo "Usage: ./publish <major|minor|patch>"
  exit 1
fi

if [ "$pubtype" != "major" ] && [ "$pubtype" != "minor" ] && [ "$pubtype" != "patch" ]; then
  echo "Usage: ./publish <major|minor|patch>"
  exit 1
fi

git add -A .
git commit -m "chore: publish $pubtype"
pnpm version $pubtype
pnpm lint
pnpm package
pnpm publish
git push