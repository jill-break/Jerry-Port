# Deployment Guide - Render

This guide will walk you through deploying your Next.js portfolio application to Render.

## Prerequisites

- GitHub account with your repository pushed
- Render account (free tier available at [render.com](https://render.com))
- Render PostgreSQL database

## Step 1: Connect Your GitHub Repository

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** → **Web Service**
3. Click **Connect a repository**
4. Select your GitHub account and authorize Render
5. Find and select your portfolio repository
6. Click **Connect**

## Step 2: Configure Your Web Service

### Basic Settings

- **Name**: `portfolio` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Build Command**:
  ```
  npm install && npm run build
  ```
- **Start Command**:
  ```
  npm run start
  ```

### Plan

- Select **Free** plan (or Starter if you need more resources)

## Step 3: Create PostgreSQL Database

1. In Render dashboard, click **New +** → **PostgreSQL**
2. Configure your database:
   - **Name**: `portfolio-db`
   - **Region**: Same as your Web Service
   - **PostgreSQL Version**: 16
   - **Plan**: Free (or Starter for production)
3. Click **Create Database**
4. Wait for the database to be ready (shows "Available")
5. Copy the **External Database URL** (you'll need this next)

## Step 4: Set Environment Variables

In your Web Service, click **Environment** and add these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Render PostgreSQL External Database URL |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app-name.onrender.com` |
| `NODE_ENV` | `production` |

> 💡 **Tip**: If your Web Service and PostgreSQL are in the same region, use the **Internal Database URL** instead for better performance and lower latency.

## Step 5: Deploy

1. Click **Deploy** to start the deployment
2. Monitor the logs in the **Logs** tab
3. Once deployment is complete (status shows "Live"), you can access your app at:
   ```
   https://<your-app-name>.onrender.com
   ```

## Step 6: Initialize Database (First Time Only)

After deployment, run migrations and seed the database:

1. Click the **Shell** tab on your Render Web Service
2. Run these commands:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

> **Note**: Use `prisma migrate deploy` (not `dev`) in production to apply existing migrations without creating new ones.

## Automatic Deployments

Your app will automatically redeploy when you push to your GitHub branch (configured in Step 1).

## Environment Variables for Deployment

| Variable          | Value                              | Notes                             |
| ----------------- | ---------------------------------- | --------------------------------- |
| `NEXTAUTH_SECRET` | Generated random string            | Keep secure - don't commit        |
| `NEXTAUTH_URL`    | `https://your-domain.onrender.com` | Update to your actual domain      |
| `NODE_ENV`        | `production`                       | Required for Next.js optimization |
| `DATABASE_URL`    | Render PostgreSQL URL              | Use Internal URL if same region   |

## Troubleshooting

### Build Fails

- Check logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility (Next.js 16 needs Node 18+)

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly in Environment variables
- Ensure the PostgreSQL database is in "Available" status
- Test connection string format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
- If using Internal URL, ensure Web Service and DB are in the same region

### Port Issues

- Render automatically handles port binding on `PORT` 10000+
- Next.js should listen on the port Render assigns (via `PORT` env var)
- Dockerfile should expose the correct port

### App Crashes After Deploy

- Check error logs in Render dashboard
- Ensure migrations ran successfully
- Verify all required environment variables are set
- Check for any hardcoded `localhost` URLs

### Static Files Not Loading

- Clear Render's cache and redeploy
- Verify `next.config.ts` configuration
- Check `/public` folder is included in build

## Custom Domain

To add a custom domain:

1. Go to your Render service settings
2. Click **Custom Domain**
3. Enter your domain name
4. Follow DNS configuration instructions from your domain provider
5. Update `NEXTAUTH_URL` environment variable to your custom domain

## Monitoring

- **Logs**: Check real-time logs in the Logs tab
- **Metrics**: View CPU, memory, and request metrics in Dashboard
- **Error Tracking**: Enable Sentry or similar for production errors

## Database Backup

Render PostgreSQL includes automatic daily backups:

- **Free tier**: 7 days of backup retention
- **Paid tiers**: Up to 30 days with point-in-time recovery
- Access backups from your PostgreSQL dashboard → **Backups** tab

## Next Steps

- Add custom domain for professional appearance
- Set up email notifications for deployment failures
- Monitor performance metrics
- Plan database migration strategy if scaling

## Resources

- [Render Documentation](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Configuration](https://next-auth.js.org/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**Need help?** Check Render's support: support.render.com
