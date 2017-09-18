appModule.factory('factory', function ($http) {

    function searchTypeDirective() {
        return $http.get('https://api.tronalddump.io/random/meme')
            .then(function (response) {
                return (response.data);
            });
    }
    return {
        searchTypeDirective: searchTypeDirective,
    }


});




