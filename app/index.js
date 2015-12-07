var angular = require('angular')

require('ng-file-upload')

require('./stylesheets/style.scss')

var mailApp = angular.module('main', ['ngFileUpload'])

mailApp.controller('ImagesFormController', ['$scope', 'Upload', function ($scope, Upload) {
  console.log($scope.image)

  $scope.uploadImage = function (file) {
    console.log(file)
    Upload.upload({
      url: '/api/images',
      method: 'POST',
      file: file
    }).success(function (data, status, headers, config) {
      console.log(data)
      console.log(status)
    })
  }
}])

module.exports = mailApp
