// function getTimeRemaining(endtime) {
//   var t = Date.parse(endtime) - Date.parse(new Date());
//   var seconds = Math.floor((t / 1000) % 60);
//   var minutes = Math.floor((t / 1000 / 60) % 60);
//   return {
//     'total': t,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// }
//
// function initializeClock(id, endtime) {
//   var clock = document.getElementById(id);
//   var minutesSpan = clock.querySelector('.minutes');
//   var secondsSpan = clock.querySelector('.seconds');
//
//   function updateClock() {
//     var t = getTimeRemaining(endtime);
//
//     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//     secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
//
//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   }
//
//   updateClock();
//   var timeinterval = setInterval(updateClock, 1000);
// }
//
// var deadline = new Date(Date.parse(new Date()) + 2 * 60 * 1000);
// initializeClock('clockdiv', deadline);

var countDownDate = new Date("Dec 31, 2018 15:37:25").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var sec = countDownDate - now;
  var seconds = Math.floor((sec % (1000 * 11)) / 1000);
  document.getElementById("questionTimer").innerHTML = "Seconds left: " + seconds;

   if (sec <= 1) {
     clearInterval(x);
     document.getElementById("questionTimer").innerHTML = "Times up";
}
 }, 1000);

function populate() {
  if(quiz.isEnded()) {
    showScores();
  }
  else {
    //show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text

    var choices = quiz.getQuestionIndex().choices;
    for(var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];

      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.questions.length;
}

function showScores() {
  var gameOverHtml = "<h1>Result</h1>";
      gameOverHtml += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
      var element = document.getElementById("quiz");
      element.innerHTML = gameOverHtml;
}

var questions = [
  new Question("What causes the different variations of colours of different stars?", ["Temperature", "Pressure", "Density", "Radiation from them"], "Temperature"),
  new Question("What is the fundamental scientific principle in the operation of a battery?", ["Acid-base interaction", "Dialysis", "Dissociation of electrolytes", "Oxidation-reduction"], "Dissociation of electrolytes"),
  new Question("If the length of a simple pendulum is halved then its period of oscillation is?", ["Doubled", "Halved", "Increased by a factor", "Decreased by a factor"], "Decreased by a factor"),
  new Question("Equilbruim is a condition that can...", ["Never Change", "Change only if some outside factor changes", "Change only if some internal factor changes", "change only if both factors are switched"], "Never change"),
  new Question("When two ice cubes are pressed over each other they unite to form one cube, because of...", ["Vander Waal's forces", "Dipole moment", "Hydrogen bond formation", "Covalent attraction"], "Hydrogen bond formation")
];

var quiz = new Quiz(questions);

populate();
