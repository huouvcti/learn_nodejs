// 조건문

var args = process.argv;
console.log(args);
/* args 출력값
 * [
 *   'C:\\Program Files\\nodejs\\node.exe',
 *   'C:\\Users\\huouv\\Desktop\\코딩공부\\nodejs\\syntax\\8_conditional.js',
 *   ''
 *   ''
 * ]
 */

console.log('A');
console.log('B');

if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}

console.log('D');
