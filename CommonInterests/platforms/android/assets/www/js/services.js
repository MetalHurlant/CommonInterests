angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('Account', function () {
    //My data for my profil
    var account = {
        name: 'Metalhurlant',
        user_image: 'img/adam.jpg',
        latitude: '43.12066859999988',
        longitude: '5.9391209000000315',
        interest: ['poney', 'party', 'barbies', 'hardrock'],
    };

    return {
        get: function () {
            return account;
        },
        remove: function (interest) {
            account.interest.splice(account.interest.indexOf(interest), 1);
        },
        interests: function () {
            return account.interest;
        }
    };
})

.factory('Peoples', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
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
        name: 'Chanteur Opéra',
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
        name: 'Jérémy Tablet',
        user_image: 'img/perry.png',
        latitude: '43.120094 ',
        longitude: '5.93693',
        interest: ['poney', 'party', 'hardrock', 'aeromodelism'],
        NbrCommonInterest: 0,
        match_date: '07/02/2017 10h15',
        interestCommon: []
    }];

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
        }

    };
});
