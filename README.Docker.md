# Docker Deployment Guide

This guide explains how to deploy the Temp Editor using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository and navigate to the project directory**
   ```bash
   cd temp-editor
   ```

2. **Create environment file** (optional)
   ```bash
   cp .env.example .env
   ```

   Edit `.env` to configure your settings:
   - `FILE_STORAGE=local` - Use local blob URLs (no server upload)
   - `FILE_STORAGE=directus` - Use Directus API for file storage

3. **Build and run the container**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**

   Open your browser and navigate to: http://localhost:3131

5. **View logs**
   ```bash
   docker-compose logs -f temp-editor
   ```

6. **Stop the container**
   ```bash
   docker-compose down
   ```

### Using Docker CLI

1. **Build the Docker image**
   ```bash
   docker build -t temp-editor .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     --name temp-editor \
     -p 3131:3131 \
     -e FILE_STORAGE=local \
     temp-editor
   ```

3. **Access the application**

   Open your browser and navigate to: http://localhost:3131

4. **Stop and remove the container**
   ```bash
   docker stop temp-editor
   docker rm temp-editor
   ```

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `HOST` | Server host | `0.0.0.0` | No |
| `PORT` | Server port | `3131` | No |
| `FILE_STORAGE` | File storage mode (`local` or `directus`) | `local` | No |
| `DIRECTUS_TOKEN` | Directus API token | - | Yes (if `FILE_STORAGE=directus`) |
| `DIRECTUS_URL` | Directus API URL | - | Yes (if `FILE_STORAGE=directus`) |
| `DIRECTUS_FOLDER_ID` | Directus folder ID for uploads | - | Yes (if `FILE_STORAGE=directus`) |
| `NUXT_PUBLIC_GA_ID` | Google Analytics ID | - | No |

### File Storage Modes

#### Local Mode (Default)
- Files are stored as browser blob URLs
- No server-side storage required
- Best for development and testing

#### Directus Mode
- Files are uploaded to Directus CMS
- Requires Directus instance
- Best for production with persistent storage

Example Directus configuration:
```bash
FILE_STORAGE=directus
DIRECTUS_TOKEN=your-token-here
DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_FOLDER_ID=your-folder-uuid
```

## Custom Port

To run on a different port:

**Docker Compose:**
```yaml
ports:
  - "8080:3131"
```

**Docker CLI:**
```bash
docker run -d -p 8080:3131 temp-editor
```

Then access at: http://localhost:8080

## Health Check

The container includes a health check that verifies the application is running properly:

```bash
docker inspect --format='{{json .State.Health}}' temp-editor
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs temp-editor
```

### Port already in use
```bash
# Use a different port
docker-compose down
# Edit docker-compose.yml to change port
docker-compose up -d
```

### Permission issues
```bash
# On Linux, you may need to adjust permissions
sudo chown -R $USER:$USER .
```

## Production Deployment

For production deployment, consider:

1. **Use environment-specific `.env` files**
2. **Enable HTTPS** with a reverse proxy (nginx, Caddy, Traefik)
3. **Set up monitoring** and log aggregation
4. **Configure backups** for persistent data
5. **Use Docker secrets** for sensitive information

Example nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3131;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Updating

To update to the latest version:

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Support

For issues and questions:
- GitHub: https://github.com/tuutoo/temp-editor
- Issues: https://github.com/tuutoo/temp-editor/issues
