import Ember from 'ember';

export default Ember.Object.extend({
  firstName: null,
  lastName: null,
  nickName: null,
  age: null,
  authorOf: null,
  conferences: [],
  email: null,

  greet(){
    return "Hi, My name is " + this.get("firstName") + " " + this.get("lastName") + ". You can call me " + this.get("nickName");
  },

  isOld: Ember.computed("age", function(){
    return (this.get("age") > 30);
  }),

  wroteRuby: Ember.computed("authorOf", function(){
    return (this.get("authorOf") === "Ruby");
  }),

  addConference(conference){
    this.conferences.push(conference);
  },

  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    var conferences = this.get("conferences");
    var fullName = this.get("firstName") + " " + this.get("lastName");
    return conferences.filterBy("keyNote", fullName);
  }),

  conferenceNames: Ember.computed("conferences.@each.name", function(){
    var conferences = this.get("conferences");
    return conferences.map(function(conference){return conference.get("name");});
  }),

  conferenceTotal: Ember.computed.alias("conferences.length"),

  itinerary: Ember.computed("conferenceNames.[]", function(){
    return this.get("nickName") + " is speaking at " + this.get("conferenceNames.length") + " conferences"; 
  }),

  hasValidEmail: Ember.computed("email", function(){
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(this.get("email"));
  }),


  errors: Ember.computed("firstName", "lastName", "age", "hasValidEmail", function(){
    var errors = [];
    if (!this.get("firstName")) {
      errors.push("firstName cannot be blank");
    } 
    if (!this.get("lastName")) {
      errors.push("lastName cannot be blank");
    }
    if (!this.get("age")) {
      errors.push("age cannot be blank");
    } 
    if (!this.get("hasValidEmail")) {
      errors.push("email must be valid");
    } 
    return errors;
  }),

  hasErrors: Ember.computed("errors", function(){
    return (this.get("errors.length") > 0);
  }),

  isInvalid: Ember.computed("errors", function(){    
    return (this.get("hasErrors"));
  }),

  isValid: Ember.computed("errors", function(){
    return (!this.get("hasErrors"));
  })

});


