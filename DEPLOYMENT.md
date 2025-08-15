# GitHub Pages Deployment Guide

## 🚀 Quick Start

Your Next.js app is now configured for automatic deployment to GitHub Pages!

### What's Already Set Up

1. ✅ **Next.js Configuration**: Static export enabled with `output: "export"`
2. ✅ **GitHub Actions Workflow**: Automatic build and deploy on push to main
3. ✅ **Base Path Configuration**: Properly configured for repository name `/svghub`

### Steps to Deploy

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically handle deployment

3. **Wait for Deployment**:
   - Check the "Actions" tab in your repository
   - The workflow will build and deploy your site
   - Your site will be available at: `https://[your-username].github.io/svghub`

### Troubleshooting

#### Build Fails
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify the build works locally with `npm run build`

#### 404 Errors
- Make sure your repository is public (required for free GitHub Pages)
- Check that the base path in `next.config.mjs` matches your repository name
- Ensure all internal links use relative paths

#### Assets Not Loading
- Verify `assetPrefix` is set correctly in `next.config.mjs`
- Check that images and other assets are in the `public/` directory
- Ensure all asset paths are relative

### Manual Deployment (if needed)

If you prefer manual deployment:

1. Build locally:
   ```bash
   npm run build
   ```

2. The static files will be in the `out/` directory

3. Upload the contents of `out/` to your GitHub Pages branch

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure your domain's DNS settings
3. Update the domain in GitHub repository settings

### Performance Tips

- Images are already configured as `unoptimized: true` for static export
- Consider using WebP format for better compression
- Enable gzip compression on your web server if possible

## 🎉 Success!

Once deployed, your SVG Hub will be live at:
`https://[your-username].github.io/svghub`
