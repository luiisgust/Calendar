import {BASE_URL} from '../../../config/config.js'

document.addEventListener('DOMContentLoaded', () => {
    const dynamicScript = document.createElement('script');
    dynamicScript.type = `module`
    dynamicScript.src = `newagendamento.js?ver=${Date.now()}`;
    document.body.appendChild(dynamicScript);
  });

  // Configura o evento do botão de voltar
  const backButton = document.getElementById("back-btn");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  } else {
    console.error("Botão 'back-btn' não encontrado no DOM.");
  }

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

document.getElementById('curso').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/curso`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/curso/curso.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});
document.getElementById('docente').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/docente`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de docente
        window.location.href = '../MainScreen/docente/docente.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});
document.getElementById('turma').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/turma`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de turma
        window.location.href = '../MainScreen/turma/turma.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});