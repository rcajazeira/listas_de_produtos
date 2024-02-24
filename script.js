$(document).ready(function() {
    // Manipular o evento de clique no botão de busca
    $('#searchButton').click(function() {
        var keyword = $('#keyword').val().trim();
        
        // Verificar se a palavra-chave foi fornecida
        if (keyword !== '') {
            // Fazer uma chamada AJAX para o ponto de extremidade de back-end
            $.get('/api/scrape?keyword=' + encodeURIComponent(keyword), function(data) {
                // Exibir os resultados na página
                displayResults(data);
            }).fail(function() {
                // Lidar com erros de solicitação AJAX
                $('#results').text('Erro ao obter resultados. Por favor, tente novamente.');
            });
        } else {
            $('#results').text('Por favor, insira uma palavra-chave de pesquisa.');
        }
    });

    // Função para exibir os resultados na página
    function displayResults(products) {
        var resultsDiv = $('#results');
        resultsDiv.empty();

        if (products.length > 0) {
            products.forEach(function(product) {
                var productDiv = $('<div>');
                productDiv.append('<h3>' + product.title + '</h3>');
                productDiv.append('<p>Rating: ' + product.rating + '</p>');
                productDiv.append('<p>Reviews: ' + product.reviews + '</p>');
                productDiv.append('<img src="' + product.imageUrl + '">');
                resultsDiv.append(productDiv);
            });
        } else {
            resultsDiv.text('Nenhum resultado encontrado.');
        }
    }
});

