angular.module('myApp', ['ui.bootstrap'])
    .controller('myController', ['$scope', '$uibModal', function($scope, $uibModal) {
        $scope.employees = [
            {
                sNo: 1,
                name: 'John Doe',
                organization: 'XYZ Corp',
                daysPresent: 20,
                salary: 5000
            },
            {
                sNo: 2,
                name: 'Jane Smith',
                organization: 'ABC Corp',
                daysPresent: 18,
                salary: 4500
            },
            {
                sNo: 3,
                name: 'Bob Johnson',
                organization: 'LMN Corp',
                daysPresent: 22,
                salary: 5500
            }
        ];
        $scope.openModal = function(employee) {
            var modalInstance = $uibModal.open({
                templateUrl: 'modal.html',
                controller: 'modalController',
                resolve: {
                    employee: function() {
                        return angular.copy(employee);
                    }
                }
            });

            modalInstance.result.then(function(modifiedEmployee) {
                // Apply the changes to the original employee object
                employee.name = modifiedEmployee.name;
                employee.organization = modifiedEmployee.organization;
                employee.salary = modifiedEmployee.salary;
            }, function() {
                // Modal dismissed
            });
        };
    }])
    .controller('modalController', ['$scope', '$uibModalInstance', 'employee', function($scope, $uibModalInstance, employee) {
        $scope.modifiedEmployee = angular.copy(employee);

        $scope.applyChanges = function() {
            // Apply the modified employee object when "OK" button is clicked
            $uibModalInstance.close($scope.modifiedEmployee);
        };

        $scope.cancel = function() {
            // Dismiss the modal when "Cancel" button is clicked
            $uibModalInstance.dismiss('cancel');
        };
    }]);


