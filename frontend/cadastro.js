document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: document.getElementById('preco').value,
        categoria: document.getElementById('categoria').value
    };

    try {
        const res = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (res.ok) {
            alert('Produto cadastrado com sucesso!');
            window.location.href = 'listagem.html';
        }
    } catch (err) {
        alert('Erro ao cadastrar.');
        console.error(err);
    }
});