This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CI/CD Pipeline

This project includes a GitHub Actions workflow for automated deployment to Vercel.

### Setup Instructions

1. **Connect your GitHub repository to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." > "Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

2. **Configure GitHub Secrets:**
   - Go to your GitHub repository **Settings** > **Secrets and variables** > **Actions**
   - Click on **"Repository secrets"** tab (not Environment secrets)
   - Click **"New repository secret"**
   - Add the following secret:
     - **Name**: `VERCEL_TOKEN`
     - **Value**: Your Vercel token (get it from Vercel → Settings → Tokens)

3. **Get your Vercel token:**
   - Visit [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions
   - Copy the token and add it as `VERCEL_TOKEN` in GitHub secrets

### Workflow Features

The GitHub Actions workflow (`.github/workflows/deploy.yml`) provides:

- **Linting and Building**: Runs on all pushes and pull requests to `main`
- **Production Deployment**: Deploys to Vercel only on successful pushes to `main`
- **Preview Deployments**: Creates preview deployments for pull requests with automatic URL commenting
- **Caching**: Uses pnpm cache for faster builds
- **Environment Management**: Pulls Vercel environment information before deployment

### Preview URLs

When you create a pull request, the workflow will automatically:
1. Build your application
2. Deploy it to a preview environment on Vercel
3. Comment on the pull request with the preview URL

The preview URL format will be something like: `https://your-project-name-git-your-branch-name.vercel.app`

### Production URL

Once your pull request is merged to `main`, the application will be deployed to production. The production URL format will be: `https://your-project-name.vercel.app`

### Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy to preview (for testing)
vercel
```
