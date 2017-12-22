'use strict';

/**
 * @author synder on 2017/4/1
 * @copyright
 * @desc
 */

var fs = require('fs');
var path = require('path');
var mime = require('mime');
var request = require('request');
var async = require('async');
var mysql = require('mysql');
var mongodb = require('../../mongodb/ifibbs/index');
var ifibbs = mongodb.client;

var Article = ifibbs.model('Article');
var Subject = ifibbs.model('Subject');

var mysqlConnection = mysql.createConnection({
    host: '192.168.1.106',
    user: 'root',
    password: 'wangjinyuan123',
    database: 'zhongyin'
});

mysqlConnection.connect();

var requestImage = function requestImage(ids, callback) {

    var files = [];

    async.eachLimit(ids, 1, function (id, cb) {

        var uri = 'http://www.jkinst.com/zy-api/a/db/mongod/picture/' + id;
        request({
            uri: uri,
            method: 'GET',
            json: true,
            body: {}
        }, function (err, res, body) {

            if (err) {
                console.error(err);
                return cb();
            }

            if (!res) {
                return cb();
            }

            var temp = res.headers['content-type'];

            if (!temp) {
                return cb();
            }

            var contentType = temp.split(';')[0];
            var ext = mime.extension(contentType);
            var fileName = id + '.' + ext;
            var req = request(uri);
            var wri = fs.createWriteStream('./images/' + fileName);

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

var slq = '\n    select\n      cms_article.title,\n      cms_article.image,\n      cms_article.description,\n      cms_article.praise_count,\n      cms_article_data.content,\n      cms_article.create_date,\n      cms_category.name as c_category,\n      cms_category.description as c_description\n    from  cms_article\n      JOIN cms_category on cms_article.category_id = cms_category.id\n      JOIN cms_article_data on cms_article.id = cms_article_data.id\n    WHERE cms_article.del_flag = 0 and\n           (cms_article.category_id = \'66c8afc1e4bc4b7e8240fcf2303a4ed5\' or \n           cms_article.category_id = \'3033\')\n    ;\n    ';

mysqlConnection.query(slq, function (err, results, fields) {
    if (err) {
        return console.error(err);
    }

    var articles = [];
    var subjectID = '58e49f400774052cf104fa93';

    var _loop = function _loop(key) {
        var result = results[key];

        result.images = [];
        if (result.title && result.content) {

            if (result.image) {
                result.images.push(result.image);
            }
            var regex = /([0-9]|[a-f]){24}/g;
            var contentImages = result.content.match(regex);
            if (contentImages && contentImages.length > 0) {
                contentImages.forEach(function (id) {
                    result.images.push(id);
                });
            }
            articles.push(result);
        }
    };

    for (var key in results) {
        _loop(key);
    }

    async.eachLimit(articles, 1, function (a, cb) {

        var articleID = mongodb.ObjectId();

        requestImage(a.images, function (err, files) {
            if (err) {
                cb(err);
                return;
            }

            a.newImages = [];

            files.forEach(function (file) {
                var newUrl = 'http://www.jkinst.com:80/images/article/' + file;
                var id = file.split('.')[0];

                a.newImages.push(newUrl);

                if (a.image && id == a.image) {
                    a.image = newUrl;
                }

                a.content = a.content.replace('http://www.jkinst.com/zy-api/a/db/mongod/picture/' + id, newUrl);
            });

            Article.create({
                _id: articleID,
                status: Article.STATUS.PUBLISHED, //文章状态
                order: 1,
                top: false, //是否置顶
                recommend: false,
                title: encodeURIComponent(a.title), //文章标题
                summary: encodeURIComponent(a.description || ''), //文章摘要
                icon: a.image || a.newImages[0],
                cover: a.image || a.newImages[0],
                tags: [a.c_category], //文章标签
                content: encodeURIComponent(a.content), //文章内容
                browse_count: 0, //浏览次数
                favour_count: a.praise_count || 0, //被赞次数
                comment_count: 0, //被评论次数
                url: 'http://www.jkinst.com:80/h5/article.html?article_id=' + articleID.toString(),
                collect_count: 0, //被收藏次数
                create_time: new Date(a.create_date), //创建时间
                update_time: new Date(), //更新时间
                subject_id: subjectID, //文章所属专题
                create_user_id: null //创建人
            }, cb);
        });
    }, function (err, result) {
        console.log(err);
        mysqlConnection.end();
    });
});