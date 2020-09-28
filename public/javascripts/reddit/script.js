$(document).ready(function () {
    $.getJSON( "public/jsons/reddit/showed_scraps.json/", function( data ) {
        console.log(data);
    });
});