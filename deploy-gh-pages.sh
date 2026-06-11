#!/bin/bash
# Build the project
pnpm build

# Create a temporary directory for deployment
mkdir -p gh-pages-deploy
cd gh-pages-deploy

# Initialize a new git repo for gh-pages
git init
git config user.email "bot@github.com"
git config user.name "Deploy Bot"

# Copy built files
cp -r ../dist/public/* .

# Add all files
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push -f https://github.com/rintuchowdory/portfolio-analytics-dashboard.git HEAD:gh-pages

echo "✓ Deployed to GitHub Pages!"
echo "Visit: https://rintuchowdory.github.io/portfolio-analytics-dashboard/"
