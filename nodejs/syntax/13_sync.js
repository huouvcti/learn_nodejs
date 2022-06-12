var fs = require('fs');

/*
 * readFileSync (동기적)
 *  리턴값 O

    console.log('A');
    var result = fs.readFileSync('sample.txt', 'utf8');
    console.log(result);
    console.log('c');
*/

/*
 * readFile (비동기적)
 * 리턴값 X
 * function({에러}, {파일의 내용})
*/
console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){
  console.log(result);
});
console.log('c');
