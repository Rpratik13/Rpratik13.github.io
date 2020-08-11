const fs = require('fs');

function writeFile(fileName, fileContent) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`./files/${fileName}`, fileContent, function(err, done) {
      if (err) {
        reject(err);
      } 
      else {
        resolve(done);
      }
    });  
  })
}

function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(`./files/${fileName}`, 'UTF-8', function(err, done) {
      if (err) {
        reject(err);
      } 
      else {
        resolve(done);
      }
    });  
  })
}

function renameFile(fileOldName, fileNewName){
  return new Promise(function(resolve, reject) {
    fs.rename(`./files/${fileOldName}`, `./files/${fileNewName}`, function(err, done) {
      if (err) {
        reject(err);
      } 
      else {
        resolve(done);
      }
    });   
  }) 
}

function deleteFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.unlink(`./files/${fileName}`, function(err, done) {
      if (err) {
        reject(err);
      } 
      else {
        resolve(done);
      }
    });
  });
}

module.exports = {
  deleteFile,
  readFile,
  renameFile,
  writeFile,
};