var express = require("express");
var router = express.Router();
var user_md = require("../models/user");
var register_md = require("../models/register");
var fmd_md = require("../models/formatdate")
var helper = require("../helpers/helper");

router.use("/admin", require(__dirname + "/admin.js"));


router.get("/", function(req,res){
	res.render("home.ejs");
});
router.get("/signup", function(req,res){
	res.render("signup.ejs", {data: {}});
});

router.post("/signup", function(req,res){
	var user = req.body;
	var reg_email =/^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
	var reg_stdcode =/^(1)(\d{10})$/;
	var reg_phonenb = /^(84|0)(\d{9})$/;
	if (user.username.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Username không được để trống !"}});
	}else if (user.username.trim().length >=50) {
		res.render("signup.ejs", {data: {error: "Không được nhập username quá 50 ký tự !"}});
	}else //if (user.username.trim().length > 0) {
		//res.render("signup.ejs", {data: {error: "Username đã tồn tại !"}});
	//}else 
	if (user.password.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Mật khẩu không được để trống !"}});
	}else if(user.password.length<6 || user.password.length >30){
		res.render("signup.ejs", {data: {error: "Password phải có độ dài từ 6-30 ký tự !"}});
	}else if (user.repassword.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Bạn chưa nhập lại mật khẩu !"}});
	}else if (user.password != user.repassword) {
		res.render("signup.ejs", {data: {error: "Mật khẩu không khớp. Bạn nhập lại !"}});
	}else if (user.fullname.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Họ tên không được để trống !"}});
	}else if(user.fullname.length >=40){
		res.render("signup.ejs", {data: {error: "Chỉ được nhập dưới 40 ký tự !"}});
	}else if (user.studentcode.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Mã sinh viên không được để trống !"}});
	}else if (user.studentcode.trim().length > 12) {
		res.render("signup.ejs", {data: {error: "Không được nhập mã sinh viên quá 12 ký tự !"}});
	}else if (reg_stdcode.test(user.studentcode) == false) {
		res.render("signup.ejs", {data: {error: "Mã sinh viên không hợp lệ, chỉ được nhập mã SV Uneti !"}});
	}else //if (user.studentcode.trim().length > 0) {
		//res.render("signup.ejs", {data: {error: "Mã sinh viên đã tồn tại !"}});
	//}else 
	if (user.class.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Bạn đang học lớp nào ?"}});
	}else if (user.class.trim().length >= 20) {
		res.render("signup.ejs", {data: {error: "Chỉ được nhập lớp dưới 20 ký tự !"}});
	}else if (user.email.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Email không được để trống !"}});
	}else if (user.email.trim().length >= 50) {
		res.render("signup.ejs", {data: {error: "Email quá dài. Được nhập email dưới 50 ký tự !"}});
	}else if(reg_email.test(user.email) == false){
		res.render("signup.ejs", {data: {error: "Email không hợp lệ !"}});	
	}else //if (user.email.trim().length > 0) {
		//res.render("signup.ejs", {data: {error: "Email đã tồn tại !"}});
	//}else
	if (user.phonenumber.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Số điện thoại không được để trống !"}});
	}else if (user.phonenumber.trim().length >= 15) {
		res.render("signup.ejs", {data: {error: "Chỉ được nhập số điện thoại dưới 15 ký tự !"}});
	}else if(reg_phonenb.test(user.phonenumber) == false){
		res.render("signup.ejs", {data: {error: "Số điện thoại không hợp lệ !"}});	
	}else if (user.dateofbirth.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Ngày sinh không được để trống !"}});
	}else if (user.address.trim().length == 0) {
		res.render("signup.ejs", {data: {error: "Bạn hãy nhập địa chỉ !"}});
	}else if (user.address.trim().length >= 60) {
		res.render("signup.ejs", {data: {error: "Chỉ được nhập địa chỉ dưới 60 ký tự !"}});
	}else if (user.studygroup == 0) {
		res.render("signup.ejs", {data: {error: "Bạn hãy chọn một nhóm muốn tham gia!"}});
	}else{
	var passwordhs = helper.hash_password(user.password);
	var now = new Date();
	user.createdate = now;
	//var d = new Date();
	//var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+ d.getSeconds();
	//insert to db
	user = {
		username: user.username.trim(),
		password: passwordhs.trim(),
		fullname: user.fullname.trim().toUpperCase(),
		studentcode: user.studentcode.trim(),
		class: user.class.trim().toUpperCase(),
		email: user.email.trim(),
		phonenumber: user.phonenumber.trim(),
		dateofbirth: user.dateofbirth,
		address: user.address.trim(),
		studygroup: user.studygroup,
		createdate: user.createdate
	};
	var result = register_md.addUser(user);

	result.then(function(data){
		res.redirect("/");
	}).catch(function(err){
		res.render("signup.ejs", {data: {error: "Khong the them du lieu vao data"}});
	});
	}
});

router.get("/signin", function(req,res){
	res.render("signin.ejs", {data: {}});
});

router.post("/signin", function(req,res){
	var member = req.body;
	if (member.username.trim().length == 0) {
		res.render("signin.ejs", {data: {error: "Username không được để trống"}});
	}else if (member.password.trim().length == 0) {
			res.render("signin.ejs", {data: {error: "Mật khẩu không được để trống"}});
	}else{
		var result = user_md.getUserByUsername(member.username);
		result.then(function(users){
			var user = users[0];
			var status = helper.compare_password(member.password, user.password);
			if (status == false) {
				res.render("signin.ejs", {data: {error: "Sai mật khẩu"}});	
			} else {
				req.session.user = user;
				res.redirect("/");
			}
		}).catch(function(err){
			res.render("signin.ejs", {data: {error: "Username không tồn tại"}});
		});	
}
})

module.exports = router;
