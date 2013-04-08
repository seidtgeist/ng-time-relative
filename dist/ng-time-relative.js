(function(e){if("function"==typeof bootstrap)bootstrap("ng-time-relative",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeNgTimeRelative=e}else"undefined"!=typeof window?window.ngTimeRelative=e():global.ngTimeRelative=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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
    link: function(scope, element, attrs) {
      var date = moment(attrs.datetime || element.text());
      var to = function() { return moment(attrs.to); };
      var withoutSuffix = 'withoutSuffix' in attrs;
      var timeout;

      if (!attrs.title)
        element.attr('title', date.format());

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

      element.bind('destroy', function() {
        $timeout.cancel(timeout);
      });

      updateLater();
    }
  };
}

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc3RlcGhhbi9Db2RlL2Nsb2FrL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuICBtb2R1bGUuZGlyZWN0aXZlKCdyZWxhdGl2ZScsIFsnJHRpbWVvdXQnLCAnbW9tZW50JywgZGlyZWN0aXZlXSk7XG59O1xuXG5leHBvcnRzLmRpcmVjdGl2ZSA9IGRpcmVjdGl2ZTtcblxuaWYgKGFuZ3VsYXIpIHtcbiAgdmFyIG1vZCA9IGFuZ3VsYXIubW9kdWxlKCd0aW1lUmVsYXRpdmUnLCBbXSk7XG4gIGlmIChtb21lbnQpIG1vZC5jb25zdGFudCgnbW9tZW50JywgbW9tZW50KTtcbiAgZXhwb3J0cyhtb2QpO1xufVxuXG5mdW5jdGlvbiBkaXJlY3RpdmUoJHRpbWVvdXQsIG1vbWVudCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUMnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgdmFyIGRhdGUgPSBtb21lbnQoYXR0cnMuZGF0ZXRpbWUgfHwgZWxlbWVudC50ZXh0KCkpO1xuICAgICAgdmFyIHRvID0gZnVuY3Rpb24oKSB7IHJldHVybiBtb21lbnQoYXR0cnMudG8pOyB9O1xuICAgICAgdmFyIHdpdGhvdXRTdWZmaXggPSAnd2l0aG91dFN1ZmZpeCcgaW4gYXR0cnM7XG4gICAgICB2YXIgdGltZW91dDtcblxuICAgICAgaWYgKCFhdHRycy50aXRsZSlcbiAgICAgICAgZWxlbWVudC5hdHRyKCd0aXRsZScsIGRhdGUuZm9ybWF0KCkpO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKCkge1xuICAgICAgICBlbGVtZW50LnRleHQoZGF0ZS5mcm9tKHRvKCksIHdpdGhvdXRTdWZmaXgpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlTGF0ZXIoKSB7XG4gICAgICAgIHVwZGF0ZVRpbWUoKTtcbiAgICAgICAgdGltZW91dCA9ICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHVwZGF0ZUxhdGVyKCk7XG4gICAgICAgIH0sIG5leHRVcGRhdGVJbigpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbmV4dFVwZGF0ZUluKCkge1xuICAgICAgICB2YXIgZGVsdGEgPSBtb21lbnQoKS5kaWZmKGRhdGUpO1xuICAgICAgICBpZiAoZGVsdGEgPCA0NWUzKSByZXR1cm4gNDVlMyAtIGRlbHRhO1xuICAgICAgICBpZiAoZGVsdGEgPCA5MGUzKSByZXR1cm4gOTBlMyAtIGRlbHRhO1xuICAgICAgICBpZiAoZGVsdGEgPCA0NSAqIDYwZTMpIHJldHVybiA2MGUzIC0gKGRlbHRhICsgMzBlMykgJSA2MGUzO1xuICAgICAgICByZXR1cm4gMzY2MGUzIC0gZGVsdGEgJSAzNjAwZTM7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuYmluZCgnZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkdGltZW91dC5jYW5jZWwodGltZW91dCk7XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlTGF0ZXIoKTtcbiAgICB9XG4gIH07XG59XG4iXX0=(1)
});
;