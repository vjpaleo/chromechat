var userData = require('../data');

var userObj =  require('./user');

foreach (var uid in userData) {
	userObj[uid] = userObj(userData[uid]);
}
var user001 = userObj(userData);

console.log(user001.getInfo());

var userData = {
	userName: 'anniepundir',
 	userId: 1973,
	userFullName: 'Annie Pundir',
	userEmail: 'annie.pundir@gmail.com',
	userDob: '01-10-1973'
}
var user002 =  userObj(userData);

user002.setUserId('nc1984');

console.log(user002.getInfo());
console.log(user001.getInfo());
