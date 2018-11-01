//used to run sandbox
function show(message) {
  if (message === undefined) {
    document.getElementById('scriptOutput').innerHTML += '\n';
  } else {
    var json;
    if (typeof message === 'string') {
      json = message;
    } else {
      json = JSON.stringify(message, undefined, 2);
    }
    document.getElementById('scriptOutput').innerHTML += json + '\n';    
  }
}

function clear() {
  document.getElementById('scriptOutput').innerHTML = '';
}


