Comments = new Mongo.Collection("comments");


if (Meteor.isClient) {

    Accounts.ui.config({
      passwordSignupFields: "USERNAME_AND_EMAIL"
    });

    Template.discussion.helpers({
    comments: function () {
      return Comments.find({}, {sort: {createdAt: -1}});
    },
    currentTime: function(createdAt){
      return moment(createdAt).fromNow();
    }
  });
    Template.discussion.events({
    "submit .new-comment": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var comment = event.target.comment.value;
      var createdAt = new Date();
  
      // Insert a task into the collection
      Comments.insert({
        comment: comment,
        createdAt: new Date(),            // current time
        username : Meteor.user().username,
        actualTime: moment(createdAt).fromNow()
      });
 
      // Clear form
      event.target.comment.value = "";
    }

  });


}

