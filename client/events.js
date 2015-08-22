Template.login.events({
	'click #login':function(evt,tmpl){
		evt.preventDefault();
		var userName=tmpl.find('#login-username').value;
		var passWord=tmpl.find('#login-password').value;
		Meteor.loginWithPassword(userName,passWord);
		Router.go('/dashboard');
	}
});
Template.register.events({
	'click #register':function(evt,tmpl){
		evt.preventDefault();
		var userName=tmpl.find('.username').value;
		var passWord=tmpl.find('.password').value;
		
		Accounts.createUser({username: userName, password: passWord}, function(err) {
		  if (err){
		    console.log(err);
		}
		  else{
		    console.log('success!');
			Router.go('/dashboard');}
		});
		
	}
});


Template.home.events({

    'click #del': function(event) {
        event.preventDefault();
        Meteor.call("removeAlltweets",function(err){
      console.log('removed tweets');
    });
    //        Meteor.call("removeAllinsta",function(err){
    //   console.log('removed insta');
    // });
    }

});
Template.dashboard.events({
	  'click #del': function(event) {
        event.preventDefault();
        Meteor.call("removeAlltweets",function(err){
      console.log('removed tweets');
    });
    //        Meteor.call("removeAllinsta",function(err){
    //   console.log('removed insta');
    // });
    },
'click #logout':function(evt){
		evt.preventDefault();
		Meteor.logout();
	},
    	'click #remove':function(evt,tmpl){
			evt.preventDefault();
			var id=this._id;
			console.log(id);
			Tweets.remove({_id:id});
	}
})