// src/constants/env.ts
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,

  // URLs
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',

  // Auth
  JWT_SECRET: process.env.JWT_SECRET || 'change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dbname',

  // External Services
  STRIPE_KEY: process.env.STRIPE_KEY || '',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',

  // Feature flags
  FEATURE_X_ENABLED: process.env.FEATURE_X_ENABLED === 'true',

  // Analytics
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',

  USERNAME: process.env.ADMIN_USERNAME || '',
  PASSWORD: process.env.ADMIN_PASSWORD || '',
};

export default ENV;