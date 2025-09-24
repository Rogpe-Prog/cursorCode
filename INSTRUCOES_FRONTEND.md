# Instruções para Executar o Frontend React

## Estrutura do Projeto

O frontend foi criado em um diretório separado (`frontend/`) para manter a organização do monorepo:

```
C:\Node\
├── src/                    # Backend Node.js
├── dist/                   # Build do backend
├── frontend/               # Frontend React.js
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── package.json            # Backend
```

## Configuração

### 1. Backend (Porta 5000)
Certifique-se de que o backend está rodando:
```bash
# No diretório raiz (C:\Node\)
npm run dev
```

### 2. Frontend (Porta 3000)
Para executar o frontend:

```bash
# Navegue para o diretório frontend
cd frontend

# Instale as dependências (já feito)
npm install

# Configure as variáveis de ambiente
# Copie o arquivo de exemplo e edite conforme necessário
copy env.example .env

# Execute o servidor de desenvolvimento
npm run dev
```

## Acessos

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Funcionalidades Implementadas

### ✅ Tela de Login
- Validação de formulário
- Integração com API de login
- Tratamento de erros
- Interface responsiva

### ✅ Tela de Cadastro
- Formulário completo com todos os campos do backend
- Validação em tempo real
- Confirmação de senha
- Seleção de tipo de usuário

### ✅ Dashboard
- Exibição dos dados do usuário
- Botão de logout
- Interface limpa e organizada

### ✅ Autenticação
- Context API para gerenciamento de estado
- Token JWT armazenado no localStorage
- Rotas protegidas
- Redirecionamento automático

## Tecnologias Utilizadas

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **React Router DOM** para roteamento
- **React Bootstrap** para interface
- **Axios** para requisições HTTP
- **React Hook Form** para formulários
- **React Toastify** para notificações

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
npm run lint:fix
```

## Variáveis de Ambiente

Crie um arquivo `.env` no diretório `frontend/` com:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Frontend React App
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

## Testando a Aplicação

1. **Inicie o backend** (porta 5000)
2. **Inicie o frontend** (porta 3000)
3. **Acesse** http://localhost:3000
4. **Teste o cadastro** de um novo usuário
5. **Teste o login** com as credenciais criadas
6. **Verifique o dashboard** com os dados do usuário

## Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   └── ProtectedRoute.tsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── DashboardPage.tsx
│   ├── services/           # Serviços de API
│   │   ├── api.ts
│   │   └── authService.ts
│   ├── hooks/              # Hooks customizados
│   │   └── useAuth.ts
│   ├── types/              # Definições TypeScript
│   │   └── index.ts
│   ├── utils/              # Utilitários
│   │   └── validation.ts
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada
│   └── vite-env.d.ts       # Tipos do Vite
├── public/                 # Arquivos estáticos
├── index.html              # HTML principal
├── package.json            # Dependências
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── README.md               # Documentação
```

## Próximos Passos

Para expandir a aplicação, você pode:

1. **Adicionar mais páginas** no diretório `src/pages/`
2. **Criar componentes reutilizáveis** em `src/components/`
3. **Implementar mais serviços** em `src/services/`
4. **Adicionar validações customizadas** em `src/utils/validation.ts`
5. **Criar hooks personalizados** em `src/hooks/`
6. **Expandir os tipos TypeScript** em `src/types/index.ts`

A aplicação está pronta para uso e pode ser facilmente expandida seguindo os padrões estabelecidos!
