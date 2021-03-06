'use strict';

angular.module('myApp.version.permission', [])

    .directive('permission', ['AuthService', function (AuthService) {

        return {
            restrict: 'A',
            scope: {
                permission: '='
            },

            link: function (scope, elem, attrs) {
                if (AuthService.isLoggedIn()) {
                    $(elem).show();
                } else {
                    $(elem).hide();
                }
            }
        }
    }]);
