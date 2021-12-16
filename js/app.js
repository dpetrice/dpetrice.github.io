const container = document.querySelector(".container");

//document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
  /* Device Position
  */
  if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
  } else {
    document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
  }
  

 
  function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }
  
  var theStream;
  
  function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
    
    var constraints = {
      video: true
    };
  
    getUserMedia(constraints, function (stream) {
      var mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    }, function (err) {
      alert('Error: ' + err);
    });
  }


  var target = document.getElementById('target');
var watchId;

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var newLocation = document.createElement('p');
  newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
  target.appendChild(newLocation);
}

if ('geolocation' in navigator) {
  document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, 'fetched');
    });
    watchId = navigator.geolocation.watchPosition(appendLocation);
  });
} else {
  target.innerText = 'Geolocation API not supported.';}
  
  function takePhoto() {
    if (!('ImageCapture' in window)) {
      alert('ImageCapture is not available');
      return;
    }
    
    if (!theStream) {
      alert('Grab the video stream first!');
      return;
    }
    
    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto()
      .then(blob => {
        var theImageTag = document.getElementById("imageTag");
        theImageTag.src = URL.createObjectURL(blob);
      })
      .catch(err => alert('Error: ' + err));
  }
}

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;
var theRecorder;
var recordedChunks = [];

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {video: true, audio: true};
  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    
    theStream = stream;
    try {
      recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    } catch (e) {
      console.error('Exception while creating MediaRecorder: ' + e);
      return;
    }
    theRecorder = recorder;
    console.log('MediaRecorder created');
    recorder.ondataavailable = recorderOnDataAvailable;
    recorder.start(100);
  }, function (err) {
    alert('Error: ' + err);
  });
}

function recorderOnDataAvailable(event) {
  if (event.data.size == 0) return;
  recordedChunks.push(event.data);
}

function download() {

bannerImage = document.getElementById('imageTag');
imgData = getBase64Image(bannerImage);
localStorage.setItem("imgData", imgData); 


var base64 = getBase64Image(document.getElementById("imageTag"));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nonPersistentNotification() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  try {
    var notification = new Notification("Hi there - non-persistent!");
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}

function persistentNotification() {
  if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
    alert('Persistent Notification API not supported!');
    return;
  }
  
  try {
    navigator.serviceWorker.getRegistration()
      .then((reg) => reg.showNotification("Hi there - persistent!"))
      .catch((err) => alert('Service Worker registration error: ' + err));
  } catch (err) {
    alert('Notification API error: ' + err);
  }
}
  
  function requestPersistence() {
    if ('storage' in navigator && 'persist' in navigator.storage) {
      navigator.storage.persist()
        .then(persisted => {
          document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
        });
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function getReadFile(reader, i) {
    return function () {
      var li = document.querySelector('[data-idx="' + i + '"]');
  
      li.innerHTML += 'File starts with "' + reader.result.substr(0, 25) + '"';
    }
  }
  
  function readFiles(files) {
    document.getElementById('count').innerHTML = files.length;
  
    var target = document.getElementById('target');
    target.innerHTML = '';
  
    for (var i = 0; i < files.length; ++i) {
      var item = document.createElement('li');
      item.setAttribute('data-idx', i);
      var file = files[i];
  
      var reader = new FileReader();
      reader.addEventListener('load', getReadFile(reader, i));
      reader.readAsText(file);
  
      item.innerHTML = '' + file.name + ', ' + file.type + ', ' + file.size + ' bytes, last modified ' + file.lastModifiedDate + '';
      target.appendChild(item);
    };
  }
  
  async function writeFile() {
    if (!window.chooseFileSystemEntries) {
      alert('Native File System API not supported');
      return;
    }
    
    const target = document.getElementById('target');
    target.innerHTML = 'Opening file handle...';
    
    const handle = await window.chooseFileSystemEntries({
      type: 'save-file',
    });
    
    const file = await handle.getFile()
    const writer = await handle.createWriter();
    await writer.write(0, 'Hello world from What Web Can Do!');
    await writer.close()
    
    target.innerHTML = 'Test content written to ' + file.name + '.';
  }
  function readContacts() {
    var api = (navigator.contacts || navigator.mozContacts);
      
    if (api && !!api.select) { // new Chrome API
      api.select(['name', 'email'], {multiple: true})
        .then(function (contacts) {
          consoleLog('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            consoleLog('First contact: ' + contacts[0].name + ' (' + contacts[0].email + ')');
          }
        })
        .catch(function (err) {
          consoleLog('Fetching contacts failed: ' + err.name);
        });
        
    } else if (api && !!api.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      api.find(criteria)
        .then(function (contacts) {
          consoleLog('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            consoleLog('First contact: ' + contacts[0].givenName[0] + ' ' + contacts[0].familyName[0]);
          }
        })
        .catch(function (err) {
          consoleLog('Fetching contacts failed: ' + err.name);
        });
        
    } else {
      consoleLog('Contacts API not supported.');
    }
  }
  
  function consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += data + '\n';
  }