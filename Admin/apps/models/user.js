var q = require("q");
var db = require("../common/database.js");

var conn = db.getConnection();

function addUser(user){
	if (user) {
		var defer = q.defer();
		var query = conn.query('INSERT INTO users SET ?', user, function(err,result){
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
function updateUser(user){
	if (user) {
		var defer = q.defer();
		var query = conn.query('UPDATE users SET fullname = ?, studentcode = ?, class = ?, email = ?, phonenumber = ?, dateofbirth = ?, address = ?, studygroup = ? WHERE username=?', 
									[user.fullname, user.studentcode, user.class, user.email, user.phonenumber, user.dateofbirth, user.address, user.studygroup, user.username], function(err,result){
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
		var query = conn.query('DELETE FROM users WHERE username= ?',[username], function(err,result)
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
		var query = conn.query('SELECT * FROM users WHERE ?',{username: username}, function(err,result)
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

function checkUsername(username){
	var query = conn.query('SELECT * FROM users WHERE ?',{username: username}, function(err,result)
	{
		if (err) {
			return err;
		}else{
			return result;
		}
	});
	return query;
}
function getUserByStudentcode(studentcode){
	if (studentcode) {
		var defer = q.defer();
		var query = conn.query('SELECT * FROM users WHERE studentcode= ?',[studentcode], function(err,result)
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
function getUserByEmail(email){
	if (email) {
		var defer = q.defer();
		var query = conn.query('SELECT * FROM users WHERE ?',{email: email}, function(err,result)
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
	var query = conn.query('SELECT * FROM users', function(err,users)
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
	updateUser: updateUser,
	deleteUser: deleteUser,
	getUserByUsername : getUserByUsername,
	checkUsername: checkUsername,
	getUserByStudentcode: getUserByStudentcode,
	getUserByEmail: getUserByEmail,
	getAllUser: getAllUser
}