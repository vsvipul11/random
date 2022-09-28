"use strict";

let THREECAMERA = null;

//************ API call ***********
var main_url = window.location.href;
console.log("main_url", main_url)
var split_url = main_url.split("?")
var split_url = split_url[1]

function getDeviceType () {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
      console.log("You are using Mobile"); 
  } 
  else {
    window.location.replace(`../../qrcode/?${split_url}`);

    console.log("You are using Desktop");
  }
} 
getDeviceType()
async function callApi(body)
{
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: body,
    redirect: 'follow',
    header: {
      'Access-Control-Allow-Origin':'*',
    }, 
  };
  let resp = await fetch("https://api.morkshub.xyz/ARexperience/webar", requestOptions)
  console.log(resp.status);
  if (resp.status == '500')
  {
    window.location.replace("https://vossle.com/");
  }
  let text = await resp.text()
  let jsonresp = JSON.parse(text)
  return jsonresp;
}

// callback: launched if a face is detected or lost. mmmmm
function detect_callback(faceIndex, isDetected) {
  // document.getElementById("s_loader").style.display = "none"; 
  var loading = document.getElementById("loading_ff")
  // document.getElementById("s_loader").style.display = "none"; 
  if (isDetected) {
    console.log('INFO in detect_callback(): DETECTED');
    loading.style.display = "none"
  } else {
    console.log('INFO in detect_callback(): LOST');
    loading.style.display = "block"
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
  console.log(threeStuffs)

  // CREATE THE GLASSES AND ADD THEM
  const r = JeelizThreeGlassesCreator({
    envMapURL: "envMap.jpg",
    frameMeshURL: "models3D/glassesFramesBranchesBent.json",
    lensesMeshURL: "models3D/glassesLenses.json",
    occluderURL: "models3D/face.json"
  });

        async function apiData ()
        {
            var query = window.location.search.replace('?', '');
            const [label, value] = query.split('=')
            
            var formData = new FormData();
            formData.append(label, value);
            const jsonResp = await callApi(formData);
            const experience = jsonResp.body;
            console.log(experience)
            var content = experience.content
            console.log(content) 

            // get experience name data on html 
            document.getElementById("name").innerHTML = experience.Name;


            // get api data on info button
            var web_url = experience.website;
            console.log("web_url", web_url);
            if (!web_url.match(/^https?:\/\//i))
              { 
                // info button listner
              var website = 'http://' + web_url;
              console.log("website", website);
                  document.getElementById("info-btn").onclick = function() 
                  {
                    var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
                    window.open(`${website}`, 'popup', windowSize);
                    console.log("info button running in finction",website)
                  }   
              }
              else
              {
                document.getElementById("info-btn").onclick = function() 
                {
                  var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
                  window.open(`${experience.website}`, 'popup', windowSize);
                  console.log("info button running in finction",website)
                }
              }
                    //  end info buttom listner

                 // get html  share button
                  var linkshare = document.getElementById("url_share");
                  console.log("linksshare",linkshare);
                  linkshare.addEventListener('click', function() 
                    { 
                      shareButtonApiCount();
                      share();
                    });
                    //end get html  share button

                    function share()
                    {
                      if (navigator.share) { 
                        navigator.share({
                          title: 'Share this link to :',
                          url: experience.url
                        }).then(() => {
                          console.log('Thanks for sharing!');
                        })
                        .catch(console.error);
                        } else {
                        shareDialog.classList.add('is-open');
                      }
                    } //end share function

                        // if(experience.Type == 'face_detection' &&  experience.detection_point == 'eye' )
                        // {
                        //     var loader = new THREE.GLTFLoader();
                        //     console.log("inside the glb loader", content)
                        //     loader.load( content, function ( gltf ) {
                        //     if(gltf)
                        //     {
                        //         document.getElementById("s_loader").style.display = "none"; 
                        //     }
                        //     else{
                        //       document.getElementById("s_loader").style.display = "block";
                        //     }
                        //       gltf.scene.scale.set(0.14, 0.13, 0.13)
                        //       //eye-5
                        //       // gltf.scene.scale.set(5, 5, 5)
                        //       // gltf.scene.position.set(0, 0.5, 0.6)
                        //       // eye position 
                        //       // gltf.scene.position.set(0, 0, 0)
                        //       // head postion
                        //       // gltf.scene.position.set(0, 0.9, 0)
                        //       // gltf.scene.rotation.set(0, 0, 0)
                        //       threeStuffs.faceObject.add(gltf.scene);
                        //       const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
                        //       light.position.set(0,0,0);
                        //       threeStuffs.scene.add(light)

                        //       const light2 = new THREE.AmbientLight(0xFFFFFF, 2, 100);
                        //       light.position.set(0,0,25);
                        //       threeStuffs.scene.add(light);

                              
                        //     }, undefined, function ( e ) 
                        //       {
                        //         console.error( e );
                        //       } );  
                        // } //end of if statement

                        if(experience.Type == 'face_detection' &&  experience.detection_point == 'eye' )
                        {
                            var loader = new THREE.GLTFLoader();
                            console.log("inside the glb loader", content)
                            loader.load( 'newCap1.glb', function ( gltf ) {
                            if(gltf)
                            {
                                document.getElementById("s_loader").style.display = "none"; 
                            }
                            else{
                              document.getElementById("s_loader").style.display = "block";
                            }
                              
                              //eye-5
                              // gltf.scene.scale.set(5, 5, 5)
                              // gltf.scene.position.set(0, 0.5, 0.6)
                              // eye position 
                              // gltf.scene.position.set(0, 0, 0)
                              // head postion
                              gltf.scene.position.set(0, -0.7, -0.45)
                              gltf.scene.scale.multiplyScalar(0.15);
                              // demo 2 head position
                              // gltf.scene.scale.multiplyScalar(0.14);
                              // gltf.scene.position.set(0, -0.7, 0)
                              // head offset postion
                              // gltf.scene.scale.multiplyScalar(0.14);
                              // gltf.scene.position.set(0, -0.1, 0)
                              // gltf.scene.rotation.set(0.5, -0.5, 0)
                              gltf.scene.rotation.set(-0.1, 0, 0)
                              threeStuffs.faceObject.add(gltf.scene);
                              const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
                              light.position.set(0,0,0);
                              threeStuffs.scene.add(light)

                              const light2 = new THREE.AmbientLight(0xFFFFFF, 2, 100);
                              light.position.set(0,0,25);
                              threeStuffs.scene.add(light);

                              
                            }, undefined, function ( e ) 
                              {
                                console.error( e );
                              } );  
                        } //end of if statement

        } // end of apidata function

        apiData()

        // Url Share api count
        async function shareButtonApiCount() {
          const currentUlr = window.location.href;
          console.log("currentUtl", currentUlr);
          const [label, value] = currentUlr.split('=')
          console.log("after split value =", value)
          console.log("after split label =", label)
          var formdata = new FormData();
          formdata.append('id', value);
          var requestOptions = {
            method: 'POST',
            body:formdata,
            redirect: 'follow'
          }
        
        fetch("https://api.vossle.com/ARexperience/share_count", requestOptions)
          .then(response => response.text())
          .then(result => console.log("sharebutton",result))
          .catch(error => console.log('error', error));
        }

        // end of Url Share api count

        // screen shot 
        document.getElementById("photo-button").addEventListener("click", function() {
          // alert("screenshot")
          saveAsImage()

        })

        function saveAsImage() {
          var imgData = threeStuffs.renderer.domElement.toDataURL("image/jpeg" ,0.5)
          var img = new Image();
             img.onload = function(){
               var c = document.createElement('canvas');
               c.width = this.width;
               c.height = this.height;
               var ctx = c.getContext('2d');
 
               // ctx.lineWidth = 10;
               // ctx.strokeStyle="red";
               // ctx.strokeRect(0,0, this.width, this.height);
 
               ctx.scale(-1,1);
               ctx.drawImage(this,-this.width,0);
               
               this.onload = undefined; 
               // target.src = c.toDataURL();
               var imgMain = c.toDataURL("image/jpeg" ,0.5);
              //  console.log("canvas img", imgMain)
               var a = document.getElementById('descarga-link');
                   a.href = imgMain;
                   let randomFile = Math.random().toString(26).slice(6)
                   a.download = randomFile;
                   a.click();
             }
             img.src = imgData;
         };

        // function saveAsImage() {
        //   var imgData, resulting_imgs
        //   // var strDownloadMime = "image/octet-stream";
        //   // var canvas = document.getElementById('jeeFaceFilterCanvas')
        //   // var context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
          
        //   // imgData = canvas.toDataURL("image/jpeg", 0.5)
        //   // threeStuffs.renderer.render( threeStuffs.scene, threeStuffs.videoMesh );
        //   imgData = threeStuffs.renderer.domElement.toDataURL("image/jpeg" ,0.5)
          
        //   var my_watermarked = new Watermark();

        //     my_watermarked
        //       .setPicture(imgData, [400, 250])
        //       .addWatermark('../../logo/vossle-logo.png',
        //         {
        //           position: [1,0.8],
        //           scale: 0.4,
                  
        //         }
        //       )
        //       .addWatermark(
        //         proceduralWatermark( 'Captured by'),
        //         {
        //           position: [1,0.8],
        //           scale: 5.0,
        //         }
        //       )
        //       .render( function(){

        //         // var resulting_canvas = wm.getCanvases();
        //         // $.each( resulting_canvas, function(idx, item) {
        //         //   $('body').append( $(item) );
        //         // });
            
        //         //  resulting_imgs = my_watermarked.getImgs( 'wm-2.png' );
        //         // $.each( resulting_imgs, function(idx, item) {
        //         //   $('#results').append( $(item.length[0]) );
        //         //   // console.log('find.length.1', find.length)
        //         // });

        //         console.log('itesm', )
        //         var resulting_data_urls = my_watermarked.getDataUrls( 'image/jpeg', 0.5 );
        //         console.log(resulting_data_urls[0]);
           
        //         var a = document.getElementById('descarga-link');
        //         a.href = imgData;
        //         let randomFile = Math.random().toString(26).slice(6)
        //         a.download = randomFile;
        //         a.click();
         
        //   }); // render callback
        //   console.log("after click ", resulting_imgs)
        // }


      // var saveFile = function (strData, filename) {
      //     var link = document.getElementById('descarga-link');
      //     if (typeof link.download === 'string') {
      //         // document.body.appendChild(link); //Firefox requires the link to be in the body
      //         link.download = filename;
      //         link.href = strData;
      //         link.click();
      //         console.log(strData)
      //         // document.body.removeChild(link); //remove the link when done
              
      //     } else {
      //         // location.replace(uri);
      //     }
      // }
      // end of screen shot
  const dy = 0.17;
  // create and add the occluder:
  r.occluder.rotation.set(0.3, 0, 0);
  r.occluder.position.set(0, 0.03 + dy,-0.04);
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
function main(){
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    callback: function(isError, bestVideoSettings){
      init_faceFilter(bestVideoSettings);
    }
  })
}

function init_faceFilter(videoSettings){
  JEEFACEFILTERAPI.init({
    followZRot: true,
    canvasId: 'jeeFaceFilterCanvas',
    NNCPath: 'neuralNets/', // path of NN_DEFAULT.json file
    maxFacesDetected: 1,
    callbackReady: function(errCode, spec){
      if (errCode){
      console.log('AN ERROR HAPPENS. ERR =', errCode);
      return;
      }

      console.log('INFO: JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    },

    // called at each render iteration (drawing loop):
    callbackTrack: function(detectState){
      JeelizThreeHelper.render(detectState, THREECAMERA);
    },
    // videoSettings: {
    //   'facingMode': 'environment' //to use the rear camera, set to 'environment'
    // }
  }); //end JEEFACEFILTERAPI.init call
}
