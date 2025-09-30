# Deployment Guides

This document covers how to deploy Brewventy to various platforms.

## Netlify

1. Create a new site in Netlify dashboard.
2. Connect your GitHub repository.
3. Set build command: `npm run build` and publish directory: `_site`.
4. Add environment variables if needed.
5. Deploy!

## Vercel

1. Install Vercel CLI: `npm install -g vercel`.
2. Run `vercel` in project root and follow prompts.
3. Set framework to ‘Other’ and build command `npm run build`, output directory `_site`.
4. Deploy with `vercel --prod`.

## GitHub Pages

1. Add `gh-pages` package: `npm install gh-pages --save-dev`.
2. Add scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d _site"
   }
   ```
3. Run `npm run deploy`.
4. In GitHub settings, enable GitHub Pages from `gh-pages` branch.
5. Deploy using Github Workflows (see `.github/workflows/github_workflow_gh-pages.yml`).

## Custom Server / Other Platforms

- Simply run `npm run build` and serve `_site` directory with any static server.