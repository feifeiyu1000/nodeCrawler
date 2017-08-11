/**
 * Created by Administrator on 2016/3/11.
 */
var i =111;
var superagent = require('superagent');    //引入我们安装好的模块
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');                   //引入文件读取模块
function  myfunc(){
    if(i < 247){
    	// console.log("myfunc  "+Interval);
    	console.log("i="+i)
    	superagent.get('http://jandan.net/ooxx/page-'+i+'#comments')    
					.end(function(err,docs){
						var $ = cheerio.load(docs.text);    //docs.text就是爬取到的数据，把它经过cheerio转换
						var imgArr = [];
						//$('.commentlist li .text p img')找到当前这页的所有图片元素,具体看下图hmtl结构就明白了
						$('.commentlist li .text p img').each(function(idx, element){
								var $el = $(element);
								var url = $el.attr('src');
								if(url.indexOf("http:") == -1){
									imgArr.push("http:"+url);   //将图片的链接push到数组里
								} else {
									imgArr.push(url);   //将图片的链接push到数组里
								}
						})
						for(var i=0;i<imgArr.length;i++){
							downloadImg(imgArr[i],imgArr[i].split('/')[4]);      //下载数组里的每张图片    
						}
					})
					i ++;
			var dir = './images';
			var downloadImg = function(url, filename){
					 request.head(url, function(err, res, body){
						 request(url).pipe(fs.createWriteStream(dir + "/" + filename));
					 });
			};  


    } else {
    	process.exit();
    }

}
var myInterval=setInterval(myfunc,3000);
