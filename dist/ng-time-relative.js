(function(e){if("function"==typeof bootstrap)bootstrap("ng-time-relative",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeNgTimeRelative=e}else"undefined"!=typeof window?window.ngTimeRelative=e():global.ngTimeRelative=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
'use strict';

exports = module.exports = function(module) {
  module.directive('relative', ['$timeout', 'moment', directive]);
};

exports.directive = directive;

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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc3RlcGhhbi9Db2RlL2Nsb2FrL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuICBtb2R1bGUuZGlyZWN0aXZlKCdyZWxhdGl2ZScsIFsnJHRpbWVvdXQnLCAnbW9tZW50JywgZGlyZWN0aXZlXSk7XG59O1xuXG5leHBvcnRzLmRpcmVjdGl2ZSA9IGRpcmVjdGl2ZTtcblxuZnVuY3Rpb24gZGlyZWN0aXZlKCR0aW1lb3V0LCBtb21lbnQpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0FDJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIHZhciBkYXRlID0gbW9tZW50KGF0dHJzLmRhdGV0aW1lIHx8IGVsZW1lbnQudGV4dCgpKTtcbiAgICAgIHZhciB0byA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9tZW50KGF0dHJzLnRvKTsgfTtcbiAgICAgIHZhciB3aXRob3V0U3VmZml4ID0gJ3dpdGhvdXRTdWZmaXgnIGluIGF0dHJzO1xuICAgICAgdmFyIHRpbWVvdXQ7XG5cbiAgICAgIGlmICghYXR0cnMudGl0bGUpXG4gICAgICAgIGVsZW1lbnQuYXR0cigndGl0bGUnLCBkYXRlLmZvcm1hdCgpKTtcblxuICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcbiAgICAgICAgZWxlbWVudC50ZXh0KGRhdGUuZnJvbSh0bygpLCB3aXRob3V0U3VmZml4KSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUxhdGVyKCkge1xuICAgICAgICB1cGRhdGVUaW1lKCk7XG4gICAgICAgIHRpbWVvdXQgPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICB1cGRhdGVMYXRlcigpO1xuICAgICAgICB9LCBuZXh0VXBkYXRlSW4oKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG5leHRVcGRhdGVJbigpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gbW9tZW50KCkuZGlmZihkYXRlKTtcbiAgICAgICAgaWYgKGRlbHRhIDwgNDVlMykgcmV0dXJuIDQ1ZTMgLSBkZWx0YTtcbiAgICAgICAgaWYgKGRlbHRhIDwgOTBlMykgcmV0dXJuIDkwZTMgLSBkZWx0YTtcbiAgICAgICAgaWYgKGRlbHRhIDwgNDUgKiA2MGUzKSByZXR1cm4gNjBlMyAtIChkZWx0YSArIDMwZTMpICUgNjBlMztcbiAgICAgICAgcmV0dXJuIDM2NjBlMyAtIGRlbHRhICUgMzYwMGUzO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50LmJpbmQoJ2Rlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXQpO1xuICAgICAgfSk7XG5cbiAgICAgIHVwZGF0ZUxhdGVyKCk7XG4gICAgfVxuICB9O1xufVxuIl19(1)
});
;