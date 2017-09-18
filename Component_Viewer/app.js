const appModule = angular.module('registerApp', []);

appModule.controller('componentsRegisterController', ['componentsRegisterService', '$scope', function (componentsRegisterService, $scope) {

    componentsRegisterService.register([
        {
            componentType: 'age',
            name: 'person-age'
        },
        {
            componentType: 'name',
            name: 'person-name'
        },
        {
            componentType: 'address',
            name: 'person-address'
        }
    ]);


}]);

appModule.directive('componentViewer', function (componentsRegisterService, $injector) {
    return {
        restrict: "E",
        template: ` <div class="components">
                        <components component-list="components" 
                        directive-names = "directiveNames"
                        on-directive-name-selected="onDirectiveNameSelected(componentName)"></components>
                        <canvas-component directives="directives"></canvas-component>
                     </div>`,
        scope: {},
        controller: function () {
            const models = {

            };

            this.getNewModel = function (id) {
                return models[id];
            };

            this.saveModel = function (id, model) {
                models[id] = model;
            }
        },

        link: function ($scope, element, attrs, controller) {
            $scope.components = componentsRegisterService.get();
            $scope.directives = [];

            $scope.onDirectiveNameSelected = function (componentName) {
                const id = Math.floor((Math.random() * 20) + 1);

                const componentService = $injector.get('personAgeService');

                const model = componentService.createNewModel(id);

                controller.saveModel(id, model);

                $scope.directives.push({
                    id: id,
                    name: componentName
                });
            };
        }
    }

});

appModule.directive('components', function () {
    return {
        restrict: "E",
        template: ` <component ng-repeat="component in componentList" 
                    component="component" 
                    on-name-selected="onNameSelected(componentName)"></component>`,
        scope: {
            componentList: "=",
            onDirectiveNameSelected: '&'
        },
        link: function ($scope, element, attrs) {
            $scope.onNameSelected = function (componentName) {
                $scope.onDirectiveNameSelected({componentName: componentName})
            }

        }
    }

});

appModule.directive('component', function () {
    return {
        restrict: "E",
        template: ` <div class="component_name" 
                    ng-click="readName(componentName)"
                    ng-click="">{{component.name | uppercase}}
                    </div>`,
        scope: {
            component: "=",
            onNameSelected: '&'

        },
        link: function ($scope, element, attrs) {
            $scope.readName = function () {
                $scope.onNameSelected({componentName: $scope.component.name});
            };

        }
    };
});

appModule.directive('canvasComponent', function ($compile) {
    return {
        restrict: "E",
        template: ``,
        scope: {
            directives: '=',
        },

        link: function ($scope, element, attrs) {
            $scope.$watchCollection('directives', function () {
                element.html('');

                $scope.directives.forEach((directive) => {
                    /*directive.name
                    directive.id*/

                    const content = `<${directive.name} id="${directive.id}"></${directive.name}>`;
                    // const content = `<person-age ></person-age>`;

                    const compiledFn = $compile(content);

                    const newScope = $scope.$new(true);

                    const el = compiledFn(newScope);

                    element.append(el);
                });
            });
        }
    }
});

appModule.directive('personName', ['componentsGetService', function (componentsGetService) {
    return {
        restrict: "E",
        template: `<div personName="personName"> {{personName}}</div>`,

        scope: {
            personName: '='
        },
        link: function ($scope, element, attrs) {
            componentsGetService.getPersonObject().then(function (person) {
                return person.forEach(function (onePerson) {
                    $scope.personName = onePerson.name;
                    console.log($scope.personName)
                })
            });
        }
    };
}]);

appModule.directive('personAddress', ['componentsGetService', function (componentsGetService) {
    return {
        restrict: "E",
        template: `<div person-address="personAddress"> {{personAddress}}</div>`,

        scope: {
            personAddress: '='
        },

        link: function ($scope, element, attrs) {
            componentsGetService.getPersonObject().then(function (person) {
                return person.forEach(function (onePerson) {
                    $scope.personAddress = onePerson.address;
                    console.log($scope.personAddress)
                })
            });
        }
    };
}]);
