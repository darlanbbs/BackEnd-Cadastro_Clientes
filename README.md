# Backend da Aplicação de Cadastro de Pessoas (Físicas e Jurídicas)


Backend da Aplicação de Cadastro de Pessoas (Físicas e Jurídicas)
Este é o repositório do backend da aplicação de cadastro de pessoas, desenvolvida em Node.js e utilizando Express.js para o gerenciamento das rotas, e PostgreSQL como banco de dados.

# Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Pg (para modelagem e interação com o banco de dados)

# Configuração do Ambiente

Node.js e npm: Certifique-se de ter o Node.js e o npm instalados em seu sistema. Você pode baixá-los em https://nodejs.org/.

Dependências: Execute o comando npm install para instalar todas as dependências necessárias.


Arquivo .env: Crie um arquivo .env na raiz do projeto para armazenar as variáveis de ambiente sensíveis. Você pode utilizar o exemplo abaixo como ponto de partida:
Configuração do Banco de Dados: Configure as informações de conexão com o PostgreSQL no arquivo config/db.js.

```
PORT=5000
DB_HOST=seu_host_do_postgresql
DB_PORT=5432
DB_NAME=seu_nome_do_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

# Funcionalidades

1. Cadastro de Pessoas
Para cadastrar uma pessoa, faça uma requisição POST para a rota correspondente:
- Pessoa Física
```
{
  "tipo": "fisica",
  "nome": "Nome da Pessoa",
  "cpf": "123.456.789-00",
  "rg":"123.456-89"
  "telefone":"9 99999999"
  "endereço":"Rua avenida Brasil"
}
```

- Pessoa Juridica

```
{
  "tipo": "juridica",
  "nome": "Nome da Pessoa",
  "cnpj": "123.456.789-00",
  "rg":"123.456-89",
  "telefone":"9 99999999"
  "endereço":"Rua avenida Brasil"
  "contratoSocial": null
}
```

3. Edição de Pessoas

- Pessoa Física
```
{

  "cpf": "00-123.456-789",

}
```

- Pessoa Juridica

```
{

  "endereço":"Rua avenida Argentina"

}
```

4. Exclusão de Pessoas
```
Pessoa deletada com sucesso
```

5. Consulta de Pessoas
```
{
  "tipo": "juridica",
  "nome": "Nome da Pessoa",
  "cnpj": "123.456.789-00",
  "rg":"123.456-89",
  "telefone":"9 99999999"
  "endereço":"Rua avenida Brasil"
  "contratoSocial": null
}

```

# Executando o Servidor

Para iniciar o servidor, utilize o seguinte comando:

```

npm start

```

O servidor estará disponível em http://localhost:3000.
