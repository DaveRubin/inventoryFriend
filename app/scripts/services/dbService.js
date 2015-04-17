'use strict';

angular.module('firebaseApp')
    .service('DBService', function DBService( $firebaseArray, $firebaseObject, $q, Gameservice) {
        var BASE_URL = "https://inventoryfriend.firebaseio.com";
        var ref = new Firebase(BASE_URL);
        this.authed = false;

        this.getUserData = function(id){
            var users= ref.child('users');
            var user  =  $firebaseObject(users.child(id));

            return $q(function(resolve) {
                user.$loaded().then(function () {
                    resolve(user);
                });
            });
        };

        this.createGame = function(name){
            var games= ref.child('games');
            var newGame = games.push();
            console.log('my new shiny id is '+newGame.key());
            newGame.set({
                name:name ,
                players:[]
            });
        };

        this.getGame = function(id){
            var gameID = "-Jmsvi30Z336j_3DV1fk";
            var playerID = "-Jmsvi30Z336j_3DV1fk";
            var gameObj= ref.child('games/'+gameID+"/players/"+playerID);
            Gameservice.setRef(gameObj);
            return  $firebaseObject(gameObj);
        };

        this.createUser = function(id,userName){
            var users= ref.child('users');
            users.child(id).set({
                name:userName,
                asGm:[],
                asPlayer:[]
            });
        };

        this.googleLogin = function(){
            return $q(function(resolve, reject) {
                ref.authWithOAuthPopup("google", function (error, authData) {
                    if (error) {
//                        console.log("Login Failed!", error);
                        reject(JSON.stringify(error));
                    } else {
//                        console.log("Authenticated successfully with payload:", authData);
                        resolve(JSON.stringify(authData))
                    }
                },{
                    remember: "sessionOnly"
                });
            });
        };

        // AngularJS will instantiate a singleton by calling "new" on this function
    });
