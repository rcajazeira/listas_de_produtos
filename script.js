$(document).ready(function() {
    $('#searchButton').click(function() {
        var keyword = $('#keyword').val();
        if (keyword.trim() !== '') {
            $.get('/api/scrape?keyword=' + encodeURIComponent(keyword), function(data) {
                displayResults(data);
            });
        }
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
            resultsDiv.text('Nenhum resultado encontrado');
        }
    }
});
