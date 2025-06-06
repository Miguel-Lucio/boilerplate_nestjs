<h1 align = center>Boilerplate</h1>

Api Feita com Express e TypeORM, onde empresas podem se cadastrar e generenciar seus produtos.

Principais tecnologias utlizadas: Express, TypeORM, bcrypts e jsonwebtoken.

<h2>Configurações de ambiente</h2>

1. Com o diretório já clonado em sua máquina instale as dependências necessárias para rodar a aplicação localmente:

```shell
npm install
```

2. Crie o arquivo .env com as variáveis declaradas no arquivo .env.example

```shell
# Exemplo de como preencher o .env
PORT=3000
DATABASE_URL="postgres://User:1234@localhost:5432/BancoDeDados"
SECRET_KEY="chaveAleatoria"
```

3. Rode as migrações do banco de dados vinculado utilizando o seguinte comando no terminal:

```shell
npm run typeorm migration:run -- -d src/data-source
```

4. Para inicializar a aplicação utilize o comando abaixo:

```shell
npm run dev
```

Após seguir os passos acima a aplicalção a API poderá ser acessada localmente a partir da URL:
http://localhost:3000

<h1 align = center>Endpoints da aplicação</h1>

<h2>Rota de Login</h2>

| Método | Endpoint | Responsabilidade |
| ------ | -------- | ---------------- |
| POST   | /login   | Login da empresa |

<h3>POST /login</h3>
Rota de login da empresa

| Request                |
| ---------------------- |
| Body: application/json |

```json
{
  "cnpj": "12345678911234",
  "password": "123"
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 200 OK         |

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDkyMTM0NDMsImV4cCI6MTc0OTIyNDI0Mywic3ViIjoiZGFkMzhkMWQtY2Q0NC00Y2JkLWJmYjktYjczYTM3NGE5ODU4In0.Qbvsme7C4hye8reFoiDNvfzu76D86HGckPD86Fz3SFs"
}
```

| Response                |
| ----------------------- |
| Body: application/json  |
| Status: 400 BAD REQUEST |

```json
{
  "message": {
    "cnpj": ["Required"],
    "password": ["Required"]
  }
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Invalid credentials."
}
```

<h2>Rotas de Empresa</h2>

| Método | Endpoint       | Responsabilidade               |
| ------ | -------------- | ------------------------------ |
| POST   | /companies     | Cadastro de Empresa            |
| GET    | /companies     | Listagem das Empresas          |
| GET    | /companies/:id | Listagem da Empresa pelo id    |
| PATCH  | /companies/:id | Atualização da Empresa pelo id |
| DELETE | /companies/:id | Deleção da Empresa pelo id     |

<h3>POST /companies</h3>
Rota de criação empresa

| Request                |
| ---------------------- |
| Body: application/json |

```json
{
  "name": "nova empresa",
  "cnpj": "12345678911556",
  "password": "123"
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 201 CREATED    |

```json
{
  "id": "f6eb0ee9-0656-4e76-bdbb-9d0b05bf0b3f",
  "name": "nova empresa",
  "cnpj": "12345678911556"
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status : 400 BAD REQUEST |

```json
{
  "message": {
    "name": ["Required"],
    "cnpj": ["Required"],
    "password": ["Required"]
  }
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status : 400 BAD REQUEST |

```json
{
  "message": {
    "cnpj": [
      "CNPJ must have exactly 14 numeric characters",
      "CNPJ must contain only numeric digits"
    ]
  }
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status : 400 BAD REQUEST |

```json
{
  "message": "cnpj already registered."
}
```

<h3>GET /companies</h3>
Rota de listagem de empresas

| Request            |
| ------------------ |
| Body: No content   |
| Auth: Bearer Token |

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 200 OK         |

```json
[
  {
    "id": "dad38d1d-cd44-4cbd-bfb9-b73a374a9858",
    "name": "padaria",
    "cnpj": "12345678911555"
  },
  {
    "id": "f6eb0ee9-0656-4e76-bdbb-9d0b05bf0b3f",
    "name": "biblioteca",
    "cnpj": "12345678911556"
  },
  {
    "id": "8dd95232-7c17-493b-8d09-b405d4c93813",
    "name": "nova empresa",
    "cnpj": "12345678911558"
  }
]
```

<h3>GET /companies/:id</h3>
Rota de listagem de empresa pelo id

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 200 OK         |

```json
{
  "id": "d315fa7a-189b-42ed-9335-11ab94d59d84",
  "name": "miguel loja",
  "cnpj": "12345678911234"
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 404 NOT FOUND  |

```json
{
  "message": "Company not found."
}
```

<h3>PATCH /companies/:id</h3>
Atualização de empresa
(Apenas a empresa proprietária da conta pode acessar)

| Request                |
| ---------------------- |
| Body: application/json |
| Auth: Bearer Token     |

```json
{
  "name": "picanha na brasa",
  "password": "1234",
  "cnpj": "12345678911555"
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 200 OK         |

```json
{
  "id": "dad38d1d-cd44-4cbd-bfb9-b73a374a9858",
  "name": "picanha na brasa",
  "cnpj": "12345678911555"
}
```

| Response                |
| ----------------------- |
| Body: application/json  |
| Status: 400 BAD REQUEST |

```json
{
  "message": "cnpj already registered."
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Missing bearer token."
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 403 FORBIDDEN  |

```json
{
  "message": "Insufficient permission."
}
// Resposta ao tentar modificar um id de uma empresa diferente da autenticação
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 404 NOT FOUND  |

```json
{
  "message": "Company not found."
}
```

<h3>DELETE /companiess/:id</h3>
Rota de delelção da empresa pelo id
(Apenas a empresa proprietária da conta pode acessar)

| Request            |
| ------------------ |
| Body: No content   |
| Auth: Bearer Token |

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 204 NO CONTENT |

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Missing bearer token."
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 403 FORBIDDEN  |

```json
{
  "message": "Insufficient permission."
}
// Resposta ao tentar deletar um id de uma empresa diferente da autenticação
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 404 NOT FOUND  |

```json
{
  "message": "Company not found."
}
```

<h2>Rotas de Produtos</h2>

| Método | Endpoint      | Responsabilidade               |
| ------ | ------------- | ------------------------------ |
| POST   | /products     | Cadastro de produto            |
| GET    | /products     | Listagem de produtos           |
| PATCH  | /products/:id | Atualização de produto pelo id |
| DELETE | /products/:id | Deleção de produto pelo o id   |

Todas as rotas de produtos são para usuários autenticados.

<h3>POST /products</h3>
Rota de criação de produto

| Request                |
| ---------------------- |
| Body: application/json |
| Auth: Bearer Token     |

```json
{
  "productName": "batafrita",
  "description": "frite por 5 minutos antes de servir",
  "price": 30.7,
  "stock": 33.0
}
// o envio de "description (default:""), price (default:0) e stock (default:0)" não é obrigatório
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 201 CREATED    |

```json
{
  "id": "ba05bec0-fe32-4765-9508-002161b27e48",
  "productName": "batafrita",
  "description": "frite por 5 minutos antes de servir",
  "price": 30.7,
  "stock": 33
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status : 400 BAD REQUEST |

```json
{
  "message": {
    "productName": ["Required"]
  }
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Missing bearer token."
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "invalid signature"
}
```

<h3>GET /products</h3>
Rota de listagem de produtos
(A empresa só possui acesso aos seus próprios produtos)

| Request            |
| ------------------ |
| Body: No content   |
| Auth: Bearer Token |

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 200 OK         |

```json
[
  {
    "id": "a797155c-9268-43a0-971a-80f207eefa8a",
    "productName": "hamburguer",
    "description": "",
    "price": 0,
    "stock": 0
  },
  {
    "id": "ba05bec0-fe32-4765-9508-002161b27e48",
    "productName": "batafrita12",
    "description": "frite por 5 minutos antes de servir",
    "price": 30.7,
    "stock": 33
  }
]
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Missing bearer token."
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "invalid signature"
}
```

<h3>PATCH /documents/:id</h3>
Atualização de produto
(Apenas a emrepsa proprietária do produto pode realizar a ação)

| Request                |
| ---------------------- |
| Body: application/json |
| Auth: Bearer Token     |

```json
{
  "productName": "X-bacon",
  "description": "com bacon bem crocante",
  "price": 12.5,
  "stock": 42
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 200 OK         |

```json
{
  "id": "a797155c-9268-43a0-971a-80f207eefa8a",
  "productName": "X-bacon",
  "description": "com bacon bem crocante",
  "price": 12.5,
  "stock": 42
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Missing bearer token."
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "invalid signature"
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 404 NOT FOUND  |

```json
{
  "message": "Company does not have this product"
}
// mensagem ao tentar altear um produto que não pertence à empresa e de id inexistente
```

<h3>DELETE /products/:id</h3>
Rota de delelção de ptoduto pelo id
(Apenas a empresa proprietária pode acessar)

| Request            |
| ------------------ |
| Body: No content   |
| Auth: Bearer Token |

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 204 NO CONTENT |

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "Missing bearer token."
}
```

| Response                 |
| ------------------------ |
| Body: application/json   |
| Status: 401 UNAUTHORIZED |

```json
{
  "message": "invalid signature"
}
```

| Response               |
| ---------------------- |
| Body: application/json |
| Status: 404 NOT FOUND  |

```json
{
  "message": "Company does not have this product"
}
// mensagem ao tentar altear um produto que não pertence à empresa e de id inexistente
```
