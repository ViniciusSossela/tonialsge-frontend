'use strict';

angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive',
  'myApp.version.permission'
])

.value('version', '0.1');
