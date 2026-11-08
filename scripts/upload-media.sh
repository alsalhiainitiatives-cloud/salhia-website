#!/usr/bin/env bash
# Upload everything in ./media to the R2 bucket. Needs: CLOUDFLARE_API_TOKEN (R2 edit) and CLOUDFLARE_ACCOUNT_ID.
set -euo pipefail
BUCKET="${R2_BUCKET:-salhiyah-media}"
cd "$(dirname "$0")/../media"
find . -type f ! -name '.DS_Store' | sed 's|^\./||' | while read -r f; do
  ct=$(file --mime-type -b "$f")
  echo "-> $f"
  npx --yes wrangler r2 object put "$BUCKET/$f" --file "$f" --content-type "$ct" --cache-control "public, max-age=31536000, immutable" --remote
done
