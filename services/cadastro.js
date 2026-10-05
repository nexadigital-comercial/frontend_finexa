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
        senha: document.getElementById("password").value
    };


    try {

        // Envia os dados para o backend

        const response = await fetch("http://localhost:8080/usuarios", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)

        });


        // Se o backend retornar erro

        if (!response.ok) {

            const erros = await response.json();


            if (erros.nome) {
                erroName.textContent = erros.nome;
            }


            if (erros.email) {
                erroEmail.textContent = erros.email;
            }


            if (erros.senha) {
                erroPassword.textContent = "A senha deve ter pelo menos 6 caracteres.";
                passwordInput.classList.add("input-error");
            }


            if (erros.erro) {
                erroEmail.textContent = "Este e-mail já está cadastrado.";
                emailInput.classList.add("input-error");
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


        userMessage.textContent =
            "Could not connect to the server.";

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