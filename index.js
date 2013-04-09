'use strict';

exports = module.exports = function(module) {
  module.directive('relative', ['$timeout', 'moment', directive]);
};

exports.directive = directive;

if (angular) {
  var mod = angular.module('timeRelative', []);
  if (moment) mod.constant('moment', moment);
  exports(mod);
}

function directive($timeout, moment) {
  return {
    restrict: 'AC',
    scope: {
      datetime: '@'
    },
    link: function(scope, element, attrs) {
      var timeout;

      scope.$watch('datetime', function(dateString) {
        $timeout.cancel(timeout);

        var date = moment(dateString);
        if (!date) return;
        var to = function() { return moment(attrs.to); };
        var withoutSuffix = 'withoutSuffix' in attrs;

        if (!attrs.title)
          element.attr('title', date.format('LLLL'));

        function updateTime() {
          element.text(date.from(to(), withoutSuffix));
        }

        function updateLater() {
          updateTime();
          timeout = $timeout(function() {
            updateLater();
          }, nextUpdateIn());
        }

        function nextUpdateIn() {
          var delta = moment().diff(date);
          if (delta < 45e3) return 45e3 - delta;
          if (delta < 90e3) return 90e3 - delta;
          if (delta < 45 * 60e3) return 60e3 - (delta + 30e3) % 60e3;
          return 3660e3 - delta % 3600e3;
        }

        element.bind('$destroy', function() {
          $timeout.cancel(timeout);
        });

        updateLater();
      });
    }
  };
}
