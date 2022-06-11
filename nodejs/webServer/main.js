// url 쿼리값 분석하기  nodejs url parse query string
/* url 모듈 설명
 * https://velog.io/@gidskql6671/Nodejs-url을-분석을-도와주는-Url-Querystring-모듈
 */
// 쿼리값에 따라서 웹의 내용을 바꾸다

/* console.log(url.parse(_url, true));
  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: null,
    query: [Object: null prototype] {},
    pathname: '/favicon.ico',
    path: '/favicon.ico',
    href: '/favicon.ico'
  }
*/

/* 파일 리스트 가져오기
  fs.readdir('./file', function(err, filelist){
    console.log(filelist);
  })
  cmd : [ 'CSS', 'HTML', 'JavaScript' ]
*/
// CRUD (Create, Read, Update, Delete)



// 모듈
var http = require('http');   // http
var fs = require('fs');       // file
var url = require('url');     // url

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    console.log(queryData.id);

    if(pathname === '/'){

      // 파일 리스트 가져오기
      var list = "";
      fs.readdir('./file', function(err, filelist){
        for(var i=0; i<filelist.length; i++){
          list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }

        // 파일 읽기
        var title;
        var description;
        fs.readFile(`file/${queryData.id}`, 'utf8', function(err, des){

        if(queryData.id === undefined){
          title = "welcome";
          description = "Hello, node.js"
        } else {
          title = queryData.id;
          description = des;
        }

        var template = `
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
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
        `;

        response.writeHead(200);
        response.end(template);

      });
    });
  } else{
      response.writeHead(404);
      response.end("Not Found");
  }




});
app.listen(3000); //포트
