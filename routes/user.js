/*
 * GET users listing.
 */

var userData = require('../data');

var userObj =  require('../user');

var cache = require('../local_modules/memcached_client');

var cacheData = cache();

for (var uid in userData) {
	userData[uid] = userObj(userData[uid]);
	
	cacheData.setData(uid, userData[uid].getInfo());

	console.log(JSON.stringify(cacheData.getData(uid)));
}

exports.detail = function(req, res) {

	var requid = req.param("uid");

	if(typeof userData[requid] === 'undefined') {
		res.status(404).json( { status: "error" } );
	} else {

		res.json( userData[requid].getInfo() );
	}
	//res.send("respond with a resource");

};

exports.list = function(req, res){

	res.render('user', {
		 title: 'User List',
		 userData : userData
	} );
	//res.send("respond with a resource");

};