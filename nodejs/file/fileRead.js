// 파일 관련 https://opentutorials.org/module/938/7373
// https://nodejs.org/api/fs.html#filehandlereadfileoptions


var fs = require('fs');
fs.readFile('sample.txt', 'utf8', function(err, data){
  console.log(data);
});
