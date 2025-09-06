import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { config } from './config/environment';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { apiRoutes } from './routes';

const app = express();

// Middleware de segurança
app.use(helmet());

// Middleware de CORS
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Middleware de compressão
app.use(compression());

// Middleware de logging
app.use(morgan('combined'));

// Middleware de rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
});
app.use(limiter);

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas da API
app.use('/api', apiRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

// Função para iniciar o servidor
const startServer = async (): Promise<void> => {
  try {
    // Conecta ao banco de dados
    await connectDatabase();

    // Inicia o servidor
    app.listen(config.port, config.host, () => {
      console.log(`🚀 Servidor rodando em http://${config.host}:${config.port}`);
      console.log(`📊 Ambiente: ${config.nodeEnv}`);
      console.log(`🔗 Health check: http://${config.host}:${config.port}/health`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Inicia o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
  startServer();
}

export default app;
