const container = document.querySelector(".container");

//document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
  
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate()
      .then(estimate => {
        document.getElementById('usage').innerHTML = estimate.usage;
        document.getElementById('quota').innerHTML = estimate.quota;
        document.getElementById('percent').innerHTML = (estimate.usage * 100 / estimate.quota).toFixed(0);
      });
  }
  
  if ('storage' in navigator && 'persisted' in navigator.storage) {
    navigator.storage.persisted()
      .then(persisted => {
        document.getElementById('persisted').innerHTML = persisted ? 'persisted' : 'not persisted';
      });
  }

  var $status = document.getElementById('status');

if ('Notification' in window) {
  $status.innerText = Notification.permission;
}

function requestPermission() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    $status.innerText = result;
  });
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
}
