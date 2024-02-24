// app.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ error: 'Palavra-chave não fornecida' });
    }

    try {
        const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`);
        const html = response.data;
        const $ = cheerio.load(html);

        const products = [];

        $('.s-result-item').each((index, element) => {
            const title = $(element).find('.a-text-normal').text();
            const rating = $(element).find('.a-icon-star-small').text();
            const reviews = $(element).find('.a-size-small').text();
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
