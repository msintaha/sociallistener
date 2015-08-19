Router.route('/', function () {
  this.render('home');
});

Router.map(function(){
	this.route('home', {path: '/home'});
    this.route('login', {path: '/login'});
    this.route('register', {path: '/register'});
var Instagram = Meteor.npmRequire('instagram-node-lib');
this.route('/callback', {where: 'server'}).get(function (req, res) {
  var handshake = Instagram.subscriptions.handshake(req, res);//remove this and you'll get apisubscriptionerror
  }).post(function (req, res) {
   var obj = req.body;
console.log(obj);
 obj.forEach(function(tag) {
var url="https://api.instagram.com/v1/tags/"+tag.object_id+"/media/recent?client_id=eb92efd7f42342178f31a0502a04467a";
 var mintag=0;

var result=HTTP.get(url, {timeout:5000});
var respJson = JSON.parse(result.content);
console.log(respJson);
minID=respJson.pagination.min_tag_id;

 	var securl="https://api.instagram.com/v1/tags/"+tag.object_id+"/media/recent?client_id=eb92efd7f42342178f31a0502a04467a&min_tag_id="+mintag;
	var res=HTTP.get(securl, {timeout:4000});	
 	var jsonresp=JSON.parse(res.content);
 
 	for (var i = 0;i<jsonresp.data.length;i++) {
 		Insta.insert({
 			instaImg:jsonresp.data[i].images.standard_resolution.url,
 			instaUser:jsonresp.data[i].user.full_name,
 			instaPro:jsonresp.data[i].user.profile_picture
 		});
 	}
	});
  });
});


