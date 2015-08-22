 Template.home.helpers({
    tweets: function () {
      return Tweets.find({});
    },
     insta: function () {
      return Insta.find({});
    },
    hasImg:function(){
      var imgpres=Tweets.findOne({_id:this._id}).media.media;
     return imgpres;
    }
    //Tweets.findOne(this._id).media.media[0].media_url
  });
 Template.dashboard.helpers({
     tweets: function () {
      return Tweets.find({});
    },
     insta: function () {
      return Insta.find({});
    },
    hasImg:function(){
      var imgpres=Tweets.findOne({_id:this._id}).media.media;
     return imgpres;
    }
 });

 Template.home.rendered=function(){

$(document).ready(function () {

  //Number of rows and columns in grid
  var rows = 1;
  var columns = 1;

  //transition names must reflect modifier classes in css
  var transitions = [ 'left', 'right', 'top', 'bottom' ];
  var transitionsLength = transitions.length;

  //Background colours for tiles
  var colors = [ '#18ABE2', '#0064AA', '#0d316b', '#091848', '#ED4525' ];
  var colorsLength = colors.length;

  //Get all list items that will be used for grid
  var $items = $('.tile-item')
  var itemsLength = $items.length;

  //Helper variables
  var itemsHtml;
  var i;
  var html;
  var style;
  var outputHtml = '';

  //Get random integer between min and max
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  $('.tile-content').remove();

  //Grid style
  style = '<style>';
  style += '.tile-block { ';
    style += 'width: ' + (100 / columns) + '%;';
    style += ' height: ' + (100 / rows) + '%;';
  style += '}';
  style += '</style>';

  $('head').append(style);


  var c=0;
  //Change the block tile (recursive)
  var changeTileItem = function ($tile) {

    var transition = transitions[getRandomInt(0, transitionsLength - 1)];
    var randomTime = getRandomInt(5500, 9000);

    var $active = $tile.find('.tile-item--active');

    //New tile to set as active
    var $newTile = $tile.find('.tile-item');
    var $newTileTemp;
    var newTileOk = false;


    //Background color stuff
    var randomColor = getRandomInt(0, colorsLength - 1);
    var newColorOk = false;
    
    //console.log('bg', $active.attr('data-bgColor'));
    
    //We want to make sure that the new background color is different than the current one
    while (!newColorOk) {
      randomColor = colors[getRandomInt(0, colorsLength - 1)];
      if (randomColor !== $active.attr('data-bgColor')) {
        newColorOk = true;
      }
    }
    
     $newTileTemp = $newTile.eq(c);
      c++;
      if(c==itemsLength){
        c=c-3;
      } else{
        $newTile = $newTileTemp;
      }

    $newTile.css({ background: randomColor });
    $newTile.attr({ 'data-bgColor': randomColor });

    $newTile.addClass('tile-item--new-active tile-item--new-active--' + transition);

    setTimeout(function () {
      $newTile.addClass('transition-in-' + transition);
      setTimeout(function () {
        $newTile.parent().find('.tile-item--active').removeClass('tile-item--active');
        $newTile.removeClass().addClass('tile-item tile-item--active');
      }, 250);
    }, 100);

    setTimeout(function () {
      changeTileItem($tile);
    }, randomTime);

  }

  $('.tile-block').each(function () {
   changeTileItem($(this));
  });

  //$('body').append('<div class="wip"></div>');

});




}