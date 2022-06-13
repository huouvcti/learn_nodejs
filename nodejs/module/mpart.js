var M = {
  v:'v',
  f:function(){
    console.log(this.v);
  }
}

// module : 약속된 객체
module.exports = M;   // 객체 M을 이 모듈 바깥에서 사용할 수 있도록 exports 한다
