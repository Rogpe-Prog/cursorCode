import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

export const config = {
  // Configurações do servidor
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: parseInt(process.env['PORT'] || '3000', 10),
  host: process.env['HOST'] || 'localhost',

  // Configurações do banco de dados
  mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/nodejs-project',
  mongodbTestUri: process.env['MONGODB_TEST_URI'] || 'mongodb://localhost:27017/nodejs-project-test',

  // Configurações de autenticação
  jwtSecret: process.env['JWT_SECRET'] || 'fallback-secret-key',
  jwtExpiresIn: process.env['JWT_EXPIRES_IN'] || '7d',
  bcryptRounds: parseInt(process.env['BCRYPT_ROUNDS'] || '12', 10),

  // Configurações de rate limiting
  rateLimitWindowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100', 10),

  // Configurações de CORS
  corsOrigin: process.env['CORS_ORIGIN'] || 'http://localhost:3000',

  // Configurações de logs
  logLevel: process.env['LOG_LEVEL'] || 'info',
} as const;

// Validação das variáveis obrigatórias
const requiredEnvVars = ['JWT_SECRET'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`❌ Variável de ambiente obrigatória não encontrada: ${envVar}`);
  }
}
