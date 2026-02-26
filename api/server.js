import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03ma'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Conectado ao banco web_03ma com sucesso!');
});

// CADASTRAR PRODUTO
app.post('/products', (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' });
    }

    const sql = `
        INSERT INTO products_eduardo 
        (nome, descricao, preco, categoria) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nome, descricao, preco, categoria], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao cadastrar produto.' });
        }

        res.status(201).json({
            message: 'Produto cadastrado com sucesso!',
            id: result.insertId
        });
    });
});

// LISTAR PRODUTOS
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products_eduardo ORDER BY id DESC';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }

        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});