var Cache = function() {

	var Memcached = require('memcached');

	var servers = { '127.0.0.1:11211': 1, '127.0.0.1:11212': 1};
	var options = {};
	var memcached = new Memcached(servers, options);
	 
	var logDetails = function(details){
		console.log(JSON.stringify(details, null, 4));
	};

	memcached.on('issue', logDetails);
	memcached.on('failure', logDetails);
	memcached.on('reconnecting', logDetails);
	memcached.on('reconnected', logDetails);
	memcached.on('remove', logDetails);

	var logResult = function(operation, err) {

		if(err){
			console.log(operation + " [fail]: " + err);
		}
		else{
			console.log(operation + " [success]");
		}
	};

	this.setData = function(key, data) {
		
		memcached.set(key, data, 50, function (err) {
			logResult('set', err);
		});
	}


	this.getData = function(key) {

		 var data = memcached.get(key, function (err, data) {
	
			logResult('get', err);
			console.log(data);

		});

		return data;
	}

	this.delData = function(key) {
		memcached.del(key, function (err) {
			logResult ('del', err);
	 	});
	}
}

module.exports = function() {
	var cacheObj =  new Cache();

	cacheObj.setData('foo', 'bar');

	console.log(cacheObj.getData('foo'));

	return cacheObj;
};
/*
memcached.set('foo', 'bar', 50, function (err) {

	logResult('set', err);
	
	memcached.get('foo', function (err, data) {
	
		logResult('get', err);
		console.log(data);

		memcached.del('foo', function (err) {
			logResult('del', err);
	 	});
	});
});
*/
