const describe = (title, fn) => {
  console.log(title);
  fn();
};

let $beforeEach;

const beforeEach = fn => {
  $beforeEach = fn;
};
const it = (title, fn) => {
  console.log("beforeEach");
  $beforeEach && $beforeEach();
  console.log("fn");
  fn();
};
const xit = () => {};
const xdescribe = () => {};
const expect = valueReceped => {
  return {
    toBe(valueExpected) {
      if (valueExpected === valueReceped) {
        console.log("True");
      } else {
        throw Error("Value different");
      }
    },
    toThrowError(Message) {
      try {
        valueReceped();
        throw Error("Doesnt have error");
      } catch (error) {
        console.log("True");
      }
    },
    toEqual(valueExpected) {
      if (!isEqual(valueReceped, valueExpected)) {
        throw Error("Value different");
      }
    }
  };
};

isEqual = function(a, b) {
  var p, t;
  for (p in a) {
    if (typeof b[p] === "undefined") {
      return false;
    }
    if (b[p] && !a[p]) {
      return false;
    }
    t = typeof a[p];
    if (t === "object" && !isEqual(a[p], b[p])) {
      return false;
    }
    if (
      t === "function" &&
      (typeof b[p] === "undefined" || a[p].toString() !== b[p].toString())
    ) {
      return false;
    }
    if (a[p] !== b[p]) {
      return false;
    }
  }
  for (p in b) {
    if (typeof a[p] === "undefined") {
      return false;
    }
  }
  return true;
};
