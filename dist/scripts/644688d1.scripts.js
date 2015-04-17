"use strict";angular.module("firebaseApp",["firebase"]),angular.module("firebaseApp").controller("MainCtrl",["$scope","DBService","Userinfo","Gameservice","$firebaseObject",function(a,b,c,d,e){a.userInfo=c,a.game=b.getGame(),a.inputs={money:100},a.addMoney=function(){d.setMoney(a.inputs.money)},a.createGame=function(a){b.createGame(a)},a.login=function(){b.googleLogin().then(function(b){console.log("Success: "),a.userInfo.authed=!0,a.userInfo.setUser(JSON.parse(b).google)},function(b){a.userInfo.authed=!1})}}]),angular.module("firebaseApp").service("DBService",["$firebaseArray","$firebaseObject","$q","Gameservice",function(a,b,c,d){var e="https://inventoryfriend.firebaseio.com",f=new Firebase(e);this.authed=!1,this.getUserData=function(a){var d=f.child("users"),e=b(d.child(a));return c(function(a){e.$loaded().then(function(){a(e)})})},this.createGame=function(a){var b=f.child("games"),c=b.push();console.log("my new shiny id is "+c.key()),c.set({name:a,players:[]})},this.getGame=function(a){var c="-Jmsvi30Z336j_3DV1fk",e="-Jmsvi30Z336j_3DV1fk",g=f.child("games/"+c+"/players/"+e);return d.setRef(g),b(g)},this.createUser=function(a,b){var c=f.child("users");c.child(a).set({name:b,asGm:[],asPlayer:[]})},this.googleLogin=function(){return c(function(a,b){f.authWithOAuthPopup("google",function(c,d){c?b(JSON.stringify(c)):a(JSON.stringify(d))},{remember:"sessionOnly"})})}}]),angular.module("firebaseApp").service("Userinfo",["DBService",function(a){this.authed=!1,this.id="",this.displayName="",this.asGM=[],this.asPlayer=[];var b=this;this.setUser=function(c){this.id=c.id,this.displayName=c.displayName,a.getUserData(this.id).then(function(c){c.name||a.createUser(b.id,b.displayName),console.log("got"+c.name)})}}]),angular.module("firebaseApp").service("Gameservice",function(){this.active=!1;var a=null;this.setRef=function(b){a=b,this.active=!0},this.updateInventory=function(b){for(var c=0;c<b.length;c++){var d=b[c];d.$$hashKey&&delete d.$$hashKey}a.update({inventory:b})},this.setMoney=function(b){a.update({money:b})}}),angular.module("firebaseApp").directive("inventory",["Gameservice",function(a){return{templateUrl:"views/inventory.html",restrict:"E",scope:{inventoryArray:"="},link:function(b,c,d){function e(){a.updateInventory(b.inventoryArray)}function f(a){return{position:a}}function g(){b.slots=[];for(var a=0;i>a;a++)b.slots.push(f(a))}function h(){b.itemSelected&&(b.itemSelected.selected=!1),b.itemSelected=null}var i=10;b.slots=[],b.itemSelected=null,b.slotToAddItem=null,b.deleteItem=function(){for(var a=0;a<b.slots.length;a++){var c=b.slots[a];if(c==b.itemSelected){b.slots[a]=f(a);for(var d=0;d<b.inventoryArray.length;d++){var g=b.inventoryArray[d];g==b.itemSelected&&b.inventoryArray.splice(d,1)}return b.itemSelected=null,void e()}}},b.emptySlotClicked=function(a){if(b.itemSelected){var c=b.itemSelected.position;b.slots[a]=b.itemSelected,b.slots[c]=f(c),b.itemSelected.position=a,h(),e()}else b.slotToAddItem=b.slots[a]},b.addItem=function(){b.slotToAddItem.name=b.newItem.name,b.slotToAddItem.type=b.newItem.type,b.slotToAddItem.stats=b.newItem.stats,console.log(b.inventoryArray,b.newItem),b.inventoryArray.push(b.newItem),b.slotToAddItem=null,e()},b.selectItem=function(a){b.slots[a].selected?h():(b.itemSelected&&(b.itemSelected.selected=!1),b.slots[a].selected=!0,b.itemSelected=b.slots[a])},b.$watch("inventoryArray",function(a){if(a){"string"==typeof a&&(b.inventoryArray=JSON.parse(a)),g(),console.log(b.inventoryArray);for(var c=0;c<b.inventoryArray.length;c++){var d=b.inventoryArray[c].position;b.slots[d]=b.inventoryArray[c]}}},!0)}}}]),angular.module("firebaseApp").filter("getItemImage",function(){return function(a){var b="images/"+a+".jpg";return b}}),angular.module("firebaseApp").directive("addItemForm",function(){return{templateUrl:"views/additem.html",restrict:"E",link:function(a,b,c){function d(){a.newItem={name:"",type:"dagger",stats:"",position:a.slotToAddItem.position}}a.newItem=null,a.$watch("slotToAddItem",function(a){a&&d()}),a.closeAddItemPanel=function(){a.mouseInPanel||(a.slotToAddItem=null)},a.close=function(){a.slotToAddItem=null}}}});