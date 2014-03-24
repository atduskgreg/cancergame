Symptom = function(description){
  this.description = description;
}

Symptom.prototype = {
  setDisplay : function(element){
    this.element = element;
    this.draw();
  },

  draw : function(){
    this.element.html("<p>"+ this.description +"</p>");
  }

}

Treatment = function(game, args, callback){
  this.message = args.message;
  this.name = args.name;
  this.length = args.length;
  this.startDay;
  this.game = game;
  this.callback = callback; // callback
  this.started = false;
  this.element;
  this.benefit = args.benefit;
  this.failed = false;
  this.symptoms = args.symptoms;
  this.prognosis = args.prognosis;
  this.dependencies = [];
  this.complete = false;

}

Treatment.prototype = {
  isAvailable : function(){
    result = true;
    for(d in this.dependencies){
        if(this.dependencies[d].complete){
          result = this.dependencies[d].isAvailable();
        } else {
          result = false;
        }
    }

    return result;
  },

  calculateBenefit : function(baseAmt, chanceOfFailure, range){
    if(Math.random() > chanceOfFailure){
      this.benefit = baseAmt + Math.round(range*Math.random() - range/2);
    } else {
      this.benefit = 0;
      this.failed = true;
    }
  },

  start : function(){
    this.startDay = this.game.getDaysRemaining();
  },

  isStarted : function(){
    return this.startDay != undefined;
  },

  getRemainingDays : function(){
    return this.length - (this.startDay - this.game.getDaysRemaining());
  },

  setDisplay : function(element){
    this.element = element;
  },

  draw : function(){
    this.element.html("<h4>"+ this.name +"</h4><p>"+this.getRemainingDays()+" days remaining</p>");
  },

  onUpdate : function(){
    this.draw();
  },


  onCompletion : function(){
    this.element.empty();
    this.complete = true;
    this.game.addTime(this.benefit);
    this.game.showMessage(this.name, this.message);
    if(this.prognosis != undefined){
      game.setDaysRemaining(this.prognosis);
    }
    this.callback();
  }
}

var Game = (function(){
  var daysLeft = 365 * 60;
  var secondsPerDay = 1;
  var clock;
  var activeTreatment;
  var messageDisplay;

  function showClock(element){
    var years = Math.floor(daysLeft/365);
    var days = daysLeft % 365;
    element.html(years + " years and " + days + " days left to live.");
  }

  return {
    showMessage : function(title,msg){
      messageDisplay.html("<h4>"+title+"</h4><p>"+msg+"</p><a id='msgOk' href='#'>OK</a>");
      $("#msgOk").click(function(e){
        $("#message").hide();
        e.preventDefault();
      });
      messageDisplay.show();
    },

    setDaysRemaining : function(days){
      daysLeft = days;
    },

    addTime : function(days){
      daysLeft = daysLeft + days;
    },

    setActiveTreatment : function(treatment){
        activeTreatment = treatment;
    },
    setMessageElement : function(element){
      messageDisplay = element;
    },

    getDaysRemaining : function(){
        return daysLeft;
    },

    startClock : function(){
      setInterval(function(){
        daysLeft = daysLeft - 1;
        showClock(clock);
        if(activeTreatment &&  activeTreatment.isStarted()){
          activeTreatment.onUpdate();

          if(activeTreatment.getRemainingDays() <= 0){
            activeTreatment.onCompletion();
            activeTreatment = null;
          }
        }
      }, 1000 * secondsPerDay);
    },

    setClockElement : function(element){
      clock = element;
      showClock(clock);
    }
  };
})();
