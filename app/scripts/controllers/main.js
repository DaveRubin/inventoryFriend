'use strict';

angular.module('firebaseApp')
    .controller('MainCtrl', function ($scope,  DBService,Userinfo ,Gameservice ,$firebaseObject) {

        $scope.userInfo = Userinfo;
        $scope.game = DBService.getGame();
        $scope.inputs = {
            money:100
        };

        $scope.addMoney = function(){
            Gameservice.setMoney($scope.inputs.money);
        };

        $scope.createGame = function (name) {
            DBService.createGame(name);
        };

        $scope.login = function () {
            DBService.googleLogin().then(function (data) {
                console.log('Success: ');
                $scope.userInfo.authed = true;
                $scope.userInfo.setUser(JSON.parse(data).google);
            }, function (reason) {
                $scope.userInfo.authed = false;
//                console.log('Failed: ' + reason);
            });
        };


//        ref.authWithPassword({
//          "email": "dudrubin@gmail.com",
//          "password": "Chickodude84"
//        }, function(error, authData) {
//          if (error) {
//            console.log("Login Failed!", error);
//          } else {
//              var name = (authData.password.email);
//            var ref2 = new Firebase("https://inventoryfriend.firebaseio.com/users/u1");
//              $scope.userInfo = $firebaseObject(ref2);
//            console.log("Authenticated successfully with payload:", authData);
//          }
//        });

//        $scope.addMessage = function (message) {
//            if (!message)console.log("no message");
//            else {
//                console.log("A",message);
//                $scope.messages.$add({
//                    text: message
//                });
//            }
////
//        };
    });
