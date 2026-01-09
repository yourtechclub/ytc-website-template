import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateKey() {
  return crypto.randomBytes(16).toString('base64');
}

// Client .env
const clientEnv = `# Strapi API
STRAPI_URL=http://localhost:1337
`;

// Server .env
const serverEnv = `# Server
HOST=0.0.0.0
PORT=1337

# Security keys (auto-generated)
APP_KEYS=${generateKey()},${generateKey()}
API_TOKEN_SALT=${generateKey()}
ADMIN_JWT_SECRET=${generateKey()}
TRANSFER_TOKEN_SALT=${generateKey()}
JWT_SECRET=${generateKey()}

# Database (SQLite for dev)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# PostgreSQL (for production)
# DATABASE_CLIENT=postgres
# DATABASE_URL=postgresql://user:password@host:5432/database
`;

const clientEnvPath = path.join(__dirname, '..', 'client', '.env');
const serverEnvPath = path.join(__dirname, '..', 'server', '.env');

// Create client .env if it doesn't exist
if (!fs.existsSync(clientEnvPath)) {
  fs.writeFileSync(clientEnvPath, clientEnv);
  console.log('✅ Created client/.env');
} else {
  console.log('⏭️  client/.env already exists');
}

// Create server .env if it doesn't exist
if (!fs.existsSync(serverEnvPath)) {
  fs.writeFileSync(serverEnvPath, serverEnv);
  console.log('✅ Created server/.env');
} else {
  console.log('⏭️  server/.env already exists');
}

console.log('\n🎉 Environment setup complete!');
console.log('Run `yarn dev` to start the development servers.\n');
