// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// NaN, null, infinity all return null (not in strings)
// strings return strings with single quotes
// booleans return a string 'true'
// undefined, functions, and symbols are ommitted (ignore symbols for now)
// dates come back as strings

// in an object, undefined, functions, symbols - are skipped
// in an array, undefined, functions, symbols - converted to null
// not in an array, those become undefined

// '"string"'


//I - any object
//O - returns a JSON string (final value is a string, with elements inside being stringified)
//C -
//E - NaN, null, infinity all come back as null;
//    functions and undefined are completely skipped and return no value;

var stringifyJSON = function(obj) {
  // helper function: check for undefined, function, or symbol
  var validCheck = function (value) {
    // check if undefined or function or symbol
    if (obj === undefined || typeof obj === 'function' || typeof obj === 'symbol') {
      // return true
      return true;
    }
  };

  //BASE CASE: determine data type of passed in value, convert value into appropriate string form, return it as part of string
  //number, string, boolean, will get returned
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    //not toString because the whole value will get stringified at the end
    return '' + obj + '';
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (validCheck(obj)) {
    //outside anything, undefined
    return undefined;
    //in an array, converted to null
    //in an object, skipped entirely
  } else if (obj === null) {
    return 'null';
  }

  //RECURSIVE CASE: if the passed in value is an array
  //check for array
  if (Array.isArray(obj)) {
    // create storage array
    var storageArray = [];
    // for loop through array
    for (var i = 0; i < obj.length; i++) {
      // call helper function
      if (validCheck(obj[i])) {
        // add null entry to storage array
        storageArray.push(null);
      } else {
      // push stringifyJSON on element
        storageArray.push(stringifyJSON(obj[i]));
      }
      // return storage array
      return '"' + storageArray + '"';
    }
  }

  //RECURSIVE CASE 2: if passed in value is a non-null object
  // check if object
  if (typeof obj === 'object') {
    // create storage object
    var storageObject = {};
    // for in loop through object
    for (element in obj) {
      // create key and value variables
      var key, value;
      // assign key to strigified key value
      key = stringifyJSON(element);
      // assign value to stringified value
      value = stringifyJSON(obj[element]);
      // create new stringified properties to add to storage object
      storageObject[key] = value;
    }
    // return storage object as string
    return '"' + storageObject + '"';
  }

  // //return the final value, converted to a string
  // return tempString.toString();
};
