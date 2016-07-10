Promise.prototype.myMap = function (array, mapper) {
  let
    result = [],
    isRejected = false;

  if (!(array instanceof Array)) {
    throw new Error;
  }

  return new Promise((resolve, reject) => {
    array.forEach(elem => {
      if (typeof elem.then === 'function') {
        elem
          .then(elem => { result.push(mapper(elem)) })
          .catch(() => { isRejected = true });
      } else {
        result.push(mapper(elem));
      }
    })
    isRejected ? reject('REJECTED') : resolve(result);
  })
}
