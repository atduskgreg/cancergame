Treatment = function(name, game, callback){
  this.name = "Doctor's Appointment";
  this.length = 30;
  this.startDay;
  this.game = game;
  this.callback = callback; // callback
  this.started = false;
  this.element;
  this.benefit = 0;
  this.failed = false;
}

Treatment.prototype = {
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
    this.game.addTime(this.benefit);
    this.callback();
  }
}

var Game = (function(){
  var daysLeft = 365 * 3;
  var secondsPerDay = 1;
  var clock;
  var activeTreatment;

  function showClock(element){
    var years = Math.floor(daysLeft/365);
    var days = daysLeft % 365;
    element.html(years + " years and " + days + " days left to live.");
  }

  return {
    addTime : function(days){
        daysLeft = daysLeft + days;
    },

    setActiveTreatment : function(treatment){
        activeTreatment = treatment;
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
