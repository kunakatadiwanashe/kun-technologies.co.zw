// import type { Config } from '@prisma/client/runtime/library';

const config = {
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts',
  },
};

export default config;

