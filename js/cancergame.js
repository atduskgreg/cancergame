Treatment = function(name, game, onCompletion){
  this.name = "Doctor's Appointment";
  this.length = 30;
  this.startDay;
  this.game = game;
  this.onCompletion = onCompletion; // callback
  this.started = false;
}

Treatment.prototype = {
  start : function(){
    this.startDay = this.game.getDaysRemaining();
  },

  isStarted : function(){
      return this.startDay != undefined;
  },

  getRemainingDays : function(){
    return this.length - (this.startDay - this.game.getDaysRemaining());
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

        if(activeTreatment && activeTreatment.isStarted() && activeTreatment.getRemainingDays() <= 0){
          activeTreatment.onCompletion();
          activeTreatment = null;
        }
      }, 1000 * secondsPerDay);
    },

    setClockElement : function(element){
      clock = element;
      showClock(clock);
    }
  };
})();
