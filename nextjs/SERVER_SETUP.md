# Server Setup Guide for konradgnat.com

This guide will help you set up your Next.js application on a Digital Ocean Ubuntu server.

## Prerequisites

- Ubuntu 20.04 or 22.04 LTS server
- Domain name (konradgnat.com) pointing to your server's IP
- Root or sudo access

## 1. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (required for Next.js 15)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node --version  # Should be v20.x

# Install Yarn
npm install -g yarn

# Install PM2 globally
npm install -g pm2

# Install nginx
sudo apt install -y nginx

# Install Git (if not already installed)
sudo apt install -y git
```

## 2. Clone Your Repository

```bash
# Create directory for your app
sudo mkdir -p /var/www/konradgnat
sudo chown -R $USER:$USER /var/www/konradgnat

# Clone your repository
cd /var/www
git clone https://github.com/yourusername/konradgnat.git
cd konradgnat/nextjs

# Install dependencies
yarn install

# Create .env file with your environment variables
nano .env
```

## 3. Configure Environment Variables

Create a `.env` file in `/var/www/konradgnat/nextjs/`:

```env
# Add your environment variables here
NODE_ENV=production
# DATABASE_URL=...
# Any other secrets or configuration
```

## 4. Build and Start the Application

```bash
# Generate Prisma client and push database schema
yarn prisma:generate
yarn prisma:push

# Build the Next.js application
yarn build

# Start with PM2 on port 3044
PORT=3044 pm2 start yarn --name "konradgnat" -- start

# Save PM2 configuration to restart on reboot
pm2 save
pm2 startup
# Follow the command that PM2 outputs
```

## 5. Configure Nginx

```bash
# Copy the nginx configuration file
sudo cp /var/www/konradgnat/nextjs/nginx-konradgnat.conf /etc/nginx/sites-available/konradgnat.com

# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/konradgnat.com /etc/nginx/sites-enabled/

# Remove default nginx site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

## 6. Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate (temporarily comment out SSL lines in nginx config first)
sudo certbot --nginx -d konradgnat.com -d www.konradgnat.com

# Certbot will automatically configure SSL in your nginx config
# Test automatic renewal
sudo certbot renew --dry-run
```

## 7. Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check firewall status
sudo ufw status
```

## 8. Make Deploy Script Executable

```bash
cd /var/www/konradgnat/nextjs
chmod +x deploy.sh
```

## Deployment Workflow

After initial setup, deploy updates using:

```bash
cd /var/www/konradgnat/nextjs
./deploy.sh
```

The deploy script will:
1. Pull latest code from git
2. Install dependencies
3. Run Prisma migrations
4. Build the application
5. Restart PM2 process

## Useful Commands

### PM2 Commands
```bash
pm2 list                    # List all processes
pm2 logs konradgnat         # View logs
pm2 restart konradgnat      # Restart app
pm2 stop konradgnat         # Stop app
pm2 monit                   # Monitor resources
pm2 describe konradgnat     # Show process details
```

### Nginx Commands
```bash
sudo systemctl status nginx    # Check nginx status
sudo systemctl restart nginx   # Restart nginx
sudo systemctl reload nginx    # Reload nginx config
sudo nginx -t                  # Test nginx config
```

### Check Logs
```bash
# PM2 logs
pm2 logs konradgnat

# Nginx access logs
sudo tail -f /var/log/nginx/konradgnat.com.access.log

# Nginx error logs
sudo tail -f /var/log/nginx/konradgnat.com.error.log

# System logs
sudo journalctl -u nginx -f
```

## Troubleshooting

### Application not starting
```bash
# Check PM2 logs
pm2 logs konradgnat

# Check if port 3044 is in use
sudo lsof -i :3044

# Manually test the app
cd /var/www/konradgnat/nextjs
PORT=3044 yarn start
```

### Nginx 502 Bad Gateway
```bash
# Check if Next.js is running
pm2 status

# Check nginx error logs
sudo tail -f /var/log/nginx/konradgnat.com.error.log

# Verify proxy_pass points to correct port (3044)
```

### SSL Certificate Issues
```bash
# Renew certificates manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

## Database Backup (If using SQLite)

```bash
# Backup SQLite database
cp /var/www/konradgnat/nextjs/prisma/dev.db /var/www/konradgnat/backups/dev.db.$(date +%Y%m%d)

# Set up automated backups with cron
crontab -e
# Add: 0 2 * * * cp /var/www/konradgnat/nextjs/prisma/dev.db /var/www/konradgnat/backups/dev.db.$(date +\%Y\%m\%d)
```

## Monitoring

Set up monitoring to track your application:

```bash
# Install monitoring tools
pm2 install pm2-logrotate

# Configure log rotation (keeps logs manageable)
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Security Best Practices

1. Keep system updated: `sudo apt update && sudo apt upgrade`
2. Use strong SSH keys instead of passwords
3. Configure fail2ban: `sudo apt install fail2ban`
4. Keep Node.js and dependencies updated
5. Regularly review nginx and PM2 logs
6. Set up automated backups for your database

## Production Checklist

- [ ] Environment variables configured in `.env`
- [ ] Database migrations run successfully
- [ ] Application builds without errors
- [ ] PM2 process running and saved
- [ ] PM2 startup script configured
- [ ] Nginx configuration tested and reloaded
- [ ] SSL certificate installed and auto-renewal working
- [ ] Firewall configured (UFW)
- [ ] DNS records pointing to server
- [ ] Logs rotation configured
- [ ] Backup strategy in place
- [ ] Monitoring set up
