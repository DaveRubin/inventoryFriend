'use strict';

angular.module('firebaseApp')
    .directive('addItemForm', function () {
        return {
            templateUrl: 'views/additem.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                scope.newItem = null;

                function resetModel(){
                    scope.newItem = {
                        name:"",
                        type:"dagger",
                        stats:"",
                        position:scope.slotToAddItem.position
                    };
                }


                scope.$watch('slotToAddItem',function(val){
                   if (val){
                       resetModel();
                   }
                });

                scope.closeAddItemPanel = function(){
                    if (!scope.mouseInPanel){
                        scope.slotToAddItem = null;
                    }
                };

                scope.close = function(){
                    scope.slotToAddItem = null;
                };


            }
        };
    });
