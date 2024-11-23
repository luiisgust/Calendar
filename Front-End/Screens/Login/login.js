const form = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailU = document.getElementById('emailU').value.trim();
    const senhaU = document.getElementById('senhaU').value.trim();

    if (!emailU || !senhaU) {
        message.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    try {
        const response = await fetch('http://192.168.0.135:3000/logar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ emailU, senhaU }),
        });

        if (!response.ok) {
            const text = await response.text(); // Captura a resposta como texto
            console.error('Erro do servidor:', text); // Para debugar, exiba no console
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.isAuth) {
            console.log('Resposta do servidor:', data); // Agora está no lugar correto
            window.location.href = 'home.html';
        } else {
            message.textContent = 'Email ou senha incorretos.';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        message.textContent = 'Ocorreu um erro ao fazer login. Tente novamente.';
    }
});


console.log('Dados enviados:', { emailU, senhaU });
