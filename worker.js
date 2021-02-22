async function getNavigatorStorage() {
  let d = await navigator.storage.getDirectory();
  let h = await d.getFileHandle("worker.txt");
  let f = await h.getFile();
  return await f.text();
}

async function setNavigatorStorage(x) {
  let d = await navigator.storage.getDirectory();
  let h = await d.getFileHandle("worker.txt", { create: true });
  let w = await h.createWritable();
  w.write(x);
  w.close();
}

let datatypes = {
  "Navigator.storage": [getNavigatorStorage, setNavigatorStorage],
}

// Call with get/set, type, [value] 
onmessage = async function (e) {
  if (e.data[0] == 'get') {
    let t = e.data[1];
    let data;
    try {
      data = await datatypes[t][0]();
    } catch (e) {
      console.log("error reading data for " + t, e);
    }
    postMessage(data);
  } else if (e.data[0] == 'set') {
    let t = e.data[1];
    try {
      await datatypes[t][1](e.data[2]);
    } catch (e) {
      console.log("error writing data for " + t, e);
    }
    postMessage("done");
  }
}