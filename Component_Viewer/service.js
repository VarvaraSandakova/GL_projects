appModule.service('componentsRegisterService', function ($http) {

    var components = [];

    this.register = function (allComponents) {
        allComponents.forEach(function (component) {
            return components.push(component);

        });
    };

    this.get = function () {
        return components;
    };

});




