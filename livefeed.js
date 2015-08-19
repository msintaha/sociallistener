if (Meteor.isServer) {
  Meteor.startup(function () {
     
    // code to run on server at startup
	 var Twit = Meteor.npmRequire('twit');

    var T = new Twit({
        consumer_key:         '4GDRSmXazgVxZnvK6I3BuQ2I3', // API key
        consumer_secret:      'BJExD82N4QM8s8Ejy9ulAfgvx2A5Yds9gYsHoM3W4vRXqtJKmx', // API secret
        access_token:         '138086873-jMTpMLwOTPKRRDQ9MnlgUvwIollZTadG3i9ZnRlz', 
        access_token_secret:  'xFdxY1bV2aRaxvy5AJ16i7kCxsVNe6MzThTr5QgJxJzwJ'
    });

var stream = T.stream('statuses/filter', { track: '#ThingsThatITakeCreditFor', language:'en', limit:1});
stream.on('tweet', Meteor.bindEnvironment(function (tweet) {
 //  console.log(tweet);
  Tweets.insert({
    tweet:tweet.text,
    media:tweet.entities,
    name:tweet.user.name,
    username:tweet.user.screen_name,
    userdp:tweet.user.profile_image_url
  });
}));

var Instagram = Meteor.npmRequire('instagram-node-lib');

Instagram.set('client_id', 'eb92efd7f42342178f31a0502a04467a');
Instagram.set('client_secret', 'a10ceddc9d714afb86d74908607727d9');

Instagram.set('callback_url', 'https://webfeed.fwd.wf/callback');
Instagram.set('redirect_uri', 'https://webfeed.fwd.wf');

Instagram.tags.recent({ name: 'webabulous',
 complete: function(data) {
      //console.log(data);
      }
  });

Instagram.tags.subscribe({
  object_id: 'webable'
});
Instagram.tags.subscribe({
  object_id: 'webabulous'
});

});
  Meteor.methods({
    'removeAlltweets':function(){
      Tweets.remove({});
    },
    'removeAllinsta':function(){
      Insta.remove({});
    }
  });
}

