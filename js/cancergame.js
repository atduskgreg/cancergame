var Game = (function(){
  var daysLeft = 365 * 3;
  var secondsPerDay = 1;
  var clock;

  function showClock(element){
    var years = Math.floor(daysLeft/365);
    var days = daysLeft % 365;
    element.html(years + " years and " + days + " days left to live.");
  }

  return {
    getDaysElapsed : function(){
        return daysElapsed;
    },

    startClock : function(){
      setInterval(function(){
        daysLeft = daysLeft - 1;
        showClock(clock);
      }, 1000 * secondsPerDay);
    },



    setClockElement : function(element){
      clock = element;
      showClock(clock);
    }
  };
})();
