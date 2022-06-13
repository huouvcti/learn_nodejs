// 배열
var member = ["nagyong", "AAA", "BBB"];
console.log(member[1]); //AAA

var i=0;
while(i < member.length){
  console.log('array loop', member[i]);
  i++;
}



//객체
var roles = {
  'programmer':'nagyeong',
  'designer' : 'AAA',
  'manager' : 'BBB'
}
console.log(roles.programmer); // nagyeong
console.log(roles['programmer']); // nagyeong

for(var name in roles){
  console.log('object => ', name, 'value => ', roles[name]);
}
