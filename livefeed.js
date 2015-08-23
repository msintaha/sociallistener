if (Meteor.isServer) {
  Meteor.startup(function () {
    var c=Hash.find().count();
if(c==0){
    Hash.insert({hashtag:'#Webabulous'});
  }  
    var theTag=Hash.find().fetch()[c-1].hashtag;
  
//Hash.find
    // code to run on server at startup
	 var Twit = Meteor.npmRequire('twit');

    var T = new Twit({
        consumer_key:         'ClkspMmRMOTAJvysssMpylY56', // API key
        consumer_secret:      '34qxajeFKcPTvMocYT5xMdOTZrQohbOAO1btgpRihJuA1tGxlM', // API secret
        access_token:         '138086873-jMTpMLwOTPKRRDQ9MnlgUvwIollZTadG3i9ZnRlz', 
        access_token_secret:  'xFdxY1bV2aRaxvy5AJ16i7kCxsVNe6MzThTr5QgJxJzwJ'
    });
console.log(theTag);
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

// var Instagram = Meteor.npmRequire('instagram-node-lib');

// Instagram.set('client_id', 'eb92efd7f42342178f31a0502a04467a');
// Instagram.set('client_secret', 'a10ceddc9d714afb86d74908607727d9');

// Instagram.set('callback_url', 'https://webfeed.fwd.wf/callback');
// Instagram.set('redirect_uri', 'https://webfeed.fwd.wf');

// Instagram.tags.recent({ name: 'webabulous',
//  complete: function(data) {
//       //console.log(data);
//       }
//   });

// Instagram.tags.subscribe({
//   object_id: 'webable'
// });
// Instagram.tags.subscribe({
//   object_id: 'webabulous'
// });

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

