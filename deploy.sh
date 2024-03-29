#!/usr/bin/env bash

# PROJECT_NAME="Name or your frontend project, for example movie --> folder you created under /var/www/public"
# DROPLET_URL="URL for your droplet"
#!/usr/bin/env bash

# PROJECT_NAME="Name or your frontend project, for example movie --> folder you created under /var/www/public"
# DROPLET_URL="URL for your droplet"
PROJECT_NAME="exam"
DROPLET_URL='207.154.213.60'

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./dist/* root@$DROPLET_URL:/var/www/public/$PROJECT_NAME
