const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3001;

// Rota de boas-vindas para a raiz do servidor
app.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});

// Endpoint para raspagem de produtos da Amazon
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;

    // Verificar se a palavra-chave foi fornecida
    if (!keyword) {
        return res.status(400).json({ error: 'Palavra-chave não fornecida' });
    }

    try {
        // Buscar conteúdo da página de resultados de pesquisa da Amazon
        const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extrair detalhes dos produtos da primeira página de resultados
        const products = [];

        $('.s-result-item').each((index, element) => {
            const title = $(element).find('.a-text-normal').text().trim();
            const rating = $(element).find('.a-icon-star-small').text().trim();
            const reviews = $(element).find('.a-size-small').text().trim();
            const imageUrl = $(element).find('.s-image').attr('src');

            products.push({
                title,
                rating,
                reviews,
                imageUrl
            });
        });

        res.json(products);
    } catch (error) {
        console.error('Erro ao raspar dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
