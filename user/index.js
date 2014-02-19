var User = function() {

	this.params = {
		userId : null, 
		userName : null, 
		userFullName : null, 
		userEmail : null, 
		userDob : null
	};

	this.fill = function(info) {
		for (var key in this.params) {
			if(this.params[key] !== 'undefined') {
				if(key == 'userId') {
					this.params[key] = 'nc'+info[key];
				} else {
					this.params[key] = info[key];
				}
			}
		}	
	}

	this.setUserId = function (uid) {
		this.params.userId = uid;
	};

	this.setUserName = function (uname) {
		this.params.userName = uname;
	};

	this.setUserFullName = function (ufullname) {
		this.params.userFullName = ufullname;
	};

	this.setUserEmail = function (uemail) {
		this.params.userEmail = uemail;
	};

	this.setUserDob = function(uDob) {
		this.params.userDob = uDob;
	};

	this.getInfo =  function() {
		return this.params;
	}
};

module.exports = function (info) {
	
	var userObj =  new User();
	
	userObj.fill(info);	

	return userObj;
};

