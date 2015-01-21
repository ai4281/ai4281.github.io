var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('guitarList', function ($scope) {
  $scope.guitars = [
    {'name': 'Gibson LesPaul',
     'snippet': 'Fat tones. Heavy wood.'},
    {'name': 'Fender Stratocaster',
     'snippet': 'Classic look. Classic sound. Boring.'},
    {'name': 'BC Rich Warlock',
     'snippet': 'Terrible sounding. Tryhard design.'},
    {'name': 'Ibanez RG',
     'snippet': 'Superstrat style. Thin sounding. Fast fretboard.'}
  ];
});