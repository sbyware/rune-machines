#!/bin/bash

pubtype=$1
note=$2

if [ -z "$pubtype" ]; then
  echo "Usage: ./publish <major|minor|patch> <note>"
  exit 1
fi

if [ -z "$note" ]; then
  echo "Usage: ./publish <major|minor|patch> <note>"
  exit 1
fi

if [ "$pubtype" != "major" ] && [ "$pubtype" != "minor" ] && [ "$pubtype" != "patch" ]; then
  echo "Usage: ./publish <major|minor|patch>"
  exit 1
fi

echo "Publishing $pubtype ($note)"
git add -A .
git commit -m "chore: publish $pubtype ($note)"
pnpm version $pubtype
pnpm lint
pnpm package
pnpm publish
git push
echo "Done"