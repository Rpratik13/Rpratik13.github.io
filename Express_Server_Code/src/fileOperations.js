// Import Files
const config = require('../configs');

// Import Modules
const fs = require('fs');

function writeFile(fileName, fileContent) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`${config.filePath}${fileName}`, fileContent, function(err, done) {
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
    fs.readFile(`${config.filePath}${fileName}`, 'UTF-8', function(err, done) {
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
    fs.rename(`${config.filePath}${fileOldName}`, `${config.filePath}${fileNewName}`, function(err, done) {
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
    fs.unlink(`${config.filePath}${fileName}`, function(err, done) {
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