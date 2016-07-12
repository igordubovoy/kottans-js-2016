Promise.prototype.mySome = function(array, count) {
  let
    rejected = [],
    result = [],
    counter = 0;

  if (!(array instanceof Array && array.length >= count)) {
    throw new Error;
  }
  return new Promise((resolve, reject) => {
    function finaly() {
      if (array.length === counter) {
        resolve(result);
      }
    }
    function pushAndRes(elem) {
      result.push(elem);
      counter++;
      finaly();
    }

    array.forEach(elem => {
      if (typeof elem.then == "function") {
        elem
          .then(value => {
            if (result.length < count) {
              pushAndRes(elem);
            }
          }).catch(error => { rejected.push(error) })
      } else if (result.length < count) {
        pushAndRes(elem);
      }
    });

  });
}
