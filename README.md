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
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações da aplicação
│   ├── database.ts   # Configuração do MongoDB
│   └── environment.ts # Variáveis de ambiente
├── controllers/      # Controladores (lógica de apresentação)
│   ├── authController.ts # Controlador de autenticação
│   └── userController.ts # Controlador de usuários
├── middleware/       # Middlewares customizados
│   ├── auth.ts       # Middleware de autenticação
│   ├── authValidation.ts # Validação de dados de auth
│   ├── errorHandler.ts   # Tratamento de erros
│   ├── notFoundHandler.ts # Rota não encontrada
│   └── validation.ts # Validação de dados
├── models/          # Modelos do Mongoose
│   └── User.ts      # Modelo de usuário
├── routes/          # Definição das rotas
│   ├── authRoutes.ts # Rotas de autenticação
│   ├── userRoutes.ts # Rotas de usuários
│   └── index.ts     # Roteador principal
├── services/        # Serviços (regras de negócio)
│   ├── authService.ts # Serviço de autenticação
│   └── userService.ts # Serviço de usuários
├── types/           # Definições de tipos TypeScript
│   └── index.ts     # Tipos globais
├── utils/           # Utilitários
├── __tests__/       # Testes automatizados
│   ├── setup.ts     # Configuração dos testes
│   └── user.test.ts # Testes de usuários
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
   # Configurações do Servidor
   NODE_ENV=development
   PORT=3000
   HOST=localhost
   
   # Configurações do Banco de Dados
   MONGODB_URI=mongodb://localhost:27017/nodejs-project
   MONGODB_TEST_URI=mongodb://localhost:27017/nodejs-project-test
   
   # Configurações de Autenticação
   JWT_SECRET=seu_jwt_secret_super_seguro_aqui
   JWT_EXPIRES_IN=7d
   BCRYPT_ROUNDS=12
   
   # Configurações de Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # Configurações de CORS
   CORS_ORIGIN=http://localhost:3000
   
   # Configurações de Logs
   LOG_LEVEL=info
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

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil do usuário autenticado

### Usuários
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Exemplos de Requisição

**Registrar usuário:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "minhasenha123",
    "age": 30
  }'
```

**Fazer login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "minhasenha123"
  }'
```

**Obter perfil (com token):**
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Criar usuário (via CRUD):**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "password": "123456",
    "age": 25
  }'
```

**Listar usuários:**
```bash
curl http://localhost:3000/api/users
```

## 📱 Testando com Postman

### **1. Configuração Inicial:**
1. Crie uma nova coleção no Postman
2. Configure a variável `baseUrl` = `http://localhost:3000`
3. Configure a variável `token` (será preenchida após login)

### **2. Fluxo de Teste Completo:**

#### **Passo 1: Registrar Usuário**
- **Método:** `POST`
- **URL:** `{{baseUrl}}/api/auth/register`
- **Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "minhasenha123",
  "age": 30
}
```

#### **Passo 2: Fazer Login**
- **Método:** `POST`
- **URL:** `{{baseUrl}}/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "joao@email.com",
  "password": "minhasenha123"
}
```
- **Copie o token** da resposta para a variável `token`

#### **Passo 3: Acessar Perfil (Autenticado)**
- **Método:** `GET`
- **URL:** `{{baseUrl}}/api/auth/profile`
- **Headers:** `Authorization: Bearer {{token}}`

### **3. Exemplos de Respostas:**

#### **Registro Bem-sucedido:**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "user": { /* dados do usuário */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

#### **Login Bem-sucedido:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": { /* dados do usuário */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

#### **Erro de Credenciais:**
```json
{
  "success": false,
  "error": {
    "message": "Email ou senha incorretos"
  }
}
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
- **JWT Authentication** - Autenticação baseada em tokens JWT
- **Middleware de autenticação** - Proteção de rotas sensíveis
- **Sanitização** - Sanitização de dados de entrada

## 🔐 Sistema de Autenticação

O projeto implementa um sistema completo de autenticação com JWT:

### **Funcionalidades:**
- **Registro de usuários** com validação de dados
- **Login seguro** com verificação de credenciais
- **Tokens JWT** para autenticação stateless
- **Middleware de proteção** para rotas sensíveis
- **Hash de senhas** com bcrypt para segurança
- **Validação de tokens** em tempo real

### **Fluxo de Autenticação:**
1. **Registro** → Usuário se cadastra com email e senha
2. **Login** → Sistema valida credenciais e retorna JWT
3. **Acesso** → Token JWT é usado para acessar rotas protegidas
4. **Renovação** → Token pode ser renovado conforme necessário

### **Exemplo de Resposta de Login:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "_id": "64f8b2c1a1b2c3d4e5f67890",
      "name": "João Silva",
      "email": "joao@example.com",
      "age": 30,
      "isActive": true,
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

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
