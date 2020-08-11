// Import Files
const config        = require('./configs');
const fileOperation = require('./src/fileOperations');

// Import Modules
const express = require('express');
const app     = express();

app.get('/', function(req, res) {
  res.end(`Instructions \n
           1. Write \n
           Go to localhost:${config.port}/write/<fileName>/<fileContent>/ \n\n
           2. Read \n
           Go to localhost:${config.port}/read/<fileName>/ \n\n
           3. Rename \n
           Go to localhost:${config.port}/rename/<oldFileName>/<newFileName>/ \n\n
           4. Delete \n
           Go to localhost:${config.port}/delete/<fileName>/ \n\n`
          );
});

app.get('/write/:fileName/:fileContent', function(req, res) {
  const fileContent  = req.params.fileContent;
  const fileName     = req.params.fileName;
 
  fileOperation.writeFile(fileName, fileContent)
  .then(function() {
    res.end(`File ${fileName} has been created with content '${fileContent}'`);
  })
  .catch(function () {
    res.end(`Failed to create file ${fileName}`);
  });
});

app.get('/read/:fileName', function(req, res) {
  const fileName = req.params.fileName;
 
  fileOperation.readFile(fileName)
  .then(function(data) {
    res.end(data);
  })
  .catch(function () {
    res.end(`Cannot read file ${fileName}`);
  });
});

app.get('/rename/:oldFileName/:newFileName', function(req, res) {
  const newFileName = req.params.newFileName;
  const oldFileName = req.params.oldFileName;
 
  fileOperation.renameFile(oldFileName, newFileName)
  .then(function() {
    res.end(`Successfully renamed file ${oldFileName} to ${newFileName}`);
  })
  .catch(function() {
    res.end(`Failed to rename file ${oldFileName}`);
  });
});

app.get('/delete/:fileName', function(req, res) {
  const fileName = req.params.fileName;
 
  fileOperation.deleteFile(fileName)
  .then(function() {
    res.end(`Successfully deleted file ${fileName}`);
  })
  .catch(function() {
    res.end(`Failed to delete file ${fileName}`);
  });
});

app.listen(config.port, function() {
  console.log(`Server Listening at Port ${config.port}`);
});