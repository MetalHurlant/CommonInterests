angular.module('starter.services', [])

.factory('Account', function ($window) {
    //My data for my profil
    if (typeof $window.localStorage.myInterests == "undefined") {
        var account = {
            name: 'Metalhurlant',
            user_image: 'img/adam.jpg',
            latitude: '43.12066859999988',
            longitude: '5.9391209000000315',
            interest: ['poney', 'party', 'barbies', 'hardrock'],
        };
        $window.localStorage.myInterests = JSON.stringify(account);
    }
    var account = JSON.parse($window.localStorage.myInterests);

    return {
        get: function () {
            return account;
        },
        remove: function (interest) {
            account.interest.splice(account.interest.indexOf(interest), 1);
        },
        interests: function () {
            return account.interest;
        },
        addInterest: function (newInterest) {
            account.interest.push(newInterest);
        },
        save:  function () {
            $window.localStorage.myInterests = JSON.stringify(account);
        }
    };
})

.factory('Peoples', function ($window) {
    // Might use a resource here that returns a JSON array

    /** CONSIGNES pour les TESTS et DEBUGS:
    * Pour re-initialiser le fichier json avec tous les peoples ci-dessous remplacez :
    typeof $window.localStorage.localPeoples == "undefined"
    par :
    typeof $window.localStorage.localPeoples != "undefined"
    lancer l'émulateur, arrêtez l'émulateur, puis remettez :
    typeof $window.localStorage.localPeoples == "undefined"
    relancez l'émulateur.
    */

    if (typeof $window.localStorage.localPeoples == "undefined") {
        var peoples = [{
            id: 0,
            name: 'Eleves ISEN',
            user_image: 'img/adam.jpg',
            latitude: '43.12066859999999',
            longitude: '5.9391209000000345',
            interest: ['voiture', 'poney', 'Aquabike'],
            NbrCommonInterest: 0,
            match_date: '17/01/2017 14h30',
            interestCommon: []
        }, {
            id: 1,
            name: 'Rugbiman RCT',
            user_image: 'img/ben.png',
            latitude: '43.118982',
            longitude: '5.936493000000041',
            interest: ['sport'],
            NbrCommonInterest: 0,
            match_date: '24/02/2016 8h30',
            interestCommon: []
        }, {
            id: 2,
            name: 'Chanteur Opera',
            user_image: 'img/max.png',
            latitude: '43.124156 ',
            longitude: '5.932355',
            interest: ['music'],
            NbrCommonInterest: 0,
            match_date: '15/12/2016 12h24',
            interestCommon: []
        }, {
            id: 3,
            name: 'Julien Cassagne',
            user_image: 'img/mike.png',
            latitude: '43.122976',
            longitude: '5.925429',
            interest: ['velo', 'dessin'],
            NbrCommonInterest: 0,
            match_date: '05/10/2016 05h30',
            interestCommon: []
        }, {
            id: 4,
            name: 'Jeremy Monpullalenvers',
            user_image: 'img/perry.png',
            latitude: '43.120044 ',
            longitude: '5.93693',
            interest: ['poney', 'party', 'hardrock', 'aeromodelism'],
            NbrCommonInterest: 0,
            match_date: '07/24/1995 07h10',
            interestCommon: []
        }, {
            id: 5,
            name: 'Henri Hans',
            user_image: 'img/perry.png',
            latitude: '43.120096 ',
            longitude: '5.93691',
            interest: ['party', 'barbies', 'aeromodelism'],
            NbrCommonInterest: 0,
            match_date: '14/06/2011 10h15',
            interestCommon: []
        }, {
            id: 6,
            name: 'Jack Sparow',
            user_image: 'img/perry.png',
            latitude: '43.120074 ',
            longitude: '5.93653',
            interest: ['poney', 'gym', 'party', 'honey', 'aeromodelism'],
            NbrCommonInterest: 0,
            match_date: '08/05/2012 10h55',
            interestCommon: []
        }, {
            id: 7,
            name: 'Jeremy Monpullalendroit',
            user_image: 'img/perry.png',
            latitude: '43.120099 ',
            longitude: '5.93690',
            interest: ['insects', 'hardrock', 'aeromodelism', 'animals'],
            NbrCommonInterest: 0,
            match_date: '07/02/2014 00h15',
            interestCommon: []
        }];
        $window.localStorage.localPeoples = JSON.stringify(peoples);
    }
    var peoples = JSON.parse($window.localStorage.localPeoples);

    return {
        //fonction pour retourner l'ensemble de tous les peoples
        all: function () {
            return peoples;
        },

        //fonction pour supprimer un people
        remove: function (people) {
            peoples.splice(peoples.indexOf(people), 1);
        },

        //fonction pour permettre de retourner un people
        get: function (peopleId) {
            for (var i = 0; i < peoples.length; i++) {
                if (peoples[i].id === parseInt(peopleId)) {
                    return peoples[i];
                }
            }
            return null;
        },

        //fonction pour permettre de retourner tous les intérêts en fonction d'un people
        allInterests: function (people) {
            return people.interest;
        },

        save: function () {
            $window.localStorage.localPeoples = JSON.stringify(peoples);
        }

    };
});
