function fmdateymd(dateofbirth){
	var dob = new Date(dateofbirth);
	if (dob.getMonth() >= 10) { 
    // Nếu tháng >= tháng 10
       if (dob.getDate() >= 10) { 
       // Nếu ngày >= ngày 10
        var date    = dob.getFullYear()+ '-' +(dob.getMonth()+1) + '-' + dob.getDate();   
       }
       else{ 
       // Nếu ngày < ngày 10 thì sẽ là 09, 08, 07,...
        var date    = dob.getFullYear()+ '-' +(dob.getMonth()+1) + '-0' + dob.getDate();
       }
    }
    else{ 
    // Nếu tháng < tháng 10
          if (dob.getDate() >= 10) { 
          // Nếu ngày >= ngày 10
             var date   = dob.getFullYear()+ '-0' +(dob.getMonth()+1) + '-' + dob.getDate();  
          }
          else{ 
          // Nếu ngày < ngày 10 thì sẽ là 09, 08, 07,...
            var date = dob.getFullYear()+ '-0' +(dob.getMonth()+1) + '-0' + dob.getDate();
          }
    }
    return date;
}
module.exports = {
	fmdateymd: fmdateymd
}