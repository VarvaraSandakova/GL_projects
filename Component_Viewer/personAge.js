appModule.directive('personAge', function (componentsGetService) {
    return {
        restrict: "E",
        template: `<div>
            <p>{{model.id}}:{{model.name}}</p>
            <p>{{personAge}}</p>
        </div>`,

        scope: {
            id: '='
        },

        require: '^componentViewer',

        link: function ($scope, element, attrs, componentViewerController) {
            componentsGetService.getPersonObject().then(function (person) {
                return person.forEach(function (onePerson) {
                    console.log(onePerson)
                    $scope.personAge = onePerson.age;
                    console.log($scope.personAge)
                })
            });

            // $scope.model = componentViewerController.getNewModel(id);
        }
    };
});

appModule.service('personAgeService', function () {
    function PersonAgeModel(id) {
        this.id = id;
        this.name = 'personAgeModel';
    }

    this.createNewModel = function (id) {
        return new PersonAgeModel(id);
    }
});




