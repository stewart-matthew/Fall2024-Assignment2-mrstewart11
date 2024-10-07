function apiSearch(firstPage = false) {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com//v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '2874b258a90f4f51b32d10cac275c2d4'
        }
    })
        .done(function (data) {
            var firstResult = data.webPages.value[0].url; //finds URL of first search result in array

            if(firstPage){
                window.location.href = firstResult; //returns the href (URL) of the current page
            }
            else{
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').dialog();
                $('#searchResults').css('visibility', 'visible');
            }         
        })
        .fail(function () {
            alert('error');
        });
}

//I know you said two but I liked all of these nature pictures and didn't wanna leave any of them out 
const images = [
    'kimon-maritz-zMV7sqlJNow-unsplash.jpg',
    'jeremy-bishop-EwKXn5CapA4-unsplash.jpg',
    'mourad-saadi-GyDktTa0Nmw-unsplash.jpg',
    'casey-horner-4rDCa5hBlCs-unsplash.jpg',
    'blake-verdoorn-cssvEZacHvQ-unsplash.jpg'
];

const fontColors = [
    '#54548F',
    '#E0B60A',
    '#54548F',
    '#08969B',
    '#154402',
]

$('#searchButton').click(function() {
    apiSearch();
});

let currIm = 0;
$('#header').click(function() {
    currIm = (currIm + 1) % images.length;
    $('body').css('background-image', `url(${images[currIm]})`);
    $('#header').css('color', fontColors[currIm]); //changes font color to match background
});

$('#timeButton').click(function() {
    var d = new Date();
    const currTime = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    
    $('#time').text(currTime).dialog();
    $('#time').css('visibility', 'visible');
});

$('#feelingLuckyButton').click(function() {
    apiSearch(true); //goes into the if statement in the apiSearch call to get the first result
});