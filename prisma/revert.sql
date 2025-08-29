npx prisma migrate diff `
  --from-url "$env:DATABASE_URL" `
  --to-migrations ./prisma/migrations `
  --script > prisma/revert.sql
