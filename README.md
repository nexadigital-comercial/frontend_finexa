# Finexa — Frontend

Frontend da aplicação web **Finexa**, desenvolvido com HTML, CSS e JavaScript puro. O projeto contém a interface de cadastro de usuários e realiza a comunicação com a API do backend para registrar novas contas.

## Tecnologias utilizadas

- **HTML5** — estrutura das páginas.
- **CSS3** — estilização, formulários, layout e modais.
- **JavaScript** — interatividade, validações e comunicação com a API.
- **Fetch API** — requisições HTTP para o backend.
- **Lucide** — biblioteca de ícones utilizada na interface.

## Estrutura do projeto

```text
frontend_finexa/
├── assets/
│   └── favicon_finexa.png
├── pages/
│   ├── index.html
│   └── login.html
├── services/
│   ├── cadastro.js
│   └── icons.js
├── style/
│   ├── form.css
│   ├── global.css
│   ├── layout.css
│   └── modal.css
└── README.md
```

### Organização dos diretórios

- **`assets/`** — recursos visuais utilizados pela aplicação.
- **`pages/`** — páginas HTML do frontend.
- **`services/`** — scripts JavaScript responsáveis pela lógica da interface e pelo gerenciamento dos ícones.
- **`style/`** — arquivos CSS separados por responsabilidade, facilitando a manutenção dos estilos.

## Funcionalidades implementadas

### Cadastro de usuários

A página `pages/index.html` contém a interface de criação de conta, com campos para nome, e-mail e senha.

O processo de cadastro contempla:

- Captura dos dados preenchidos no formulário.
- Requisição de token CSRF antes do envio dos dados.
- Envio das informações para a API do backend.
- Exibição de mensagens de validação nos campos correspondentes.
- Tratamento de e-mail já cadastrado.
- Exibição de modal para informar o resultado da operação.
- Bloqueio temporário do botão durante o processamento da requisição.

A lógica de cadastro está centralizada em `services/cadastro.js`.

### Ícones e interface

O arquivo `services/icons.js` é responsável pela inicialização dos ícones utilizados na interface. A página de cadastro também utiliza a biblioteca Lucide.

Os estilos são organizados em arquivos CSS independentes, separando o layout geral, os formulários, os estilos globais e os modais.

### Página de login

O arquivo `pages/login.html` já existe na estrutura do projeto, mas sua implementação ainda está pendente.

## Integração com o backend

O frontend realiza requisições para o backend da Finexa 2.0, utilizando atualmente o endereço local:

```text
http://localhost:8080
```

### Endpoints utilizados no cadastro

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/auth/csrf` | Obter o token CSRF necessário para a requisição protegida. |
| `POST` | `/usuarios` | Enviar os dados para criação do usuário. |

A requisição de cadastro envia os dados em JSON e inclui as credenciais necessárias para o gerenciamento de cookies e a proteção CSRF.

### Tratamento de respostas

O frontend interpreta as respostas da API para apresentar mensagens adequadas ao usuário, incluindo erros de validação, e-mail já cadastrado e falhas de comunicação.

## Como executar o projeto

### Pré-requisitos

- Git instalado.
- Navegador web atualizado.
- Backend da Finexa 2.0 configurado e em execução.

### 1. Clonar o repositório

```bash
git clone https://github.com/nexadigital-comercial/frontend_finexa.git
```

### 2. Entrar no diretório

```bash
cd frontend_finexa
```

### 3. Executar o frontend

Como o projeto utiliza HTML, CSS e JavaScript puro, não é necessário instalar dependências com npm para a estrutura atual.

Abra `pages/index.html` no navegador ou utilize uma extensão de servidor local, como o Live Server do Visual Studio Code.

### 4. Iniciar o backend

Certifique-se de que o backend esteja em execução e acessível em `http://localhost:8080`.

A configuração de CORS e cookies deve permitir a comunicação entre a origem utilizada pelo frontend e o backend. Utilize o mesmo hostname de forma consistente e mantenha a proteção CSRF habilitada.

## Próximas etapas

- Implementar a página de login.
- Expandir as funcionalidades da aplicação conforme a evolução da Finexa 2.0.
- Centralizar a configuração da URL da API para facilitar a execução em diferentes ambientes.
- Evoluir a organização do frontend conforme novas páginas e serviços forem adicionados.

## Repositórios relacionados

- **Frontend:** https://github.com/nexadigital-comercial/frontend_finexa
- **Backend:** https://github.com/nexadigital-comercial/backend_finexa
