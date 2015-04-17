'use strict';

angular.module('firebaseApp')
  .service('Userinfo', function Userinfo(DBService) {
        this.authed = false;
        this.id = "";
        this.displayName = "";
        this.asGM = [];
        this.asPlayer = [];
        var that = this;

        this.setUser = function(googleInfo){
            this.id = googleInfo.id;
            this.displayName = googleInfo.displayName;
            //find out if a user already exist if not, create user
            DBService.getUserData(this.id).then(function (data) {
                if (!data.name){
                    DBService.createUser(that.id,that.displayName);
                }
                console.log('got'+data.name);
            });
        }
  });
