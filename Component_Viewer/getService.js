appModule.service('componentsGetService', function ($http) {

    function preparePersonData(response) {
        return response.data.map(function (person) {
            return{
                address: person.address,
                name: person.name,
                age: person.age
            };
        });
    }
    this.getPersonObject = function () {
        return $http.get('http://www.json-generator.com/api/json/get/bZgmaheDiq?indent=2')
            .then(function (response) {
                return preparePersonData(response)
            });
    }

});




