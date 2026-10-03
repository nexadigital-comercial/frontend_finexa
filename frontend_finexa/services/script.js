const modalSucesso = document.getElementById("modalSucesso");
const mensagemUsuario = document.getElementById("mensagemUsuario");
const fecharModal = document.getElementById("fecharModal");

const form = document.getElementById("formUsuario");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");


form.addEventListener("submit", async (event) => {

    event.preventDefault();


    // Limpa mensagens anteriores

    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroSenha.textContent = "";


    // Captura os dados do formulário

    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
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
                erroNome.textContent = erros.nome;
            }


            if (erros.email) {
                erroEmail.textContent = erros.email;
            }


            if (erros.senha) {
                erroSenha.textContent = erros.senha;
            }

            if (erros.erro) {
            erroEmail.textContent = erros.erro;
            }


            return;
        }


        // Cadastro realizado com sucesso

        const data = await response.json();

        console.log("Usuário criado:", data);


        // Preenche o modal

        mensagemUsuario.innerHTML = `
            Bem-vindo ao Finexa, ${data.nome}!<br>
            ${data.email}
        `;


        // Abre o modal

        modalSucesso.style.display = "flex";


        // Limpa o formulário

        form.reset();


    } catch (error) {

        console.error("Erro ao cadastrar usuário:", error);


        mensagemUsuario.textContent =
            "Não foi possível conectar ao servidor.";

        modalSucesso.style.display = "flex";

    }

});


fecharModal.addEventListener("click", () => {

    modalSucesso.style.display = "none";

});