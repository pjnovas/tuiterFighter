
/*
 * GET home page.
 */

exports.index = function(req, res){
	var user = req.params.userId;
	res.render('index', { title: "Stalking " + user })
};


