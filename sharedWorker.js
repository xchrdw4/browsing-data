let clients = new Array();
let value = null;

// This shared worker allows to store and retrieve values across tabs.
self.onconnect = e => {
    let port = e.ports[0];
    clients.push(port);
    console.log(e);
    port.onmessage = e => {
      if(e.data.value)
        value = e.data.value;
      else 
        e.srcElement.postMessage({"value" : value});
    };
    port.start();
    port.postMessage({"connected": true});
};