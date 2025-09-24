# Frontend React App

Frontend React.js para integração com o backend Node.js.

## Tecnologias

- React 18
- TypeScript
- Vite
- React Router DOM
- React Bootstrap
- Axios
- React Hook Form
- React Toastify

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── hooks/              # Hooks customizados
├── types/              # Definições de tipos TypeScript
├── utils/              # Utilitários
├── App.tsx             # Componente principal
└── main.tsx            # Ponto de entrada
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

3. Edite o arquivo `.env` com as configurações corretas:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Frontend React App
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas do linter

## Funcionalidades

- ✅ Tela de Login
- ✅ Tela de Cadastro
- ✅ Dashboard do usuário
- ✅ Autenticação com JWT
- ✅ Validação de formulários
- ✅ Roteamento protegido
- ✅ Interface responsiva com Bootstrap

## Integração com Backend

O frontend se conecta com o backend através das seguintes APIs:

- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Cadastro do usuário
- `GET /api/auth/profile` - Perfil do usuário autenticado

## Desenvolvimento

Para iniciar o desenvolvimento:

1. Certifique-se de que o backend está rodando na porta 5000
2. Execute `npm run dev` no diretório frontend
3. Acesse http://localhost:3000

## Build de Produção

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.
