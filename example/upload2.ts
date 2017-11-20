//import { FaceBlinder } 		from '../../'
//const hubinFile = '/home/neon/Desktop/download/1.jpg'
//const faceBlinder = new FaceBlinder()



var common = require('../test/common');
var http = require('http'),
    util = require('util'),
    os = require('os'),
    formidable = common.formidable,
    port = common.port,
    server;

server = http.createServer(function(req, res) {
  if (req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  } else if (req.url == '/upload') {
    let form = new formidable.IncomingForm(),
        files:any[] = [],
        fields:any[] = [];
     //   faceBlinder.init()
    form.uploadDir = os.tmpdir();

  //  const hubin =  faceBlinder.see(hubinFile)
    //const faceList = await faceBlinder.see(twoFaceFile)
  //  const recognizedZixia     =  faceBlinder.recognize(hubin[0]) || `I don't know the person`
  //  const recognizedZhizunbao = await faceBlinder.recognize(zixia[0]) || `I don't know the person`
//    console.log(`Recognize hubin     result: ${recognizedZixia}`)
  
  //  console.log(`Recognize Zhizunbao result: ${recognizedZhizunbao}`)
  
 //   faceBlinder.quit()
    form
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
      })
      .on('end', function() {
        console.log('-> upload done');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received fields:\n\n '+util.inspect(fields));
        res.write('\n\n');
        res.end('received files:\n\n '+util.inspect(files));
      });
    form.parse(req);
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});
server.listen(port);

console.log('listening on http://localhost:'+port+'/');
