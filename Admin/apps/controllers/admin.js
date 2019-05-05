var express = require("express");
var router = express.Router();
var admin_md = require("../models/admin");
var user_md = require("../models/user");
var register_md = require("../models/register");
var fmd_md = require("../models/formatdate")
var helper = require("../helpers/helper");

router.get("/", function(req,res){
	res.render("admin/home.ejs", {data: {error: false}});
});

router.get("/signin", function(req,res){
	res.render("signin.ejs", {data: {}});
});

router.post("/signin", function(req,res){
	var ad = req.body;
	if (ad.username.trim().length == 0) {
		res.render("signin.ejs", {data: {error: "Username không được để trống"}});
	}else if (ad.password.trim().length == 0) {
			res.render("signin.ejs", {data: {error: "Mật khẩu không được để trống"}});
	}else{
		var result = admin_md.getAdminByUsername(ad.username);
		result.then(function(admins){
			var admin = admins[0];
			var status = helper.compare_password(ad.password, admin.password);
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
});

router.get("/censorship", function(req,res){
	var data = register_md.getAllUser();
	data.then(function(users){
		var data = {
			users: users,
			error: false
		};
		res.render("admin/censorship.ejs", {data: data});
	}).catch(function(err){
			res.render("admin/censorship.ejs", {data: {error: "Không có dữ liệu"}});
	});	
});

router.get("/censorship/accept/:username", function(req,res){
	var params = req.params;
	var data1 = register_md.getUserByUsername(params.username);
	data1.then(function(users){
		var user = users[0];
		var now = new Date();
		user.createdate = now;

		var data2 = user_md.addUser(user);
		data2.then(function(data){
			var data3 = register_md.deleteUser(user.username);
			data3.then(function(result){
				res.redirect("/admin/censorship");
			}).catch(function(err){
				res.render("admin/censorship.ejs", {data: {error: "Không thể xóa dữ liệu đăng ký"}});
			});
		}).catch(function(err){
			res.render("admin/censorship.ejs", {data: {error: "Không thể thêm thành viên."}});
		});
	}).catch(function(err){
		res.render("admin/censorship.ejs", {data: {error: "Không thể tìm bản đăng ký này."}});
	});
});

router.get("/censorship/cancel/:username", function(req,res){
	var params = req.params;
	var data = register_md.deleteUser(params.username);
	data.then(function(result){
		res.redirect("/admin/censorship");
	}).catch(function(err){
		res.render("admin/censorship.ejs", {data: {error: "Không thể xóa đăng ký này."}});
	});
});

router.get("/member", function(req,res){
	var data = user_md.getAllUser();
	data.then(function(users){
		var data = {
			users: users,
			error: false
		};
		res.render("admin/member.ejs", {data: data});
	}).catch(function(err){
			res.render("admin/member.ejs", {data: {error: "Không có dữ liệu"}});
	});	
	
});

router.get("/member/add", function(req,res){
	res.render("admin/user/add.ejs", {data: {}});
});

router.post("/member/add", function(req,res){
	var user = req.body;
	if (user.username.trim().length == 0) {
		res.render("admin/user/add.ejs", {data: {error: "Username không được để trống !"}});
	}else if (user.username.trim().length >=50 || user.username.trim().length <5) {
		res.render("admin/user/add.ejs", {data: {error: "Chỉ được nhập username từ 5-50 ký tự !"}});
	}else{
	var result = user_md.getUserByUsername(user.username);
	result.then(function(regis){
		var reg = regis[0];
		//console.log(reg.fullname);
		res.render("admin/user/add.ejs", {data: {error: reg.username+" đã tồn tại"}});
	}).catch(function(err){
		var reg_email =/^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
		var reg_stdcode =/^(1)(\d{10})$/;
		var reg_phonenb = /^(84|0)(\d{9})$/;
	    if (user.password.trim().length == 0) {
			res.render("admin/user/add.ejs", {data: {error: "Mật khẩu không được để trống !"}});
		}else if(user.password.length<6 || user.password.length >30){
			res.render("admin/user/add.ejs", {data: {error: "Password phải có độ dài từ 6-30 ký tự !"}});
		}else if (user.repassword.trim().length == 0) {
			res.render("admin/user/add.ejs", {data: {error: "Bạn chưa nhập lại mật khẩu !"}});
		}else if (user.password != user.repassword) {
			res.render("admin/user/add.ejs", {data: {error: "Mật khẩu không khớp. Bạn nhập lại !"}});
		}else if (user.fullname.trim().length == 0) {
			res.render("admin/user/add.ejs", {data: {error: "Họ tên không được để trống !"}});
		}else if(user.fullname.length >=40){
			res.render("admin/user/add.ejs", {data: {error: "Chỉ được nhập dưới 40 ký tự !"}});
		}else if (user.studentcode.trim().length == 0) {
			res.render("admin/user/add.ejs", {data: {error: "Mã sinh viên không được để trống !"}});
		}else if (user.studentcode.trim().length > 12) {
			res.render("admin/user/add.ejs", {data: {error: "Không được nhập mã sinh viên quá 12 ký tự !"}});
		}else if (reg_stdcode.test(user.studentcode) == false) {
			res.render("admin/user/add.ejs", {data: {error: "Mã sinh viên không hợp lệ, chỉ được nhập mã SV Uneti !"}});
		}else{
		var result = user_md.getUserByStudentcode(user.studentcode);
		result.then(function(regis){
			var reg = regis[0];
			res.render("admin/user/add.ejs", {data: {error: reg.studentcode+" đã tồn tại"}});
		}).catch(function(err){
			if (user.class.trim().length == 0) {
				res.render("admin/user/add.ejs", {data: {error: "Bạn đang học lớp nào ?"}});
			}else if (user.class.trim().length >= 20) {
				res.render("admin/user/add.ejs", {data: {error: "Chỉ được nhập lớp dưới 20 ký tự !"}});
			}else if (user.email.trim().length == 0) {
				res.render("admin/user/add.ejs", {data: {error: "Email không được để trống !"}});
			}else if (user.email.trim().length >= 50) {
				res.render("admin/user/add.ejs", {data: {error: "Email quá dài. Được nhập email dưới 50 ký tự !"}});
			}else if(reg_email.test(user.email) == false){
				res.render("admin/user/add.ejs", {data: {error: "Email không hợp lệ !"}});	
			}else{
			var result = user_md.getUserByEmail(user.email);
			result.then(function(regis){
				var reg = regis[0];
				res.render("admin/user/add.ejs", {data: {error: reg.email+" đã tồn tại"}});
			}).catch(function(err){
		    	if (user.phonenumber.trim().length == 0) {
					res.render("admin/user/add.ejs", {data: {error: "Số điện thoại không được để trống !"}});
				}else if (user.phonenumber.trim().length >= 15) {
					res.render("admin/user/add.ejs", {data: {error: "Chỉ được nhập số điện thoại dưới 15 ký tự !"}});
				}else if(reg_phonenb.test(user.phonenumber) == false){
					res.render("admin/user/add.ejs", {data: {error: "Số điện thoại không hợp lệ !"}});	
				}else if (user.dateofbirth.trim().length == 0) {
					res.render("admin/user/add.ejs", {data: {error: "Ngày sinh không được để trống !"}});
				}else if (user.address.trim().length == 0) {
					res.render("admin/user/add.ejs", {data: {error: "Bạn hãy nhập địa chỉ !"}});
				}else if (user.address.trim().length >= 60) {
					res.render("admin/user/add.ejs", {data: {error: "Chỉ được nhập địa chỉ dưới 60 ký tự !"}});
				}else if (user.studygroup == 0) {
					res.render("admin/user/add.ejs", {data: {error: "Bạn hãy chọn một nhóm muốn tham gia!"}});
				}else{
				var passwordhs = helper.hash_password(user.password.trim());
				var now = new Date();
				user.createdate = now;
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
				var result = user_md.addUser(user);

				result.then(function(data){
					res.redirect("/admin/member");
				}).catch(function(err){
					res.render("admin/user/add.ejs", {data: {error: "Khong the them du lieu vao data"}});
				});
				}
			});
			}
		});	
		}
	});	
	}	
});


router.get("/member/edit/:username", function(req,res){
	var params = req.params;
	var result = user_md.getUserByUsername(params.username);
	result.then(function(users){
		var user = users[0];
		var date = fmd_md.fmdateymd(user.dateofbirth);
		var data = {
			user: user,
			date: date,
			error: false
		};
		res.render("admin/user/edit.ejs", {data: data});
	}).catch(function(err){
		res.render("admin/user/edit.ejs", {data: {error: "Khong the lay du lieu tu data"}});
	});
});

router.post("/member/edit", function(req,res){
	var user = req.body;
	
	var reg_email =/^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
	var reg_stdcode =/^(1)(\d{10})$/;
	var reg_phonenb = /^(84|0)(\d{9})$/;
    if (user.fullname.trim().length == 0) {
		res.render("admin/user/edit.ejs", {data: {error: "Họ tên không được để trống !"}});
	}else if(user.fullname.length >=40){
		res.render("admin/user/edit.ejs", {data: {error: "Chỉ được nhập dưới 40 ký tự !"}});
	}else if (user.studentcode.trim().length == 0) {
		res.render("admin/user/edit.ejs", {data: {error: "Mã sinh viên không được để trống !"}});
	}else if (user.studentcode.trim().length > 12) {
		res.render("admin/user/edit.ejs", {data: {error: "Không được nhập mã sinh viên quá 12 ký tự !"}});
	}else if (reg_stdcode.test(user.studentcode) == false) {
		res.render("admin/user/edit.ejs", {data: {error: "Mã sinh viên không hợp lệ, chỉ được nhập mã SV Uneti !"}});
	}else{
	var result = user_md.getUserByStudentcode(user.studentcode);
	result.then(function(regis){
		var reg = regis[0];
		res.render("admin/user/edit.ejs", {data: {error: reg.studentcode+" đã tồn tại"}});
	}).catch(function(err){
		if (user.class.trim().length == 0) {
			res.render("admin/user/edit.ejs", {data: {error: "Bạn đang học lớp nào ?"}});
		}else if (user.class.trim().length >= 20) {
			res.render("admin/user/edit.ejs", {data: {error: "Chỉ được nhập lớp dưới 20 ký tự !"}});
		}else if (user.email.trim().length == 0) {
			res.render("admin/user/edit.ejs", {data: {error: "Email không được để trống !"}});
		}else if (user.email.trim().length >= 50) {
			res.render("admin/user/edit.ejs", {data: {error: "Email quá dài. Được nhập email dưới 50 ký tự !"}});
		}else if(reg_email.test(user.email) == false){
			res.render("admin/user/edit.ejs", {data: {error: "Email không hợp lệ !"}});	
		}else{
		var result = user_md.getUserByEmail(user.email);
		result.then(function(regis){
			var reg = regis[0];
			res.render("admin/user/edit.ejs", {data: {error: reg.email+" đã tồn tại"}});
		}).catch(function(err){
	    	if (user.phonenumber.trim().length == 0) {
				res.render("admin/user/edit.ejs", {data: {error: "Số điện thoại không được để trống !"}});
			}else if (user.phonenumber.trim().length >= 15) {
				res.render("admin/user/edit.ejs", {data: {error: "Chỉ được nhập số điện thoại dưới 15 ký tự !"}});
			}else if(reg_phonenb.test(user.phonenumber) == false){
				res.render("admin/user/edit.ejs", {data: {error: "Số điện thoại không hợp lệ !"}});	
			}else if (user.dateofbirth.trim().length == 0) {
				res.render("admin/user/edit.ejs", {data: {error: "Ngày sinh không được để trống !"}});
			}else if (user.address.trim().length == 0) {
				res.render("admin/user/edit.ejs", {data: {error: "Bạn hãy nhập địa chỉ !"}});
			}else if (user.address.trim().length >= 60) {
				res.render("admin/user/edit.ejs", {data: {error: "Chỉ được nhập địa chỉ dưới 60 ký tự !"}});
			}else if (user.studygroup == 0) {
				res.render("admin/user/edit.ejs", {data: {error: "Bạn hãy chọn một nhóm muốn tham gia!"}});
			}else{
			var passwordhs = helper.hash_password(user.password.trim());
			var now = new Date();
			user.createdate = now;
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
			var result = user_md.addUser(user);

			result.then(function(data){
				res.redirect("/admin/member");
			}).catch(function(err){
				res.render("admin/user/edit.ejs", {data: {error: "Khong the them du lieu vao data"}});
			});
			}
		});	
		}
	});	
	}
});
router.get("/member/delete/:username", function(req,res){
	var params = req.params;
	var data = user_md.deleteUser(params.username);
	data.then(function(result){
		res.redirect("/admin/member");
	}).catch(function(err){
		res.render("admin/user/edit.ejs", {data: {error: "Khong the cap nhat du lieu vao data"}});
	});
});


module.exports = router;
