// Url Share
// shareButtonApiCount = async () =>{
//     const currentUlr = window.location.href;
//     console.log("currentUtl", currentUlr);
//     const [label, value] = currentUlr.split('=')
//     console.log("after split value =", value)
//     console.log("after split label =", label)
//     var formdata = new FormData();
//     formdata.append('id', value);
//   var requestOptions = {
//     method: 'POST',
//     body:formdata,
//     redirect: 'follow'
//   }
  
//   fetch("https://api.vossle.com/ARexperience/share_count", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log("sharebutton",result))
//     .catch(error => console.log('error', error));
//   }

  // share button code
//   var linkshare = document.getElementById("url_share");
//   console.log("linksshare",linkshare);
//   linkshare.addEventListener('click', function() 
//     { 
//       // shareButtonApiCount();
//       share();
//       console.log("running")
//     });
  
//   function share()
//   {
//     if (navigator.share) { 
//       navigator.share({
//         title: 'Share this link to :',
//         url: window.location.href
//       }).then(() => {
//         console.log('Thanks for sharing!');
//       })
//       .catch(console.error);
//       } else {
//       shareDialog.classList.add('is-open');
//      }
//   }
  
  
  // display model script
  // Get the Model
  var Model = document.getElementById("myModel");
  // Get the button that opens the Model
  var btn_help = document.getElementById("help-btn");
  
  // Get the <span> element that closes the Model
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on the button, open the Model
  // help button
  btn_help.onclick = function() {
      Model.style.display = "block";
    }
  // When the user clicks on <span> (x), close the Model
  span.onclick = function() {
    Model.style.display = "none";
  }
  // When the user clicks anywhere outside of the Model, close it
  // window.onclick = function(event) {
  //   if (event.target == Model) {
  //     Model.style.display = "none";
  //   }
  // }
  
  // --------------------------------------
  

  // ********************************************* screen shot *************************
  // document.getElementById("photo-button").addEventListener("click", function() {
  //   function resizeCanvas(origCanvas, width, height) {
  //   var canvas = document.createElement('canvas');
  //   let resizedContext = canvas.getContext("2d");

  //   // if (screen.width < screen.height)
  //   // {
  //   //     var w = height * (height / width);
  //   //     var h = width * (height / width);
  //   //     var offsetX = -(height - width);
  //   // }
  //   // else
  //   // {
  //   //     var w = width;
  //   //     var h = height;
  //   //     var offsetX = 0;
  //   // }

  //   canvas.height = height;
  //   Canvas.width = width;

  //    resizedContext.lineWidth = 10;
  //   resizedContext.strokeStyle="white";
  //   resizedContext.strokeRect(0, 0, resizedCanvas.width,resizedCanvas.height);

  //   var dataURL = canvas.toDataURL();
  //   console.log(dataURL);
  //   var img = document.createElement('img')
  //   img.setAttribute('src', 'dataURL')
  //   console.log(img)
  //   }
  //   resizeCanvas()
  //     })
      
    // end of resizeCanvas function
  
    //**************************************** camera flip *****************************************************
  //   // flip front and back camera on click
  // var front = false;
  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
  // document.getElementById('flip-button').onclick = async function() {
  //     await sleep(4000);
  //     { front = !front; };
  //     var constraints = { video: { facingMode: (front? "user" : "environment") } };
  //     // await sleep(2000); 
  //     navigator.mediaDevices.getUserMedia(constraints)
  //     .then(async function(stream) {
  //       // await sleep(2000);
  //       var video = document.querySelector('video');
  //       alert("helllo")
  //       console.log(video)
  //       // await sleep(2000);
  //       // Older browsers may not have srcObject
  //       if ("srcObject" in video) {
  //         video.srcObject = stream;
  //       } else {
  //         // Avoid using this in new browsers, as it is going away.
  //         video.src =  window.URL.createObjectURL(stream);
  //       }
  //       video.onloadedmetadata = function(e) {
  //         video.play();
  //       };
  //     })
  //     .catch(function(err) {
  //       console.log(err.name + ": " + err.message);
  //     });
  // };



    