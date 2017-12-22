/**
 * @author synder on 2017/4/1
 * @copyright
 * @desc
 */

const fs = require('fs');
const path = require('path');
const mime = require('mime');
const request = require('request');
const async = require('async');
const mysql = require('mysql');
const mongodb = require('../../mongodb/ifibbs/index');
const ifibbs = mongodb.client;

let Article = ifibbs.model('Article');
let Subject = ifibbs.model('Subject');


const mysqlConnection = mysql.createConnection({
    host: '192.168.1.106',
    user: 'root',
    password: 'wangjinyuan123',
    database: 'zhongyin'
});

mysqlConnection.connect();


const requestImage = function (ids, callback) {

    let files = [];
    
    async.eachLimit(ids, 1, function (id, cb) {
        
        let uri = 'http://www.jkinst.com/zy-api/a/db/mongod/picture/' + id;
        request({
            uri: uri,
            method: 'GET',
            json: true,
            body: {},
        }, function (err, res, body) {
            
            if(err){
                 console.error(err);
                 return cb();
            }
            
            if(!res){
                return cb();
            }
            
            let temp = res.headers['content-type'];
            
            if(!temp){
                return cb();
            }
            
            let contentType = temp.split(';')[0];
            let ext = mime.extension(contentType);
            let fileName = id + '.' + ext;
            let req = request(uri);
            let wri = fs.createWriteStream('./images/' + fileName);
            
            req.on('end', function () {
                console.log('end');
                files.push(fileName);
                cb();
            });
            
            req.on('error', function (err) {
                console.error(err);
                cb();
            });
            
            req.pipe(wri);
        });
    }, function (err) {
        callback(err, files);
    });
};


let slq = `
    select
      cms_article.title,
      cms_article.image,
      cms_article.description,
      cms_article.praise_count,
      cms_article_data.content,
      cms_article.create_date,
      cms_category.name as c_category,
      cms_category.description as c_description
    from  cms_article
      JOIN cms_category on cms_article.category_id = cms_category.id
      JOIN cms_article_data on cms_article.id = cms_article_data.id
    WHERE cms_article.del_flag = 0 and
           (cms_article.category_id = '66c8afc1e4bc4b7e8240fcf2303a4ed5' or 
           cms_article.category_id = '3033')
    ;
    `;

mysqlConnection.query(slq, function (err, results, fields) {
    if (err) {
        return console.error(err);
    }
    
    let articles = [];
    let subjectID = '58e49f400774052cf104fa93';
    

    for (let key in  results) {
        let result = results[key];
        
        result.images = [];
        if (result.title && result.content) {
            
            if (result.image) {
                result.images.push(result.image);
            }
            let regex = /([0-9]|[a-f]){24}/g;
            let contentImages = result.content.match(regex);
            if (contentImages && contentImages.length > 0) {
                contentImages.forEach(function (id) {
                    result.images.push(id);
                });
            }
            articles.push(result);
        }
    }

    async.eachLimit(articles, 1, function(a, cb){

        let articleID = mongodb.ObjectId();

        requestImage(a.images, function (err, files) {
            if(err){
                cb(err);
                return;
            }

            a.newImages = [];

            files.forEach(function (file) {
                let newUrl = 'http://www.jkinst.com:80/images/article/' + file;
                let id = file.split('.')[0];

                a.newImages.push(newUrl);

                if (a.image && id == a.image) {
                    a.image = newUrl;
                }

                a.content = a.content.replace('http://www.jkinst.com/zy-api/a/db/mongod/picture/' + id, newUrl);
            });

            Article.create({
                _id: articleID,
                status: Article.STATUS.PUBLISHED,    //文章状态
                order: 1,
                top: false,    //是否置顶
                recommend: false,
                title: encodeURIComponent(a.title),    //文章标题
                summary: encodeURIComponent(a.description || ''),    //文章摘要
                icon: a.image || a.newImages[0],
                cover: a.image || a.newImages[0],
                tags: [a.c_category],    //文章标签
                content: encodeURIComponent(a.content),    //文章内容
                browse_count: 0,    //浏览次数
                favour_count: a.praise_count || 0,    //被赞次数
                comment_count: 0,    //被评论次数
                url: 'http://www.jkinst.com:80/h5/article.html?article_id=' + articleID.toString(),
                collect_count: 0,    //被收藏次数
                create_time: new Date(a.create_date),    //创建时间
                update_time: new Date(), //更新时间
                subject_id: subjectID,  //文章所属专题
                create_user_id: null   //创建人
            }, cb);
        });

    }, function(err, result){
        console.log(err);
        mysqlConnection.end();
    });
});
