const form = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos de entrada
    const emailU = document.getElementById('emailU').value;
    const senhaU = document.getElementById('senhaU').value;

    try {
        const response = await fetch('http://10.111.9.76:3000/logar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Inclua esta linha para enviar o cookie de sessão
            body: JSON.stringify({ emailU, senhaU }) // Envia os dados em formato JSON
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.isAuth) {
            window.location.href = 'home.html'; // Redireciona para a página desejada
        } else {
            message.textContent = 'Email ou senha incorretos.'; // Exibe mensagem de erro
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        message.textContent = 'Ocorreu um erro ao fazer login. Tente novamente mais tarde.'; // Exibe mensagem de erro
    }
});

// Para verificação, pode remover posteriormente
console.log(form);
