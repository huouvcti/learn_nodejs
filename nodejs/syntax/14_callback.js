/*
function a(){
  console.log('A');
}
//a();
*/

var a = function(){
  console.log('A');
}
// a();


function slowfunc(callback){
  callback();
}

slowfunc(a); // a: callback function

// Javascript에서 함수가 값이다
// callback 함수 = 다른함수의 인자(parameter)로 이용되는 함수

// https://opentutorials.org/course/3332/21132
// https://www.youtube.com/watch?v=TAyLeIj1hMc
