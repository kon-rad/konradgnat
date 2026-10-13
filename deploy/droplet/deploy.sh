#!/usr/bin/env bash
# Deploy konradgnat.com on the secondbrain droplet. Run on the droplet as a sudoer:
#   bash /srv/konradgnat/site/deploy/droplet/deploy.sh
# Pulls master, installs deps, builds, restarts. The env file /etc/konradgnat/env (DATABASE_URL to the local
# Postgres db `konradgnat`, NEXT_PUBLIC_* build vars) is made once by hand and never lives in the repo.
set -euo pipefail
SITE=/srv/konradgnat/site
HERE=$SITE/deploy/droplet
as_site() { sudo -u konradgnat env HOME=/srv/konradgnat COREPACK_ENABLE_DOWNLOAD_PROMPT=0 bash -c "set -a; . /etc/konradgnat/env; set +a; cd $SITE/nextjs; $1"; }

sudo -u konradgnat git -C "$SITE" pull --ff-only
as_site 'corepack yarn install --frozen-lockfile --non-interactive'
as_site 'npx prisma generate'
as_site 'corepack yarn build'

sudo install -m 644 "$HERE/konradgnat.service" /etc/systemd/system/konradgnat.service
sudo install -m 644 "$HERE/Caddyfile.konradgnat" /etc/caddy/Caddyfile.konradgnat
sudo systemctl daemon-reload
sudo systemctl enable konradgnat >/dev/null
sudo systemctl restart konradgnat
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null
sudo chown -R caddy:caddy /var/log/caddy
sudo systemctl reload caddy

for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3100/ || true)
  [ "$code" = 200 ] && { echo "konradgnat: up (HTTP 200)"; exit 0; }
  sleep 2
done
echo "konradgnat: not answering on 127.0.0.1:3100 (last code $code)"; sudo journalctl -u konradgnat -n 30 --no-pager; exit 1
