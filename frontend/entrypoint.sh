#!/bin/sh

# Wait for the database to be ready
until npx prisma db push --skip-generate; do
  echo "Waiting for the database..."
  sleep 2
done

# Run migrations
npx prisma migrate dev --skip-seed

# Start the application
npm run dev

