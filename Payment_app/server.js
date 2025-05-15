const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('static'));

function valid_nm (nm) {

	let nm_reg = /[a-zA-Z]{3,}/g;
	
	let ary1 = nm.match(nm_reg);
	console.log(ary1);

	if (ary1 == null)
	{
	console.log("Name is invalid " + nm);
	return 4;

//	return res.status(400).send("Name is invalid " + nm);
	}
	else {
	console.log("Valid Name " + nm);
	}
	
	return 0;

};

function valid_cc_no (cc_no, exp_dt, cvv,amt) {

	let cvv_reg = /(\b\d{3,4}\b)/g;
	let cc_reg = /(\b\d{4}-\d{4}-\d{4}-\d{4}\b)/g;

	let exp_dt_reg = /(\b\d{2}\/\d{4}\b)/g;
	let amt_dec_reg = /(^\s*\d{1,}\.\d{1,4}\b)/g;
	let amt_reg = /(^\s*\d{1,10}\b)/g;


	let ary1 = cvv.match(cvv_reg);
	
	console.log(ary1);
	if (ary1 == null)
	{
		console.log("Invalid cvv No " + cvv);
		return 1;
	}
	else if ((ary1 !== null) && (ary1.length > 1)) {
		console.log("Invalid cvv No - " + cvv);
		return 1;
	}
	else {
		console.log("cvv No is valid - " + cvv);
	}

	let ary2 = cc_no.match(cc_reg);

	console.log(ary2);

	if (ary2 == null)
	{
		console.log("Invalid cc No " + cc_no);
		return 2;
	}
	else {
		console.log("cc no is valid - " + cc_no);
	}


	let ary3 = exp_dt.match(exp_dt_reg);
	let ary4 = exp_dt.split('/');

	console.log(ary3);
	console.log(ary4);

	if (ary3 == null)
	{
		console.log("Invalid cc No " + exp_dt);
		return 3;
	}
	else if ((ary4[0] < 2 && ary4[1] == 2023) || (ary4[0] <= 12 && ary4[1] > 2023)) {
		console.log("cc no is valid - " + exp_dt);

	} else {
		console.log("cc no is Not valid - " + exp_dt);
		return 3;
	}
	
	let ary5 = amt.match(amt_dec_reg);
	let ary6 = amt.match(amt_reg);

	console.log(ary5);
	console.log(ary6);

	if ((ary5 == null || (ary5.length !== null && ary5.length !== 2)) && (ary6 == null))
	{
		console.log("Invalid amount " + amt);
		return 4;
		
	} else {
		console.log("Amount is valid " + amt);
	}
	
	return 0;

};

app.get('/', (req, res) => {
  
  // Sending our index.html file as 
  // response. In path.join() method
  // __dirname is the directory where
  // our app.js file is present. In 
  // this case __dirname is the root
  // folder of the project.
//  res.sendFile(path.join(__dirname, 'public/test1.html'));
//  res.sendFile('/Users/raraghup/Desktop/All_Folders/Personal/Neha_C/Web_development/webprj3/Homework3/templates/form.html');
	res.sendFile('templates/form.html', { root: '.' });
});

// use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
//    const { username, email, password } = req.body;
//	const { sfname, slname, rfname, rlname } = req.body;
	const { fname, lname, rfname, rlname, remail,phonenum,emailnotify, smsnotify, msg,cnum, exp, ccv, amt, tc } = req.body;

    console.log ("email notify -- " + emailnotify);
    console.log ("sms notify -- " + smsnotify);
    console.log ("message -- " + msg);

    
    let msg_reg = /[\s\w]{10,}/g;
    
	let arym = msg.match(msg_reg);
	console.log(arym);

	if (arym == null)
	{
	console.log("Message should be atleast 10 characters long " + msg);
    return res.status(400).send("Message should be atleast 10 characters long");

//	return res.status(400).send("Name is invalid " + nm);
	}
	else {
	console.log("Valid message " + msg);
	}
	
	
    if (!phonenum && smsnotify == 'smsnotify' ) {
    	return res.status(400).send("Phone number is required " + smsnotify);

    }
    
    if (!remail && emailnotify == 'emailnotify') {
    	return res.status(400).send("Email is required " + emailnotify);

    }
    
    if (!tc ) {
    	return res.status(400).send("Terms and Conditions need to be checked ");

    }

/*--
   const previewImage = e => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
         const preview = document.getElementById('preview');
         preview.src = reader.result;
      };
   };
--*/
//  console.log("name and email are " + username + email);
//    res.send(sfname);
//  res.send(email);

let rtn_cd = 0;
rtn_cd = valid_nm (fname);

if (rtn_cd > 0) {
    return res.status(400).send("Name is invalid " + fname);
};

rtn_cd = valid_nm (lname);

if (rtn_cd > 0) {
    return res.status(400).send("Name is invalid " + lname);
};

rtn_cd = valid_nm (rfname);

if (rtn_cd > 0) {
    return res.status(400).send("Name is invalid " + rfname);
};

rtn_cd = valid_nm (rlname);

if (rtn_cd > 0) {
    return res.status(400).send("Name is invalid " + rlname);
};


rtn_cd = valid_cc_no (cnum,exp,ccv,amt);

if (rtn_cd == 1) {
	return res.status(400).send("ccv invalid " + ccv);
}
else if (rtn_cd == 2) {
	return res.status(400).send("credit card number invalid " + cnum);
}
else if (rtn_cd == 3) {
	return res.status(400).send("Expiration date number invalid " + exp);
}
else if (rtn_cd == 4) {
	return res.status(400).send("Amount is invalid " + amt);
}


//if ((rfname == 'Stu' && rlname == 'Dent') || (rfname == 'Stuart' && rlname == 'Dent')) {
if ((rfname.toUpperCase() == 'STU' && rlname.toUpperCase() == 'DENT') || (rfname.toUpperCase() == 'STUART' && rlname.toUpperCase() == 'DENT')) {
	return res.sendFile('templates/error.html', { root: '.' });
}
else {
	return res.sendFile('templates/sucess.html', { root: '.' });
}

  // send a response
//  res.send('Form123 submitted successfully');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

