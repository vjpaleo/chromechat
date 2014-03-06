var userData = require('../data');

var userObj =  require('./user');

foreach (var uid in userData) {
	userObj[uid] = userObj(userData[uid]);
}
var reqUId = req.param('uid');

if(typeof userObj[reqUId] === 'undefined') {
	res.status(404).json({status: 'error'});
} else {
	res.json(userObj[reqUId].getInfo());
}
console.log(user002.getInfo());
console.log(user001.getInfo());
