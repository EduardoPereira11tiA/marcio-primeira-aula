async function carregar() {
    try {
        const res = await fetch('http://localhost:3000/products');
        const produtos = await res.json();
        const lista = document.getElementById('lista');

        lista.innerHTML = produtos.map(p => `
            <li>
                <strong>${p.nome}</strong> - R$ ${p.preco}<br>
                <small>${p.descricao}</small>
            </li>
        `).join('');
    } catch (err) {
        document.getElementById('lista').innerHTML = "<li>Erro ao conectar com o servidor.</li>";
    }
}
carregar();