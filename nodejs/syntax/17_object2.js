// javascript 에서는 합수가 값이 될 수 있다.

var f = function(){
  console.log(1+1);
  console.log(1+2);
}
var a = [f];
a[0]();

var o = {
  func:f
}
o.func();
