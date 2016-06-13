(function () {
    'use strict';
    //if (typeof Object.assign !== 'function') return;
    var
      forEach = Array.prototype.forEach,
      isEnumerable = Object.prototype.propertyIsEnumerable;

    Object.defineProperty(Object, 'deepAssign', {
      value: function deepAssign(target) {
        if (target == null) throw new TypeError('Cannot convert undefined or null to object');

        target = Object(target);
        forEach.call(arguments, function (elem, index) {
          var from = elem;
          if (index > 0 && from === Object(from) && from != null) {
            Object
              .keys(from)
              .forEach(function (subElem) {
                if (isEnumerable.call(from, subElem)) {
                  target[subElem] = from[subElem];
                }
              });
          }
        });
        return target;
      },
      writable: true,
      configurable: true
    });
})();