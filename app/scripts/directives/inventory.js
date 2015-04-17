'use strict';

angular.module('firebaseApp')
    .directive('inventory', function (Gameservice) {
        return {
            templateUrl: 'views/inventory.html',
            restrict: 'E',
            scope: { inventoryArray: '=' },
            link: function postLink(scope, element, attrs) {

                var SLOTS = 10;
                scope.slots = [];
                scope.itemSelected = null;
                scope.slotToAddItem = null;

                function updateInventory(){
                    Gameservice.updateInventory(scope.inventoryArray);
                }

                scope.deleteItem = function () {

                    for (var i = 0; i < scope.slots.length; i++) {
                        var slot = scope.slots[i];

                        if (slot == scope.itemSelected) {
                            scope.slots[i] = getEmptySlot(i);
                            for (var j = 0; j < scope.inventoryArray.length; j++) {
                                var item = scope.inventoryArray[j];
                                if (item == scope.itemSelected)
                                    scope.inventoryArray.splice(j,1);
                            }
                            scope.itemSelected = null;
                            updateInventory();
                            return;
                        }
                    }
                };

                function getEmptySlot(index) {
                    return {position: index};
                }

                function resetList(){
                    scope.slots = [];
                    for (var i = 0; i < SLOTS; i++) {
                        scope.slots.push(getEmptySlot(i));
                    }
                }

                function deselectAll() {
                    if (scope.itemSelected)scope.itemSelected.selected = false;
                    scope.itemSelected = null;
                }

                scope.emptySlotClicked = function (itemIndex) {
                    if (scope.itemSelected) {
                        var selectedPos = scope.itemSelected.position;
                        scope.slots[itemIndex] = scope.itemSelected;
                        scope.slots[selectedPos] = getEmptySlot(selectedPos);
                        scope.itemSelected.position = itemIndex;
                        deselectAll();
                        updateInventory();
                    }
                    else {
                        scope.slotToAddItem = scope.slots[itemIndex];
                    }
                };

                scope.addItem = function(){
                    scope.slotToAddItem.name = scope.newItem.name;
                    scope.slotToAddItem.type = scope.newItem.type;
                    scope.slotToAddItem.stats = scope.newItem.stats;
                    console.log(scope.inventoryArray,scope.newItem);
                    scope.inventoryArray.push(scope.newItem);
                    scope.slotToAddItem = null;
                    updateInventory();
                };

                scope.selectItem = function (itemIndex) {

                    if (!scope.slots[itemIndex].selected) {
                        if (scope.itemSelected)
                            scope.itemSelected.selected = false;
                        scope.slots[itemIndex].selected = true;
                        scope.itemSelected = scope.slots[itemIndex];
                    }
                    else {
                        deselectAll();
                    }
                };

                scope.$watch('inventoryArray', function (val) {
                    if (!val) return;
                    if (typeof val == "string" ){
                        scope.inventoryArray = JSON.parse(val);
                    }
                    resetList();
                    console.log(scope.inventoryArray);
                    for (var i = 0; i < scope.inventoryArray.length; i++) {
                        var pos = scope.inventoryArray[i].position;
                        scope.slots[pos] = scope.inventoryArray[i];
                    }
                }, true)

            }
        };
    });
