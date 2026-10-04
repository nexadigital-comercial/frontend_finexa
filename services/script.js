const modalSucesso = document.getElementById("modalSucesso");
const mensagemUsuario = document.getElementById("mensagemUsuario");
const fecharModal = document.getElementById("fecharModal");

const tituloModal = document.getElementById("tituloModal");

const form = document.getElementById("formUsuario");
const btnCadastrar = document.getElementById("btnCadastrar");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Desabilita o botão enquanto aguarda o backend
    btnCadastrar.disabled = true;
    btnCadastrar.value = "Creating...";


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


        // Define o título do modal

        tituloModal.textContent = "Cadastro realizado!";


        // Preenche o modal

        mensagemUsuario.innerHTML = `
            Bem-vindo a Finexa, ${data.nome}!<br>
            Este é seu E-mail de Usuário: ${data.email}
        `;


        // Abre o modal

        modalSucesso.style.display = "flex";


        // Limpa o formulário

        form.reset();


    } catch (error) {

        console.error("Erro ao cadastrar usuário:", error);


        // Define o título do modal para erro

        tituloModal.textContent = "Erro ao realizar cadastro";


        mensagemUsuario.textContent =
            "Não foi possível conectar ao servidor.";

        modalSucesso.style.display = "flex";


    } finally {

        // Libera o botão após a resposta do backend

        btnCadastrar.disabled = false;
        btnCadastrar.value = "Create Account";

    }

});


fecharModal.addEventListener("click", () => {

    modalSucesso.style.display = "none";

});