const modalResponse = document.getElementById("modalResponse");
const userMessage = document.getElementById("userMessage");
const closeModal = document.getElementById("closeModal");

const titleModal = document.getElementById("titleModal");

const form = document.getElementById("userForm");
const btnRegister = document.getElementById("btnRegister");

const erroName = document.getElementById("erroName");
const erroEmail = document.getElementById("erroEmail");
const erroPassword = document.getElementById("erroPassword");

const emailInput = document.getElementById("email");


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Desabilita o botão enquanto aguarda o backend
  btnRegister.disabled = true;
  btnRegister.value = "Creating...";

  // Limpa mensagens anteriores

  erroName.textContent = "";
  erroEmail.textContent = "";
  erroPassword.textContent = "";

  emailInput.classList.remove("input-error");

  // Captura os dados do formulário

  const usuario = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("password").value,
  };

  try {
    // Busca o token CSRF antes do cadastro
    const csrfResponse = await fetch("http://localhost:8080/auth/csrf", {
      method: "GET",
      credentials: "include",
    });

    if (!csrfResponse.ok) {
      throw new Error("Não foi possível obter o token CSRF.");
    }

    const csrfData = await csrfResponse.json();

    // Verifica se os dados do CSRF foram recebidos
    console.log("Header CSRF:", csrfData.headerName);
    console.log("Token recebido:", Boolean(csrfData.token));
    console.log(
      "Cookie CSRF encontrado:",
      document.cookie.includes("XSRF-TOKEN="),
    );

    // Envia os dados do cadastro
    const response = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        [csrfData.headerName]: csrfData.token,
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const erros = await response.json();

      console.log("Status HTTP:", response.status);
      console.log("Código do erro:", erros.code);
      console.log("Resposta do backend:", erros);

      // Exibe os erros específicos dos campos
      const fieldErrors = erros.fieldErrors ?? {};

      if (fieldErrors.nome) {
        erroName.textContent = fieldErrors.nome;
      }

      if (fieldErrors.email) {
        erroEmail.textContent = fieldErrors.email;
      }

      if (fieldErrors.senha) {
        erroPassword.textContent = fieldErrors.senha;
        document.getElementById("password").classList.add("input-error");
      }

      // Trata e-mail duplicado
      if (erros.code === "EMAIL_ALREADY_EXISTS") {
        erroEmail.textContent = erros.message;
        emailInput.classList.add("input-error");
      }

      // Trata outros erros retornados pela API
      if (
        erros.code !== "VALIDATION_ERROR" &&
        erros.code !== "EMAIL_ALREADY_EXISTS"
      ) {
        titleModal.textContent = "Error creating account";
        userMessage.textContent =
          erros.message || "Não foi possível concluir o cadastro.";
        modalResponse.style.display = "flex";
      }

      return;
    }

    // Cadastro realizado com sucesso

    const data = await response.json();

    console.log("Usuário criado:", data);

    // Define o título do modal

    titleModal.textContent = "Registration complete!";

    // Preenche o modal

    userMessage.innerHTML = `
            Welcome to Finexa, ${data.nome}!<br>
            This is your user Email: ${data.email}
        `;

    // Abre o modal

    modalResponse.style.display = "flex";

    // Limpa o formulário

    form.reset();
  } catch (error) {
    console.error("Error creating user:", error);

    // Define o título do modal para erro

    titleModal.textContent = "Error creating account";

    userMessage.textContent = "Could not connect to the server.";

    modalResponse.style.display = "flex";
  } finally {
    // Libera o botão após a resposta do backend

    btnRegister.disabled = false;
    btnRegister.value = "Create Account";
  }
});

closeModal.addEventListener("click", () => {
  modalResponse.style.display = "none";
});
