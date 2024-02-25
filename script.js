$(document).ready(function() {
    $('#searchButton').click(function() {
        var keyword = $('#keyword').val().trim();

        if (keyword !== '') {
            $.ajax({
                url: '/api/scrape',
                method: 'GET',
                data: { keyword: keyword },
                success: function(data) {
                    displayResults(data);
                },
                error: function(xhr, status, error) {
                    $('#results').text('Erro ao obter resultados: ' + error);
                }
            });
        } else {
            $('#results').text('Por favor, insira uma palavra-chave de pesquisa.');
        }
    });
});

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
