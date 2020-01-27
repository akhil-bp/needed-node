'use strict';
var async =  require("async")

exports.parallelarray = async (event) => {
  console.log("async.parallel start")
  async.parallel([
    function(callback) {
      setTimeout(function() {
        console.log('Task One');
        callback(null, 1);
      }, 200);
    },
    function(callback) {
      setTimeout(function() {
        console.log('Task Two');
        callback(null, 2);
      }, 100);
    }
  ],
  function(err, results) {
    console.log(results);
    // the results array will equal [1, 2] even though
    // the second function had a shorter timeout.
  });
  
};
exports.parallelobject = async (event) => {
  async.parallel({
    task1: function(callback) {
      setTimeout(function() {
        console.log('Task One');
        callback(null, 1);
      }, 200);
    },
    task2: function(callback) {
      setTimeout(function() {
        console.log('Task Two');
        callback(null, 2);
      }, 100);
      }
  }, function(err, results) {
    console.log(results);
    // results now equals to: { task1: 1, task2: 2 }
  });
}
exports.serialarray = async (event) => {
  async.series([
    function(callback) {
      console.log('one');
      callback(null, 1);
    },
    function(callback) {
      console.log('two');
      callback(null, 2);
    },
    function(callback) {
      console.log('three');
      callback(null, 3);
    }
  ],
  function(err, results) {
    console.log(results);
    // results is now equal to [1, 2, 3]
  });
}
exports.serialobject = async (event) => {
  async.series({
    1: function(callback) {
      setTimeout(function() {
        console.log('Task 1');
        callback(null, 'one');
      }, 200);
    },
    2: function(callback) {
      setTimeout(function() {
        console.log('Task 2');
        callback(null, 'two');
      }, 300);
    },
    3: function(callback) {
      setTimeout(function() {
        console.log('Task 3');
        callback(null, 'three');
      }, 100);
    }
  },
  function(err, results) {
    console.log(results);
    // results is now equal to: { 1: 'one', 2: 'two', 3:'three' }
  });
}
exports.waterfall = async (event) => {
  async.waterfall([
    function(callback) {
      callback(null, 'Task 1', 'Task 2');
    },
    function(arg1, arg2, callback) {
      // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
      let arg3 = arg1 + ' and ' + arg2;
      callback(null, arg3);
    },
    function(arg1, callback) {
      // arg1 now equals 'Task1 and Task2'
      arg1 += ' completed';
      callback(null, arg1);
    }
  ], function(err, result) {
    // result now equals to 'Task1 and Task2 completed'
    console.log(result);
  });
}

exports.namedwaterfall = async (event) => {
  async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
  ], function(err, result) {
    // result now equals 'Task1 and Task2 completed'
    console.log(result);
  });
  
  function myFirstFunction(callback) {
    callback(null, 'Task 1', 'Task 2');
  }
  function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
    let arg3 = arg1 + ' and ' + arg2;
    callback(null, arg3);
  }
  function myLastFunction(arg1, callback) {
    // arg1 now equals 'Task1 and Task2'
    arg1 += ' completed';
    callback(null, arg1);
  }
}
exports.queue = async (event) => {
  //executed first finished function only
  async.race([
    function (callback) {
      setTimeout(function () {
        callback(null, 'one');
      }, 101);
    },
    function (callback) {
      setTimeout(function () {
        callback(null, 'two');
      }, 102);
    },
    function (callback) {
      setTimeout(function () {
        callback(null, 'three');
      }, 100);
    }
  ],
    // main callback
    function (err, result) {
      // the result will be equal to 'two' as it finishes earlier than the other 2
      console.log('The result is ', result);
    });
}
