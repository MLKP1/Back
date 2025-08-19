# 🍕 Pizza Stars - API Backend

> Sistema de gerenciamento para pizzaria desenvolvido como Trabalho de Conclusão de Curso (TCC)

Este é o backend de um sistema completo para pizzaria, oferecendo funcionalidades de autenticação, gerenciamento de usuários, produtos e pedidos.

## 📋 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)

## 🚀 Funcionalidades

### Autenticação e Autorização
- ✅ Registro de usuários
- ✅ Login com JWT
- ✅ Refresh token
- ✅ Logout
- ✅ Controle de acesso por roles (CUSTOMER, EMPLOYEE, ADMIN)

### Gerenciamento de Usuários
- ✅ Perfil do usuário
- ✅ Atualização de dados
- ✅ Remoção de conta
- ✅ Listagem de usuários (Admin)

### Sistema de Produtos
- 🍕 **Pizzas**: Diferentes tamanhos (Média, Grande, Família) e tipos (Doce, Salgada)
- 🥤 **Bebidas**: Categorias (Refrigerante, Suco, Alcoólica) com volume
- 🧁 **Sobremesas**: Tipos variados (Doce, Salgada)

### Sistema de Pedidos
- 🛒 Carrinho de compras
- 📦 Gerenciamento de pedidos
- 📍 Sistema de endereços
- 🔄 Status de pedidos (Pendente, Processando, Entregando, Entregue, Cancelado)

## 🛠 Tecnologias

- **Runtime**: Node.js 20
- **Framework**: Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT (@fastify/jwt)
- **Validação**: Zod
- **Criptografia**: bcryptjs
- **Linguagem principal**: TypeScript
- **Build**: tsup
- **Dev Tools**: tsx, biome (linting)

## 📋 Pré-requisitos

- Node.js 20 ou superior
- Docker e Docker Compose
- PostgreSQL (via Docker)

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MLKP1/Back.git
   cd Back
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configuração do banco de dados**
   ```bash
   # Suba o container PostgreSQL
   docker-compose up -d
   ```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://lucas:lucas123@localhost:5432/pizza-stars"

# Server
PORT=3333
NODE_ENV="dev"

# JWT
JWT_SECRET="sua-chave-secreta-super-segura"

# Token de exemplo (opcional)
TOKEN="seu-token-de-teste"
```

### Configuração do Banco

```bash
# Execute as migrações
npx prisma migrate dev

# Opcional: Popular com dados de exemplo
npx prisma db seed
```

## 🚀 Uso

### Desenvolvimento
```bash
npm run dev
```
O servidor será iniciado em `http://localhost:3333`

### Produção
```bash
# Build
npm run build

# Start
npm start
```

### Outros comandos úteis
```bash
# Linting
npm run lint

# Commit padronizado
npm run commit

# Visualizar banco de dados
npx prisma studio
```

## 📚 API Endpoints

### Autenticação
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST`   | `/auth/login`   | Login             | ❌ |
| `PATCH`  | `/auth/refresh` | Renovar token     | ✅ |
| `DELETE` | `/auth/logout`  | Logout            | ✅ |

### Usuários
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST`   | `/users` | Registrar usuário | ❌ |
| `GET`    | `/user`  | Perfil do usuário | ✅ |
| `PATCH`  | `/user`  | Atualizar perfil  | ✅ |
| `DELETE` | `/user`  | Remover conta     | ✅ |
| `GET`    | `/users` | Listar usuários   | 👑 Admin |

### Headers de Autenticação
```http
Authorization: Bearer <seu-jwt-token>
```

### Exemplo de Requisição

```javascript
// Registro de usuário
POST /users
Content-Type: application/json

{
  "name": "Lucas",
  "email": "lucas@gmail.com",
  "password": "senha123"
}
```

## 💾 Banco de Dados

### Modelos Principais

- **User**: Usuários do sistema com roles
- **Address**: Endereços dos usuários
- **Pizza**: Produtos pizza com tamanhos e tipos
- **Drink**: Bebidas com categorias e volumes
- **Dessert**: Sobremesas variadas
- **Order**: Pedidos dos clientes
- **Cart**: Carrinho de compras

### Diagrama ER

#### Entidades e Relacionamentos Principais

**Usuário (User)**
- → Tem um Endereço (Address) [1:1]
- → Tem um Carrinho (Cart) [1:1]
- → Realiza vários Pedidos (Order) [1:N]

**Pedido (Order)**
- ← Pertence a um Usuário (User) [N:1]
- → Contém várias Pizzas (Pizza) [N:N]
- → Contém várias Bebidas (Drink) [N:N]
- → Contém várias Sobremesas (Dessert) [N:N]

**Carrinho (Cart)**
- ← Pertence a um Usuário (User) [1:1]
- → Contém várias Pizzas (Pizza) [N:N]
- → Contém várias Bebidas (Drink) [N:N]
- → Contém várias Sobremesas (Dessert) [N:N]

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev`    | Inicia servidor de desenvolvimento |
| `npm run build`  | Build para produção                |
| `npm start`      | Inicia servidor de produção        |
| `npm run lint`   | Executa linting                    |
| `npm run commit` | Commit padronizado                 |

## 📁 Estrutura do Projeto

```
prisma/
├── schema.prisma      # Schema do banco
├── seed.ts            # Dados iniciais
└── migrations/        # Histórico de migrações

src/
└── @types/            # Definições de tipos TypeScript
├── env/               # Configuração de variáveis
├── http/
│   ├── controllers/   # Controladores das rotas
│   │   └── users/     # Rotas de usuários
│   └── middlewares/   # Middlewares de autenticação
├── lib/               # Bibliotecas e configurações
├── repositories/      # Camada de dados
├── services/          # Lógica de negócio
│   ├── errors/        # Classes de erro customizadas
│   ├── factories/     # Factory pattern para services
│   └── users/         # Serviços de usuário
├── app.ts             # Configuração do Fastify
├── server.ts          # Servidor principal
```

## 🎯 Roadmap

- [ ] API de produtos (CRUD pizzas, bebidas, sobremesas)
- [ ] Sistema completo de pedidos
- [ ] Integração com pagamentos
- [ ] Sistema de delivery
- [ ] Dashboard administrativo
- [ ] Notificações em tempo real
- [ ] Relatórios e analytics

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feat/funcionalidade-legal`)
3. Faça linting e formatação (`npx biome check --write`)
4. Commit suas mudanças (`git commit -m 'feat: Adicionar uma funcionalidade legal'`)
5. Push para a branch (`git push origin feat/funcionalidade-legal`)
6. Abra um Pull Request

## 📝 Licença

Este projeto é desenvolvido como Trabalho de Conclusão de Curso (TCC).

---

⭐ **Pizza Stars** - Transformando a experiência da sua pizzaria favorita!
