<h1 align="center">
<br>
  <img src="https://quikdev.com.br/wp-content/uploads/2020/04/cropped-quikdev-logo.png" alt="QuikDev" width="120">
<br>
Test
</h1>

## Tools

This application features tools backend development!

- πΉ **NodeJs** β A web framework for Node Js
- β»οΈ **Express** β Framework web application Node.js
- π **Prisma.io** β ORM that helps app developers build faster and make fewer errors
- πΎ **Sqlite** β Automate Your Development Process Quickly Database
- π **Multer** β Middleware for handling uploads
- π€ **Nodemailer** β Nodemailer is a module for Node.js applications to allow easy as cake email sending
- π **Ethereal Email (Local)** β is a Fake SMTP service
- π **Jest** β Framework test

## Getting started

1. Clone this repo using `git clone git@github.com:alanhrc/DEV-QuickDev-Test-Backend.git`
2. Move yourself to the appropriate directory: `cd DEV-QuikDev-Test-Backend`<br />
3. Run `npm install` to install dependencies<br />
4. Configure variables PROVIDER and URL in `prisma/schema.prisma` for access database<br />
5. Run `npx prisma migrate dev` to create columns database
6. Contains a file `Insomnia` with routes and params project to test manually, you can import file

<br />

<img src="./assets/insomnia.png" />

<br />

### Getting started with the backend server

1. Run `npm run dev` to start the server

## Require Features

1. (): Elabore um documento Readme.md no projeto que tenha os seguintes detalhes:<br />
a. Descreva a stack utilizada, como versΓ£o da linguagem utilizada, framework e o
porquΓͺ de ter escolhido, pacotes adicionados, banco de dados, etc....<br />
b. Descreva como subir o sistema para executar os testes.<br />

2. (): A estrutura base do sistema vai contar com 3 entidades:

```json
User:
id: id primary_key
name: string:100
email: string:191
```

<br />

```json
Post:
id: id primary_key
user_id: id foreign:users
title: string:100
description: text
```

<br />

```json
Comment:
id: id primary_key
user_id: id foreign:users
post_id: id foreign:posts
description: text
```

<br />
essas sΓ£o as exigΓͺncias mΓ­nimas para essa atividade.<br />

3. (): Crie um sistema de autenticaΓ§Γ£o por token para chamas de REST API.<br />

4. (): Com o usuΓ‘rio vocΓͺ pode fazer dois processos de CRUD:
a. CRUD simples;<br />
i. Colocar checagem de permissΓ£o se possuir autenticaΓ§Γ£o;<br />
b. Ou se possuir autenticaΓ§Γ£o;<br />
i. Registro na fase de autenticaΓ§Γ£o com ediΓ§Γ£o de perfil do usuΓ‘rio logado.<br />

5. (): Com as postagens Γ© preciso fazer um CRUD simples com algumas exigΓͺncias:<br />
a. Apenas o prΓ³prio usuΓ‘rio pode editar ou excluir as postagens;<br />
b. (): a postagem tenha a possibilidade de adicionar uma imagem em uma api
dedicada a isso;<br />
c. (): as ediΓ§Γ΅es sejam salvas como um histΓ³rico;<br />
d. (): a postagem tenha um contador de visualizaΓ§Γ΅es;<br />
e. (): a postagem tenha um contador de curtidas e nΓ£o curtidas;<br />

6. (): Com os comentΓ‘rios Γ© preciso fazer um CRUD simples com algumas exigΓͺncias:<br />
a. Apenas o prΓ³prio usuΓ‘rio pode editar os comentΓ‘rios;<br />
b. UsuΓ‘rio do comentΓ‘rio pode remover o comentΓ‘rio;<br />
c. (): UsuΓ‘rio da postagem tambΓ©m pode remover o comentΓ‘rio;<br />
d. (): adicionar marcador que foi removida pelo usuΓ‘rio ou dono da postagem;<br />
e. (): Mandar um e-mail para o usuΓ‘rio da postagem que ele possui um novo
comentΓ‘rio em seu post;<br />

7. (): Crie uma rota que gere um relatΓ³rio que traga os posts com os seguintes campos:
a. TΓ­tulo;
b. Quantos comentΓ‘rios eles possuem;
c. (): Quantas visualizaΓ§Γ΅es;
d. (): Quantas curtidas;
e. (): Quantas nΓ£o curtidas;

8. (): Documentar as chamadas da API com uma ferramenta de requisiΓ§Γ£o, exemplo: Postman
e enviar o arquivo de configuraΓ§Γ£o;

## Tests Application

<img src="./assets/coverage.png" />

<br />

## License

### Users
<img src="./assets/usersTests/createUser.png" />
<img src="./assets/usersTests/authenticateUser.png" />
<img src="./assets/usersTests/updateUser.png" />

<br />

### Posts
<img src="./assets/postsTests/createPost.png" />
<img src="./assets/postsTests/getAllPosts.png" />
<img src="./assets/postsTests/likeOrDislikePost.png" />
<img src="./assets/postsTests/updatePost.png" />
<img src="./assets/postsTests/updateViewsPost.png" />
<img src="./assets/postsTests/uploadFiles.png" />
<img src="./assets/postsTests/sendEmailReceivedPost.png" />

<br />

### Comments
<img src="./assets/commentsTests/createComment.png" />
<img src="./assets/commentsTests/removeCommentByOwner.png" />
<img src="./assets/commentsTests/updateComment.png" />

<br />

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.
