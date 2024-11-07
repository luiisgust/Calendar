const form = document.getElementById('login-form')
const message = document.getElementById('message')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('emailU').value;
    const senha = document.getElementById('senhaU').value;

    fetch('http://10.111.9.76:3000/logar',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, senha})
    })
    .then(res => res.json())
    .then(data => {
        if (data.isAuth) {
            // Redirecionar para a página desejada
            window.location.href = './teste.html';
          } else {
            message.textContent = 'Email ou senha incorretos.';
          }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        message.textContent = 'Ocorreu um erro ao fazer login. Tente novamente mais tarde.';
      });
})

console.log(form)