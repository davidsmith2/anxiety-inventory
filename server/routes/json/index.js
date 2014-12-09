var mongoose = require('mongoose'),
    Inventory = require('../../models/Inventory'),
    Question = require('../../models/Question'),
    Choice = require('../../models/Choice');

module.exports = function (app, bodyParser) {
    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({extended: false});
    app.get('/inventories', function (req, res, next) {
        Inventory.find(function (err, inventories) {
            if (err) {
                return next(err);
            }
            res.json(inventories);
        });
    });
    app.post('/inventories', urlencodedParser, function (req, res, next) {
        var inventory = new Inventory(req.body);
        Question.find(function (err, questions) {
            Choice.find(function (err, choices) {
                for (var i = 0; i < questions.length; i++) {
                    questions[i].choices = choices;
                }
                inventory.questions = questions;
                inventory.save(function (err, inventory) {
                    if (err) {
                        return next(err);
                    }
                    res.json(inventory);
                });
            });
        });
    });
    app.get('/inventories/:inventory', function (req, res) {
        res.json(req.inventory);
    });
    app.param('inventory', function (req, res, next, id) {
        var query = Inventory.findById(id);
        query.exec(function (err, inventory) {
            if (err) {
                return next(err);
            }
            if (!inventory) {
                return next(new Error("Can't find inventory"));
            }
            req.inventory = inventory;
            return next();
        });
    });
/*
    app.put('/posts/:post/upvote', function (req, res, next) {
        req.post.upvote(function (err, post) {
            if (err) {
                return next(err);
            }
            res.json(post);
        });
    });
    app.put('/posts/:post/downvote', function (req, res, next) {
        req.post.downvote(function (err, post) {
            if (err) {
                return next(err);
            }
            res.json(post);
        });
    });
    app.post('/posts/:post/comments', function (req, res, next) {
        var comment = new Comment(req.body);
        comment.post = req.post;
        comment.save(function (err, comment) {
            if (err) {
                return next(err);
            }
            req.post.comments.push(comment);
            req.post.save(function (err, post) {
                if (err) {
                    return next(err);
                }
                res.json(comment);
            });
        });
    });
    app.get('/posts/:post/comments/:comment', function (req, res) {
        res.json(req.comment);
    });
    app.put('/posts/:post/comments/:comment/upvote', function (req, res, next) {
        req.comment.upvote(function (err, comment) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
    app.put('/posts/:post/comments/:comment/downvote', function (req, res, next) {
        req.comment.downvote(function (err, comment) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
    app.param('comment', function (req, res, next, id) {
        var query = Comment.findById(id);
        query.exec(function (err, comment) {
            if (err) {
                return next(err);
            }
            if (!comment) {
                return next(new Error("Can't find comment"));
            }
            req.comment = comment;
            return next();
        });
    });
*/
};