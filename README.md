# Projeto Node.js com TypeScript

Este é um projeto Node.js completo com TypeScript, Express, MongoDB e todas as ferramentas necessárias para desenvolvimento moderno.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Jest** - Framework de testes
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **Helmet** - Middleware de segurança
- **CORS** - Middleware para CORS
- **Morgan** - Logger de requisições HTTP

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações da aplicação
│   ├── database.ts   # Configuração do MongoDB
│   └── environment.ts # Variáveis de ambiente
├── controllers/      # Controladores (lógica de negócio)
├── middleware/       # Middlewares customizados
├── models/          # Modelos do Mongoose
├── routes/          # Definição das rotas
├── services/        # Serviços (regras de negócio)
├── types/           # Definições de tipos TypeScript
├── utils/           # Utilitários
├── __tests__/       # Testes automatizados
└── index.ts         # Arquivo principal da aplicação
```

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd nodejs-project
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/nodejs-project
   JWT_SECRET=seu_jwt_secret_super_seguro_aqui
   ```

4. **Inicie o MongoDB**
   - Instale o MongoDB localmente ou use MongoDB Atlas
   - Certifique-se de que o MongoDB está rodando na porta 27017

## 🚀 Como Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Testes
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Linting e Formatação
```bash
# Verificar problemas de lint
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Formatar código
npm run format
```

## 📚 API Endpoints

### Health Check
- `GET /health` - Verificar status da aplicação

### Usuários
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Exemplo de Requisição

**Criar usuário:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456",
    "age": 30
  }'
```

**Listar usuários:**
```bash
curl http://localhost:3000/api/users
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em modo produção
- `npm test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:coverage` - Executa os testes com relatório de cobertura
- `npm run lint` - Verifica problemas de lint
- `npm run lint:fix` - Corrige problemas de lint automaticamente
- `npm run format` - Formata o código
- `npm run clean` - Remove a pasta dist

## 🛡️ Segurança

O projeto inclui várias medidas de segurança:

- **Helmet** - Headers de segurança HTTP
- **CORS** - Configuração de Cross-Origin Resource Sharing
- **Rate Limiting** - Limitação de requisições por IP
- **Validação de dados** - Validação com Joi
- **Hash de senhas** - Senhas são hasheadas com bcrypt
- **Sanitização** - Sanitização de dados de entrada

## 🧪 Testes

O projeto usa Jest para testes automatizados:

- Testes unitários para serviços
- Testes de integração para rotas
- Cobertura de código
- Setup e teardown automático

## 📝 Configuração do TypeScript

O projeto está configurado com TypeScript strict mode:

- Verificação rigorosa de tipos
- Path mapping para imports
- Configuração otimizada para Node.js
- Suporte a decorators

## 🔍 Linting e Formatação

- **ESLint** - Análise estática do código
- **Prettier** - Formatação automática
- **TypeScript ESLint** - Regras específicas para TypeScript

## 📊 Monitoramento

- Logs estruturados com Morgan
- Health check endpoint
- Tratamento de erros centralizado
- Métricas de performance

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente de produção
2. Execute `npm run build`
3. Execute `npm start`
4. Configure um proxy reverso (nginx, Apache)
5. Configure SSL/TLS
6. Configure monitoramento e logs

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Verifique se o MongoDB está rodando
3. Verifique as variáveis de ambiente
4. Consulte os logs de erro
5. Abra uma issue no repositório

---

**Desenvolvido com ❤️ usando Node.js e TypeScript**
