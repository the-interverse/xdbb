var moment = require('moment');

/*var date = moment();

date.add(1, 'year').subtract(9, 'month');
console.log(date.format('MMM Do, YYYY'));*/

var someTimeStamp = moment().valueOf(); //returns time in miliseconds like new Date().getTime();
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('h:mm a'));