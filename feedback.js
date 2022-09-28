
var thisForm = document.getElementById('FeedbackForm');
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var main_url = window.location.href;
var nameregEx = /^[a-zA-Z\s]+$/;
console.log("main_url", main_url);
var split_url_id = main_url.split("=");
// var id = split_url_id[1];
// console.log('exp_id',exp_id);
var id_exp
setTimeout(() => {
  id_exp = localStorage.getItem("exp_id");
}, 10000);
// clear form data in close buttom
  const clearDataOnCloseBtn = document.getElementById('closebtn')
  clearDataOnCloseBtn.addEventListener('click', function(){
    document.getElementById('error-msg').style.display = 'none'
    document.getElementById('id01').style.display='none'
  })
  const showDataOnSubmitBtn = document.getElementById('submitbtn')
  showDataOnSubmitBtn.addEventListener('click', function(){
    document.getElementById('error-msg').style.display = 'block'
  })

// console.log("id from url", id);
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
   const id  = id_exp
   const name = document.getElementById('recipient-name').value;
   const email = document.getElementById('recipient-email').value;
   const contact = document.getElementById('recipient-contact').value;
   const message = document.getElementById('message-text').value;
   console.log(name, email, contact, message, id)
  //  if (name==null || name=="", email==null || email=="", contact==null || contact=="", message==null || message=="") 
  //  {
  //   document.getElementById('error-msg').innerText='All Required Field';
  //   // return false;
  //  }
   if (name.length > 20 || (!nameregEx.test(name)) ){
    document.getElementById('error-msg').innerText='Only alphabets are allowed upto 20 characters in name field'; 
    return false; 
  }
  
  else if (reg.test(email) == false){
    document.getElementById('error-msg').innerText='Invalid Email Address'; 
    return false;
  }
  else if (!/^\d{10}$/.test(contact)){
    document.getElementById('error-msg').innerText='Invalid Mobile Number '; 
    return false;
  }
  else if (message.length>150 || message.length<10){
    document.getElementById('error-msg').innerText='Min 10 and max 100 characters are allowed in message field'; 
    return false;
  }

  else
  {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "AWSALB=J3yOx6mG5ssYbC5LgAAXq8y2IjrJkO1lRhXF+fOaO0zvsq01HZj/tewOuMAMNwS/mRQg09dY6tTc7zV+GlePTQHHWA5OLPSJWOoKUK0Ct/ebsGIHNy6NOrVCz66b; AWSALBCORS=J3yOx6mG5ssYbC5LgAAXq8y2IjrJkO1lRhXF+fOaO0zvsq01HZj/tewOuMAMNwS/mRQg09dY6tTc7zV+GlePTQHHWA5OLPSJWOoKUK0Ct/ebsGIHNy6NOrVCz66b");

   var formdata = new FormData();
    formdata.append("ar_id", id);
    formdata.append("name", name);    
    formdata.append("email", email); 
    formdata.append("mobile", contact);  
    formdata.append("feedback", message);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
   let response = await fetch("https://apiv2.morkshub.xyz/public/api/feedback", requestOptions)
   const result = await response.json();
    console.log(result)
    console.log(response.status)
  
      if (response.status == "200")
      {
       thisForm.reset();
       document.getElementById('error-msg').setAttribute('style', 'color:green !important');
       document.getElementById('error-msg').innerText="Thanks for filling out our form!";
       if(document.getElementById('error-msg').innerText=="Thanks for filling out our form!")
       {
          setTimeout(() => {
            document.getElementById('closebtn').click()
            document.getElementById('error-msg').innerText=" "
            document.getElementById('error-msg').removeAttribute('style', 'color:green !important')
          }, 2000);
       }
      }
  } 
   }) 