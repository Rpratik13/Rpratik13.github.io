const fileOperation = require('./file');
const http          = require('http');

const server = http.createServer(function(req, res){
  const requestData = req.url.split('/');
    
  switch(requestData[1].toLowerCase()) {
    case 'write':
      fileOperation.writeFile(requestData[2], requestData[3])
      .then(function() {
        res.end(`File ${requestData[2]} has been created with content '${requestData[3]}'`);
      })
      .catch(function () {
        res.end(`Failed to create ${requestData[2]}`);
      });
      break;

    case 'read':
      fileOperation.readFile(requestData[2])
      .then(function(data) {
        res.end(data);
      })
      .catch(function() {
        res.end(`Cannot read ${requestData[2]}`);
      });
      break;
      
    case 'rename':
      fileOperation.renameFile(requestData[2], requestData[3])
      .then(function() {
        res.end(`Successfully renamed ${requestData[2]} to ${requestData[3]}`);
      })
      .catch(function() {
        res.end(`Failed to rename ${requestData[2]}`);
      });
      break;

    case 'delete':
      fileOperation.deleteFile(requestData[2])
      .then(function() {
        res.end(`Successfully deleted ${requestData[2]}`);
      })
      .catch(function() {
        res.end(`Failed to delete ${requestData[2]}`);
      });
      break;

    default:
      res.end('No actions to perform');
  } 
})

server.listen(9090, function() {
  console.log('Server is running at port 9090');
  console.log('Press Ctrl + C to exit');
})