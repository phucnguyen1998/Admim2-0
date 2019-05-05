var q = require("q");
var db = require("../common/database.js");

var conn = db.getConnection();

function addUser(user){
	if (user) {
		var defer = q.defer();
		var query = conn.query('INSERT INTO register SET ?', user, function(err,result){
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
function deleteUser(username){
	if (username) {
		var defer = q.defer();
		var query = conn.query('DELETE FROM register WHERE username= ?',[username], function(err,result)
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
function getUserByUsername(username){
	if (username) {
		var defer = q.defer();
		var query = conn.query('SELECT * FROM register WHERE ?',{username: username}, function(err,result)
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
function getAllUser(){
	var defer = q.defer();
	var query = conn.query('SELECT * FROM register', function(err,users)
	{
		if (err) {
			defer.reject(err);
		}else{
			defer.resolve(users);
		}
	});
	return defer.promise;
}
module.exports = {
	addUser: addUser,
	deleteUser: deleteUser,
	getUserByUsername : getUserByUsername,
	getAllUser: getAllUser
}