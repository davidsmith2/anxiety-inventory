module.exports = function (app, bodyParser) {
    var urlencodedParser = bodyParser.urlencoded({extended: false});
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Anxiety Inventory'
        });
    });
};
