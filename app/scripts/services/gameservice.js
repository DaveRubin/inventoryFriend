'use strict';

angular.module('firebaseApp')
  .service('Gameservice', function Gameservice() {
    // AngularJS will instantiate a singleton by calling "new" on this function
        this.active = false;
        var gameRef = null;

        this.setRef = function(ref){
            gameRef = ref;
            this.active = true;
        };

        this.updateInventory = function(inventory){

            for (var i = 0; i < inventory.length; i++) {
                var obj = inventory[i];
                if (obj.$$hashKey) delete obj.$$hashKey;
            }
            gameRef.update(
                {"inventory": inventory});
        };

        this.setMoney = function(amount){
            gameRef.update({
              "money": amount
            });
        }
  });
