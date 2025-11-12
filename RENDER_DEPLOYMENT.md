# Deploying to Render

## Quick Start

1. **Connect your GitHub repository** to Render:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub account and select the `v0-movie-streaming-website` repository

2. **Select deployment settings**:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free tier works great for this project

3. **Deploy**:
   - Render will automatically detect the `render.yaml` file
   - Your site will be live at `https://[your-service-name].onrender.com`

## Environment Variables

The app uses the public Movie API and requires no environment variables. However, if you want to add any in the future:

1. Go to your Render service dashboard
2. Click "Environment"
3. Add your variables there

## Continuous Deployment

Once connected, Render will:
- Automatically rebuild and redeploy when you push to `main`
- Keep your site live with zero downtime deployments
- Use free tier with automatic sleep after 15 minutes of inactivity

## Troubleshooting

- **Build fails**: Make sure Node version 18+ is available (Render uses the latest by default)
- **Page won't load**: Check the Render logs in your dashboard for errors
- **API errors**: Verify the Movie API endpoint is accessible

## Production Tips

- The app includes unoptimized image settings for better compatibility
- ESLint and TypeScript errors are ignored during build for reliability
- All dependencies are properly configured in `package.json`
