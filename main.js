
"use strict";

let THREECAMERA = null;

//** Vipul code edit */
let faceop= 0;
var isIframe = false;
var iframeFlag;
let mixer;
const renderer = new THREE.WebGLRenderer();
let a = document.getElementById("descarga-link" ,"jpeg");
let faceobject = null;




function inIframe() {
  
  if (window.self !== window.top) {
    console.log("in iframe");

    isIframe = true;

  } else {
    console.log("not in iframe");
  }
}
inIframe();

//** edit end ****** */




//************ API call ***********
var main_url = window.location.href;
console.log("main_url", main_url);
var split_url = main_url.split("?");
var split_url = split_url[1];
function getDeviceType() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile || isIframe) {
    console.log("You are using Mobile or iframe");
    console.log(isIframe);
  } else {
    window.location.replace(`../../qrcode/index`);

    console.log("You are using Desktop");
  }
}
getDeviceType();


console.log(faceop);

// callback: launched if a face is detected or lost. mmmmm
function detect_callback(faceIndex, isDetected){
  // document.getElementById("s_loader").style.display = "none";
  var loading = document.getElementById("loading_ff");
  // document.getElementById("s_loader").style.display = "none";
  if (isDetected) {
    console.log("INFO in detect_callback(): DETECTED");
    loading.style.display = "none"
    console.log(faceop);
  } else {
    console.log("INFO in detect_callback(): LOST");
    faceop=0.0;
    loading.style.display = "block";
    // document.getElementById("s_loader").style.display = "none";
  }
}


// build the 3D. called once when Jeeliz Face Filter is OK:
function init_threeScene(spec) {
  const threeStuffs = JeelizThreeHelper.init(spec, detect_callback);
  // threeStuffs.faceObject.parent.position.set(0, 0, 0)
  // threeStuffs.faceObject.parent.scale.set(1, 1, 1)
  // improve WebGLRenderer settings:
  threeStuffs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  threeStuffs.renderer.outputEncoding = THREE.sRGBEncoding;
  console.log(threeStuffs);

  // CREATE THE GLASSES AND ADD THEM
  const r = JeelizThreeGlassesCreator({
    envMapURL: "envMap.jpg",
    frameMeshURL: "models3D/glassesFramesBranchesBent.json",
    lensesMeshURL: "models3D/glassesLenses.json",
    occluderURL: "models3D/face.json",
  });
  
  
  function faceopacity(spec,isDetected){
    // create face opacity
    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshBasicMaterial( {
    color: 0x503335,
    opacity: faceop,
    // opacity: 0.9,
    map: new THREE.TextureLoader().load('glowoption2.png'),
    depthTest: true,
    depthWrite:false,
    transparent: true,
    blending:THREE.AdditiveBlending,
    } );                 
    const mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set(1.50, 1.75, 1.25)
    mesh.name = 'facemesh'
    mesh.position.set(0, 0.1, 0.9)
    threeStuffs.faceObject.add(mesh);

    faceobject = threeStuffs.faceObject.getObjectByName( "facemesh" );
    console.log(faceop);

    console.log("hello")
    
    
   console.log(isDetected);

    if ( faceop < 0.072) {
      console.log("hello"); 

      faceop = faceop + 0.009;
      setTimeout(faceopacity, 1000);
      
  
}

         
  }

  async function apiData() {
   
   

    var gaTag;
    var blocking;
    var expGaTag;
    var expName = "vinni-face";
    var exp_type = "facedetection";
    var detection_point ="eye";
    var web_url;
    var content;
    var above_head = false;
    
    
    var baseUrl = window.location.origin;
    var expUrl;
    var ApiAssetUrl = "https://vossle-v2.s3.ap-south-1.amazonaws.com/";
    
    console.log(exp_type);
    console.log(detection_point);
    console.log(gaTag);
    // console.log(lat);
    // console.log(long);
    console.log(blocking);
    console.log(expGaTag);
    console.log(expName);
    console.log(web_url);
    
    
    // var gaTag = "G-TWPJ604KRH";
    // **************** code for dynamic gatag *********************
    // console.log('gaTag inside try on', gaTag)
    var gaTagele = document.getElementById("gaTagTryOn");
    var exGaTagele = document.getElementById("exGaTag");
    var gaTagUrl = `https://www.googletagmanager.com/gtag/js?id=${gaTag}`;
    var exGaTagUrl = `https://www.googletagmanager.com/gtag/js?id=${expGaTag}`;
    // for users
    gaTagele.setAttribute("src", gaTagUrl);
    function gtag2() {
      dataLayer.push(arguments);
    }
    gtag2("js", new Date());
    gtag2("config", gaTag);
    //  for experience
    if (expGaTag !== null) {
      exGaTagele.setAttribute("src", exGaTagUrl);
      gtag2("config", expGaTag);
    }
    // **************** end code for dynamic gatag *********************

    // ************ code for blocking experience ***********
    // if(blocking == 'Block')
    // {
    //   document.getElementById('blockingDiv').style.display = "block"
    //   document.getElementById("markerless-loader").style.display = 'none'
    // }
    // ************end code for blocking experience ***********

    // get experience name data on html
    document.getElementById("name").innerHTML = expName;
    if (web_url == null || web_url == "") {
      web_url = "vossle.com";
    }
    // get api data on info button
    console.log("web_url", web_url);
    if (!web_url.match(/^https?:\/\//i)) {
      // info button listner
      var website = "http://" + web_url;
      console.log("website", website);
      document.getElementById("info-btn").onclick = function () {
        var windowSize =
          "width=" +
          window.innerWidth +
          ",height=" +
          window.innerHeight +
          ",scrollbars=no";
        window.open(`${website}`, "popup", windowSize);
        console.log("info button running in finction", website);
      };
    } else {
      document.getElementById("info-btn").onclick = function () {
        var windowSize =
          "width=" +
          window.innerWidth +
          ",height=" +
          window.innerHeight +
          ",scrollbars=no";
        window.open(`${website}`, "popup", windowSize);
        console.log("info button running in finction", website);
      };
    }
    //  end info buttom listner

    // get html  share button
    var linkshare = document.getElementById("url_share");
    console.log("linksshare", linkshare);
    linkshare.addEventListener("click", function () {
      shareButtonApiCount();
      share();
    });
    //end get html  share button

    function share() {
      if (navigator.share) {
        navigator
          .share({
            title: "Share this link to :",
            // url: experience.url,
            url: expUrl,
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(console.error);
      } else {
        shareDialog.classList.add("is-open");
      }
    }
    //end share function
     
    //**************** Iframe code **************/  
    if (iframeFlag) {
      console.log("iframeFlagthiselse", iframeFlag);
      document.getElementById("help-btn").style.width = "40px";
      document.getElementById("url_share").style.width = "40px";
      document.getElementById("info-btn").style.width = "40px";
      document.getElementById("info-btn").style.width = "40px";
      document.getElementById("shareFeedbackId").style.width = "40px";
      document.getElementById("name").style.top = "130px";
      document.getElementById("photo-button").style.width = "140px";
      document.getElementById("jeeFaceFilterCanvas").style.top="0%";
      document.getElementById("jeeFaceFilterCanvas").style.left="0%";
      document.getElementById("loading_ff").style.top="200px"
      document.getElementById("loading_ff").style.fontSize="20px";
      document.getElementById("turn").style.display = "none";
      document.getElementById("greyScreen").style.display = "none";
      document.getElementById("landscape_hide").style.display = "block";
    }

    //******************** Iframe Code end ***************/
    
 
  
    var bg = document.getElementById("bgaudio");
    bg.loop=true
    bg.play()


  
    // ********************* eye detection point **********************************
    // if (
    //   experience.exp_type.exp_type == "face_detection" &&
    //   experience.detection_point == "eye"
    // ) {
    if (exp_type == "facedetection" && detection_point == "eye") {

     faceopacity();
     
     console.log(faceop);
     
      var loader = new THREE.GLTFLoader();
      console.log("inside the glb loader", 'flower.glb');
      loader.load(
        'flower.glb',
        function (gltf) {
          if (gltf) {
           
            // setTimeout(() => {
            //   document.getElementById('shareFeedbackId').click();
            // }, 6000);
          } else {
            
          }
          gltf.scene.scale.set(0.18, 0.17, 0.17);
          //eye-5
          // gltf.scene.scale.set(5, 5, 5)
          // gltf.scene.position.set(0, 0.5, 0.6)
          // eye position
          // gltf.scene.position.set(0, 0, 0)
          // head postion
          // gltf.scene.position.set(0, 0.9, 0)
          // gltf.scene.rotation.set(0, 0, 0)
          threeStuffs.faceObject.add(gltf.scene);
         //vipul edit 
         const model = gltf.scene;
         mixer = new THREE.AnimationMixer(model);
         console.log(model);
         const clips = gltf.animations;
        
          
    // Play all animations at the same time
    clips.forEach(function(clip) {
      const action = mixer.clipAction(clip);
      action.play();
        });
        },
        undefined,
        function (e) {
          console.error(e);
        }
      );
      
    } //end of if statement
    // ********************* end eye detection point **********************************

    // ********************* head detection point *************************************
    else if (exp_type == "facedetection" && detection_point == "head") {
      var loader = new THREE.GLTFLoader();
      
     

      console.log("inside the glb loader",modelfile);
      loader.load(
      'flower.glb',
        function (gltf) {
          if (gltf) {
            // document.getElementById("s_loader").style.display = "none";
            // setTimeout(() => {
            //   document.getElementById('shareFeedbackId').click();
            // }, 6000);
          } else {
            // document.getElementById("s_loader").style.display = "block";
          }
           if (above_head) {
            gltf.scene.scale.multiplyScalar(0.18);
            // gltf.scene.scale.set(0.14, 0.14, 0.11);
            gltf.scene.position.set(0, -1.1, 0);
            // gltf.scene.rotation.set(-0.1, 0, 0)
          }
          
          threeStuffs.faceObject.add(gltf.scene);
          const model = gltf.scene;
          mixer = new THREE.AnimationMixer(model);
          console.log(model);
          const clips = gltf.animations;
          // Play all animations at the same time
          clips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
          });
        
        },
        undefined,
        function (e) {
          console.error(e);
        }
      );
    } //end of if statement
    // ********************* head detection point **********************************
    // ********************* ear detection point **********************************
    else if (exp_type == "facedetection" && detection_point == "ear") {
      // alert('detection_point ' +detection_point)
      var loader = new THREE.GLTFLoader();
      // alert("inside the glb loader" + content)
      loader.load(
        content,
        function (gltf) {
          if (gltf) {
            document.getElementById("s_loader").style.display = "none";
          } else {
            document.getElementById("s_loader").style.display = "block";
          }
          // swipe method *****************************
          var increasesize = 0.13;
          document
            .getElementById("jeeFaceFilterCanvas")
            .addEventListener("touchstart", startTouch, { once: false });
          document
            .getElementById("jeeFaceFilterCanvas")
            .addEventListener("touchmove", moveTouch, { once: false });
          // Swipe Up / Down / Left / Right
          var xDown = null;
          var yDown = null;

          function getTouches(evt) {
            return (
              evt.touches || // browser API
              evt.originalEvent.touches
            ); // jQuery
          }

          function startTouch(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
          }

          function moveTouch(evt) {
            if (!xDown || !yDown) {
              return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
              /*most significant*/
              // if ( xDiff > 0 ) {
              //     /* right swipe */
              //     console.log('right swipe')
              // } else {
              //     /* left swipe */
              //     console.log('left swipe')
              // }
            } else {
              if (yDiff > 0) {
                /* up swipe */
                increasesize = increasesize + 0.01;
                gltf.scene.scale.set(increasesize, increasesize, increasesize);
                console.log("up swipe", increasesize);
              } else {
                /* down swipe */
                increasesize = increasesize - 0.01;
                gltf.scene.scale.set(increasesize, increasesize, increasesize);
                console.log("down swipe", increasesize);
              }
            }
            /* reset values */
            xDown = null;
            yDown = null;
          }
          // swipe method end ***************************
          gltf.scene.scale.multiplyScalar(0.13);
          // gltf.scene.scale.set(0.14, 0.13, 0.13)
          threeStuffs.faceObject.add(gltf.scene);
        },
        undefined,
        function (e) {
          console.error(e);
        }
      );
    } //end of if statement
    // ********************* end ear detection point **********************************
  













    // ********************* neck detection point *************************************
    else if (exp_type == "facedetection" && detection_point == "neck") {
      var loader = new THREE.GLTFLoader();
      console.log("inside the glb loader", content);
      loader.load(
        content,
        function (gltf) {
          if (gltf) {
            document.getElementById("s_loader").style.display = "none";
          } else {
            document.getElementById("s_loader").style.display = "block";
          }
          gltf.scene.scale.multiplyScalar(0.95);
          //gltf.scene.scale.set(1, 1, 1);
          gltf.scene.position.set(0, -1.2, -0.5);
          gltf.scene.rotation.set(0, 0, 0);
          threeStuffs.faceObject.add(gltf.scene);
        },
        undefined,
        function (e) {
          console.error(e);
        }
      );
    } //end of if statement
    // ********************* neck detection point **********************************

  


  } // end of apidata function
  apiData();
  


  // Url Share api count
  async function shareButtonApiCount() {
    const currentUlr = window.location.href;
    console.log("currentUtl", currentUlr);
    const [label, value] = currentUlr.split("=");
    console.log("after split value =", value);
    console.log("after split label =", label);
    var formdata = new FormData();
    formdata.append("id", value);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.vossle.com/ARexperience/share_count", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("sharebutton", result))
      .catch((error) => console.log("error", error));
  }


  // end of Url Share api count

  // screen shot

  function saveAsImage(a) {
    var ssResult = document.getElementById("results");

    document.getElementById("url_share").disabled = true;
    ssResult.style.display = "block";
    console.log("ssResuldrawImaget");
    var imgData = threeStuffs.renderer.domElement.toDataURL("image/jpeg", 0.5);
    // console.log("img data", imgData);
    var ssImage = (ssResult.innerHTML =
      '<img src="' + imgData + '" id="screenShot_img"/>');
    var shareBtb = document.createElement("img");
    var downloadbtn = document.createElement("img");
    var closeBtn = document.createElement("img");
   
    ssResult.appendChild(shareBtb);
    ssResult.appendChild(downloadbtn);
    ssResult.appendChild(closeBtn);
    shareBtb.setAttribute("src", "img/share.png");
    shareBtb.setAttribute("id", "ssSharebtn");
    closeBtn.setAttribute("id", "ssClose");
    closeBtn.setAttribute("src", "img/end.png");
    downloadbtn.setAttribute("src", "img/downloadss.png");
    downloadbtn.setAttribute("id", "saveSsImgae");
    
    if (ssImage) {
      
      document.getElementById("photo-button").disabled = true;
      downloadbtn.addEventListener("click",  function () {
        console.log(a);
        a.setAttribute("href", imgData);


        let randomFile = Math.random().toString(26).slice(6);
        // a.download = randomFile;
        
        a.setAttribute("download", randomFile);
        a.click();
        document.getElementById("photo-button").disabled = false;
        ssResult.style.display = "none";
        
        document.getElementById("url_share").disabled = true;
      });
      shareBtb.addEventListener("click", async function () {
        // console.log("hello share")

        var blob = await fetch(imgData).then((r) => r.blob());

        const share = async (blob) => {
          const data = {
            files: [
              new File([blob], "image.png", {
                type: blob.type,
              }),
            ],
            title: "Share this image to :",
          };
          try {
            if (!navigator.canShare(data)) {
              throw new Error("Can't share data.", data);
            }
            await navigator.share(data);
          } catch (err) {
            console.error(err.name, err.message);
          }
        };
        share(blob);

        document.getElementById("photo-button").disabled = false;
        ssResult.style.display = "none";
        
        document.getElementById("url_share").disabled = true;
      });
      closeBtn.addEventListener("click", function () {
        document.getElementById("photo-button").disabled = false;
        ssResult.style.display = "none";

        document.getElementById("url_share").disabled = true;
      });
    }
  }
  
  // screen shot
  document
    .getElementById("photo-button")
    .addEventListener("click", function () {
      // alert("screenshot")
     
      // var shareBtn = document.getElementById("descarga-link")
      saveAsImage(a);
    });

  // end of screen shot
  const light = new THREE.PointLight(0xffffff, 1, 1000);
  light.position.set(0, 0, 0);
  threeStuffs.scene.add(light);

  const light2 = new THREE.AmbientLight(0xffffff, 2, 100);
  light.position.set(0, 0, 25);
  threeStuffs.scene.add(light);

  const dy = 0.17;
  // create and add the occluder:
  r.occluder.rotation.set(0.3, 0, 0);
  r.occluder.position.set(0, 0.03 + dy, -0.04);
  r.occluder.scale.multiplyScalar(0.0084);
  threeStuffs.faceObject.add(r.occluder);

  // create and add the glasses mesh:
  const threeGlasses = r.glasses;
  //threeGlasses.rotation.set(-0.15,0,0); / /X neg -> rotate branches down
  threeGlasses.position.set(0, dy, 0.4);
  threeGlasses.scale.multiplyScalar(0.006);
  threeStuffs.faceObject.add(threeGlasses);

  // add a debug cube:
  /* const sc = 0.1;
  const debugCube = new THREE.Mesh(new THREE.BoxGeometry(sc,sc,sc), new THREE.MeshNormalMaterial());
  threeStuffs.faceObject.add(debugCube); //*/

  // CREATE THE CAMERA:
  THREECAMERA = JeelizThreeHelper.create_camera();
} // end init_threeScene()

// entry point:
function main() {
  JeelizResizer.size_canvas({
    canvasId: "jeeFaceFilterCanvas",
    callback: function (isError, bestVideoSettings) {
      init_faceFilter(bestVideoSettings);
    },
  });
}

function readDeviceOrientation() {
  if (
    Math.abs(window.orientation) === 90 ||
    Math.abs(window.orientation) === -90
  ) {
    console.log("this is device orientation");
    document.getElementById("greyScreen").style.display = "block" ;
    document.getElementById("jeeFaceFilterCanvas").style.display="none";
    document.getElementById("turn-mobileview").style.display="block";
    document.getElementById("turn-mobileview").style.fontSize="20px";
  }
  else{
    document.getElementById("greyScreen").style.display = "none" ;
    document.getElementById("jeeFaceFilterCanvas").style.display="block";
    document.getElementById("turn-mobileview").style.display="none";
    //document.getElementById("turn-mobileview").style.fontSize="20px";

  }

}
//vipul edit
const clock = new THREE.Clock();
function animate() {
  if(mixer)
      mixer.update(clock.getDelta());
 // renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.onorientationchange = readDeviceOrientation;

function init_faceFilter(videoSettings) {
  JEEFACEFILTERAPI.init({
    followZRot: true,
    canvasId: "jeeFaceFilterCanvas",
    NNCPath: "neuralNets/", // path of NN_DEFAULT.json file
    maxFacesDetected: 1,
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log("AN ERROR HAPPENS. ERR =", errCode);
        return;
      }

      console.log("INFO: JEEFACEFILTERAPI IS READY");
      init_threeScene(spec);
    },

    // called at each render iteration (drawing loop):
    callbackTrack: function (detectState) {
      JeelizThreeHelper.render(detectState, THREECAMERA);
    },
    // videoSettings: {
    //   'facingMode': 'environment' //to use the rear camera, set to 'environment'
    // }
  }); //end JEEFACEFILTERAPI.init call
}
