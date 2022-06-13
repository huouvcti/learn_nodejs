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
var http = require('http');       // http
var fs = require('fs');           // file
var url = require('url');         // url
var qs = require('querystring');  // querystring
var path = require('path');       // path
// var sanitizeHtml = require('sanitize-html');

var template = require('./lib/template.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    // 입력 정보 보안
    var filtered_id = path.parse(queryData.id).base;

    console.log(queryData.id);
    console.log(pathname);

    if(pathname === '/'){
      // 파일 리스트 가져오기
      fs.readdir('./file', function(err, filelist){
        var list = template.List(filelist);

        // 파일 읽기
        var title;
        var description;

        fs.readFile(`file/${filtered_id}`, 'utf8', function(err, des){

          if(queryData.id === undefined){
            title = "welcome";
            description = "Hello, node.js"
          } else {
            title = queryData.id;
            description = des;

            // 출력 정보 보안
            // var sanitized_title = sanitizeHtml(title);
            // var sanitized_description = sanitizeHtml(description, {
            //   allowedTags: ['b']
            // });
          }

          var _template = template.Html(title, list, description);


          response.writeHead(200);
          response.end(_template);

        });
      });
    } else if (pathname === '/create') {  // create page
      var menu_title = 'create';
      var createHtml = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${menu_title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <a href="/">home</a>
          <h2>${menu_title}</h2>

          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        </body>
        </html>
      `;
      response.writeHead(200);
      response.end(createHtml);

    } else if (pathname === '/create_process') {  // create process
      var body = '';
      request.on('data', function(data){
          body += data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;

          fs.writeFile(`file/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
      });

    } else if(pathname === '/update'){    //update
      var menu_title = 'update';

      fs.readFile(`file/${filtered_id}`, 'utf8', function(err, des){
        var title = queryData.id;
        var description = des;

        var updateHtml = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${menu_title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <a href="/">home</a>
            <h2>${menu_title}</h2>
            <form action="/update_process" method="post">
              <input type="hidden" name="title_ago" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description" cols="100" rows="20">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          </body>
          </html>
        `;

        response.writeHead(200);
        response.end(updateHtml);
      });

    } else if(pathname === '/update_process'){      //update process
      var body = '';
      request.on('data', function(data){
          body += data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title_ago = post.title_ago;
          var title = post.title;
          var description = post.description;

          fs.rename(`file/${title_ago}`, `file/${title}`, function(err){
            fs.writeFile(`file/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            });

          });
      });

    } else if(pathname === '/delete_process'){      //delete process
      var body = '';
      request.on('data', function(data){
          body += data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;

          console.log(title);

          fs.unlink(`file/${title}`, function(err){
            response.writeHead(302, {Location: `/`});
            response.end();
          });

      });

    }else{
      response.writeHead(404);
      response.end("Not Found");
  }




});
app.listen(3000); //포트
