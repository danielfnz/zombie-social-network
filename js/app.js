angular.module("zombieApp", [
  'ngRoute',
  'uiGmapgoogle-maps',
  
  ])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAYviC26Qd0oM7kOZnC8hJH47DTvWEgdn4',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});
