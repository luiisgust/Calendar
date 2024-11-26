import {BASE_URL} from '../../config/config.js'

document.addEventListener('DOMContentLoaded', () => {
    const dynamicScript = document.createElement('script');
    dynamicScript.type = `module`
    dynamicScript.src = `home.js?ver=${Date.now()}`;
    document.body.appendChild(dynamicScript);
  });

document.addEventListener('DOMContentLoaded', () => {
    // Busca as informações do usuário
    fetch(`${BASE_URL}/conta`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao acessar a conta');
        }
    }).then(data => {
        console.log(data);
    })

    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST', // Certifique-se de usar o método correto (conforme o servidor)
            credentials: 'include', // Inclui o cookie de sessão na requisição
        });

        if (!response.ok) {
            const text = await response.text(); // Captura resposta como texto para depuração
            console.error('Erro do servidor:', text);
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            alert(data.message); // Mensagem de sucesso (opcional)
            window.location.href = 'login.html'; // Redireciona para a página de login
        } else {
            console.error('Erro ao fazer logout:', data.message);
            alert('Erro ao fazer logout. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Ocorreu um erro ao fazer logout. Tente novamente mais tarde.');
    }
    });
});



document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});


document.getElementById('ambiente').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/ambiente`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de ambiente
        window.location.href = '../MainScreen/ambiente/ambiente.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});

document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});
document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});
document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});