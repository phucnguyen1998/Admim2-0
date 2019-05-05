var q = require("q");
var db = require("../common/database.js");

var conn = db.getConnection();

function addAdmin(admin){
	if (admin) {
		var defer = q.defer();
		var query = conn.query('INSERT INTO admin SET ?', admin, function(err,result){
			if (err) {
				defer.reject(err);
			}else{
				defer.resolve(result);
			}
		});
		return defer.promise;
	}
	return false;
}
function getAdminByUsername(username){
	if (username) {
		var defer = q.defer();
		var query = conn.query('SELECT * FROM admin WHERE ?',{username: username}, function(err,result)
		{
			if (err) {
				defer.reject(err);
			}else{
				defer.resolve(result);
			}
		});
		return defer.promise;
	}
	return false;
}

module.exports = {
	addAdmin: addAdmin,
	getAdminByUsername : getAdminByUsername
}