
import { FaceBlinder } 		from '/home/neon/face-blinder-master'

//const hubinFile = '/home/neon/Desktop/download/1.jpg'


var common = require('../test/common');
var http = require('http'),
    util = require('util'),
    os = require('os'),
    formidable = common.formidable,
    port = common.port,
    server;
const faceBlinder = new FaceBlinder()  
async function main()
{

    await  faceBlinder.init()
}


main()


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
    var form = new formidable.IncomingForm(),
    files:any[] = [],
    fields:any[] = [];

    form.uploadDir = os.tmpdir();
    
  
    form
      .on('field',async function(field, value) {
       // console.log(field, value);
      await fields.push([field, value])
      })
      .on('file',async function(field, file) {
      await files.push([field, file])
      console.log(field,file.path)
      const hubinFile=file.path
      const hubin = await faceBlinder.see(hubinFile)
      const recognizedZixia     = await faceBlinder.recognize(hubin[0]) || `I don't know the person`
      console.log(`Recognize hubin     result: ${recognizedZixia}`)
      })
      .on('end', function() {
     //   console.log('-> upload done');
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
