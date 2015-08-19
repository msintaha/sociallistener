 Template.home.helpers({
    tweets: function () {
      return Tweets.find({});
    },
     insta: function () {
      return Insta.find({});
    },
    hasImg:function(){
      var imgpres=Tweets.findOne({_id:this._id}).media.media;
      if(imgpres!==undefined){
        return true;
      } else{
        return false;
      }
    }
    //Tweets.findOne(this._id).media.media[0].media_url
  });

 Template.home.rendered=function(){
 $(document).foundation({
  orbit: {
    animation: 'slide',
    timer_speed: 8000,
    pause_on_hover: false,
    animation_speed: 500,
    navigation_arrows: true,
    bullets: false,
      slide_number: false,
       circular: true
  }
});
}