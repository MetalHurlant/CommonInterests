angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AccueilCtrl', function ($scope, Peoples, Account, $state, $rootScope) {
    //chargement de tous les peoples contenus dans la "base de données"

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        var allPeoples = Peoples.all();
        var commonPeoples = new Array();
        var myAccount = Account.get();
        for (x in allPeoples) {
            allPeoples[x].interestCommon = new Array();
            var flagPeople = -1;
            for (var d = 0; d < commonPeoples.length; d++) {
                if (commonPeoples[d] === allPeoples[x]) {
                    flagPeople++;
                }
            }
            if (flagPeople < 0) {
                var flagInterest = 0;
                for (var i = 0; i < myAccount.interest.length; i++) {
                    for (var a = 0; a < allPeoples[x].interest.length; a++) {
                        if (myAccount.interest[i] === allPeoples[x].interest[a]) {


                            flagInterest++;

                            //Pour récupère uniquement les points communs pour les afficher ensuite dans l'accueil
                            allPeoples[x].interestCommon.push(allPeoples[x].interest[a]);
                        }
                    }
                }
                if (flagInterest > 0) {
                    //on range le nombre d'intérêts communs que cette personne a avec moi
                    allPeoples[x].NbrCommonInterest = flagInterest;
                    //on ajoute le people à la liste des personnes qui ont des points communs avec moi
                    commonPeoples.push(allPeoples[x]);
                }
            }
        }
        $rootScope.peoples = commonPeoples;
        commonPeoples.sort(function (a, b) {
            return b.NbrCommonInterest - a.NbrCommonInterest;
        })
        $scope.depuis = function (date) {
            return moment(date, "DD/MM/YYYY h[h]mm").fromNow();
        }
        $scope.goToPeople = function (peopleID) {
            $state.go('tab.people-detail', { peopleID: peopleID })
        }
        $scope.remove = function (people) {
            Peoples.remove(people);
            commonPeoples.splice(commonPeoples.indexOf(people), 1);
        }
    });
})

.controller('PeopleDetailCtrl', function ($scope, $stateParams, Peoples, $state) {

    //on récupère dans une variable un objet people en fonction de son id
    var onePeople = Peoples.get($stateParams.peopleID)

    //on utilise cet objet people pour récupérer son tableau d'intérêts et le mettre dans un scope
    $scope.interests = Peoples.allInterests(onePeople);

    //on met l'objet people dans un scope
    $scope.people = onePeople;

    //pour savoir combien de temps s'est écoulé depuis la date du matching
    $scope.depuis = function (date) {
        return moment(date, "DD/MM/YYYY h[h]mm").fromNow();
    }

    //Suppression du peole dans la 'base données' ET dans l'affichage du HOME 
    //depuis le people-detail.html (on passe par le $rootScope pour le faire) avec une redirection de la vue dans le HOME.
    $scope.returnAndDelete = function (people) {
        Peoples.remove(people);
        $scope.peoples.splice($scope.peoples.indexOf(people), 1);
        $state.go('tab.accueil', { null: null });
    }
})

.controller('MapsCtrl', function ($scope, $ionicLoading, $compile, $state, Peoples) {
    var allPeoples = Peoples.all();
    $scope.goToPeople = function (peopleID) {
        $state.go('tab.map-people-detail', { peopleID: peopleID })
    }

    /** VARIABLES **/
    var mapDiv = document.getElementById('map'); //div contenant la carte
    var dragID = 0; //chaque drag a un ID different (permet de savoir si c'est le dernier
    var mapOptions = { //option initiale de la carte
        center: new google.maps.LatLng(43.12, 5.9),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.infowindow = new google.maps.InfoWindow({
        content: ''
    });

    /** FUNCTIONS **/
    //centre sur la position du device
    function centerMapOnMe() {
        $scope.map.panTo($scope.GeoMarker.getPosition());
    };
    //initialise la carte
    function initMap() {
        $scope.map = new google.maps.Map(mapDiv, mapOptions);
        $scope.GeoMarker = new GeolocationMarker($scope.map);
        $scope.GeoMarker.setCircleOptions({ fillColor: '#808080' });
        google.maps.event.addListenerOnce($scope.GeoMarker, 'position_changed', function () {
            centerMapOnMe();
        });
        google.maps.event.addListener($scope.GeoMarker, 'geolocation_error', function (e) {
            alert('There was an error obtaining your position. Message: ' + e.message);
        });
    };

    
    //Ajoute un marqueur sur la carte
    function addMarker(img, Buddy) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(Buddy.latitude, Buddy.longitude),
            clickable: true,
            title: Buddy.name,
            icon: img
        });

        marker.setAnimation(google.maps.Animation.DROP);
        marker.setMap($scope.map);

        var content = '<a ng-click="goToPeople(' + Buddy.id + ')" class="btn btn-default">' + Buddy.name + '</a>';
        var compiledContent = $compile(content)($scope)

        google.maps.event.addListener(marker, 'click', (function (marker, content, scope) {
            return function () {
                scope.infowindow.setContent(content);
                scope.infowindow.open(scope.map, marker);
            };
        })(marker, compiledContent[0], $scope));
    };

    function waitForElement(img, Buddy) {
        console.log("wait");
        if (typeof img !== "undefined") {
            addMarker(img, Buddy);
        }
        else {
            setTimeout(waitForElement, 250);
        }
    }

    function createMarker(Buddy) {
        var canvas = document.createElement("canvas");
        canvas.width = 50;
        canvas.height = 71;
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, 50, 71);
        var image1 = new Image();
        image1.src = Buddy.user_image;
        image1.onload = function () {
            context.globalCompositeOperation = "source-over";
            context.drawImage(image1, 7, 7, 35, 35);
            var image2 = new Image();
            image2.src = "img/marker.png";
            image2.onload = function () {
                context.globalCompositeOperation = "source-over";
                context.drawImage(image2, 0, 0, canvas.width, canvas.height);
                img = canvas.toDataURL('img/png', 1);
                waitForElement(img, Buddy);
            }
        }
    };


    /** CODE **/
    initMap();
    allPeoples.forEach(function (Buddy) {
        console.log(Buddy);
        createMarker(Buddy);
    })

    /** EVENT LISTENER **/
    //si on déplace le centre de la carte puis $tempo sec sans chagement de centre => recentre la carte
    $scope.map.addListener('drag', function () {
        dragID++; //incrémentation ID
        var j = dragID; //chaque drag a un numéro different
        window.setTimeout(function () { //on attent 10 secondes
            if (dragID == j) { //si le drag est le dernier effectué
                centerMapOnMe(); //on recentre la map
            }
        }, 5000); //definition de $tempo en ms => 5sec
    });

})

.controller('AccountCtrl', function ($scope, Account) {
    $scope.me = Account.get();

    $scope.remove = function (interest) {
        Account.remove(interest);
        $scope.me.interests.splice($scope.me.interests.indexOf(interest), 1);
    }
    $scope.me = Account.get();
    $scope.me.interests = Account.interests();

    $scope.remove = function (interest) {
        Account.remove(interest);
    }
})


