// 객체 이용 정리
module.exports = {
  Html: function(title, list, description){
    var t = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          ${list}
        </ol>
        <a href="/create">create</a> `;
    var b = `<h2>${title}</h2>
               <p>${description}</p>
               </html>`;
    var m = `<a href="/update?id=${title}">update</a>
             <form action="delete_process" method="post">
               <input type="hidden" name="title" value="${title}">
               <input type="submit" value="delete">
             </form>`;

    if(title === 'welcome'){
      return t + b;
    } else{
      return t + m + b;
    }
  },

  List: function(filelist){
    var l = "";
    for(var i=0; i<filelist.length; i++){
      l += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    return l;
  }
}
