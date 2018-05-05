const describe = (title, fn) => {
	console.log(title);
	fn();
};

let $beforeEach;

const beforeEach = (fn) => {
	$beforeEach = fn;
};
const it = (title, fn) => {
	console.log('beforeEach');
	$beforeEach();
	console.log('fn');
	fn();
};
const xit = () => {};
const expect = (valueReceped) => {
	return {
		toBe(valueExpected) {
			if (valueExpected === valueReceped){
                console.log("True");
            } else {
                throw Error("Value different");
            }
        },
        toThrowError(Message){
            try {
                valueReceped();
                throw Error("Doesnt have error");
            } catch (error) {
                console.log("True")
            }
        }
	};
};
