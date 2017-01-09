if (Meteor.isServer) {
  Meteor.startup(function () {
    var c=Hash.find().count();
	if(c==0){
	    Hash.insert({hashtag:'#Webabulous'});
	  }  
    var theTag=Hash.find().fetch()[c-1].hashtag;
  
	var Twit = Meteor.npmRequire('twit');

    var T = new Twit({
        consumer_key:         '', // API key
        consumer_secret:      '', // API secret
        access_token:      '',
        access_token_secret:  ''
    });

	var stream = T.stream('statuses/filter', { track: theTag, language:'en', limit:1});
	stream.on('tweet', Meteor.bindEnvironment(function (tweet) {

  		Tweets.insert({
			tweet:tweet.text,
			media:tweet.entities,
			name:tweet.user.name,
			username:tweet.user.screen_name,
			userdp:tweet.user.profile_image_url_https
  		});
	}));
});
  Meteor.methods({
    'removeAlltweets':function(){
      Tweets.remove({});
    },
    'removeAlltags':function(){
      Hash.remove({});
    },
    'updateTag':function(tag){
      Hash.update({hashtag:tag});
    }
  });
}

