# InterIITBackend


Express + TypeScript + Prisma (SQLite dev) API for posts and nested comments with replies/upvotes. Includes domain-based login (demo) and input validation (Zod).


## 🚀 Quick Start (Windows 11)
```bash
git clone https://github.com/silentwraith-syed/InterIITBackend.git
cd InterIITBackend
npm init -y
npm i express cors dotenv zod bcryptjs jsonwebtoken
npm i -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken prisma
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --module commonjs --target ES2020
npx prisma init --datasource-provider sqlite