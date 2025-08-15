# SVG Hub

A modern Next.js application for SVG management and conversion.

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages.

### Prerequisites

1. Make sure your repository is public (GitHub Pages requires this for free accounts)
2. Ensure you have the main branch as your default branch

### Automatic Deployment

The project uses GitHub Actions to automatically deploy to GitHub Pages:

1. **Push to main branch**: Any push to the main branch will trigger a build and deployment
2. **Pull requests**: Pull requests will trigger a build for testing but won't deploy

### Manual Setup (if needed)

If you need to set up GitHub Pages manually:

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically handle the rest

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Project Structure

- `app/` - Next.js app directory with pages and components
- `components/` - Reusable UI components
- `public/` - Static assets
- `.github/workflows/` - GitHub Actions deployment workflow

### Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Framer Motion