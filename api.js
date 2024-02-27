const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 4000;

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
    
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        };

        // Buscar conteúdo da página de resultados de pesquisa da Amazon com base na palavra-chave
        const response = await axios.get(`https://www.amazon.com/s?k=htmlData{keyword}`, { headers });
        
        const html = response.data;
        const htmlData = cheerio.load(html);
        console.log('valor',htmlData)
        // Extrair detalhes dos produtos da primeira página de resultados
        const products = [];

        htmlData('.s-result-item').each((index, element) => {
        
            const title = htmlData(element).find('.a-text-normal').text().trim();
            const rating = htmlData(element).find('.a-icon-star-small').text().trim();
            const reviews = htmlData(element).find('.a-size-small').text().trim();
            const imageUrl = htmlData(element).find('.s-image').attr('src');

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
    console.log(`Servidor rodando em http://localhost:htmlData${PORT}`);
});
