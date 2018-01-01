$(document).ready(function() {
  setTimeout(function() {
    $('#start_button').click();
  }, .1);

$.fn.trivia = function() {
    var _g = this;
    _g.userInput = null;
    _g.answers = {
        correct: 0,
        incorrect: 0
    };
    _g.count = 30;
    _g.current = 0;
    _g.questions = [{
        question: "What causes the different variations of colours of different stars?",
        choices: ["Temperature", "Pressure", "Density", "Radiation from them"],
        correct: 0
    }, {

        question: "What is the fundamental scientific principle in the operation of a battery?",
        choices: ["Acid-base interaction", "Dialysis", "Dissociation of electrolytes", "Oxidation-reduction"],
        correct: 2

    }, {
        question: "If the length of a simple pendulum is halved then its period of oscillation is?",
        choices: ["Doubled", "Halved", "Increased by a factor", "Decreased by a factor"],
        correct: 3

    }, {
        question: "Equilbruim is a condition that can...",
        choices: ["Never Change", "Change only if some outside factor changes", "Change only if some internal factor changes", "change only if both factors are switched"],
        correct: 0

    }, {
        question: "When two ice cubes are pressed over each other they unite to form one cube, because of...",
        choices: ["Vander Waal's forces", "Dipole moment", "Hydrogen bond formation", "Covalent attraction"],
        correct: 2
    }];

    _g.ask = function() {
        if (_g.questions[_g.current]) {
            $("#timer").html("Time remaining: " + "00:" + _g.count + " secs");
            $("#question_div").html(_g.questions[_g.current].question);
            var choicesArr = _g.questions[_g.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_g.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _g.questions.length - (_g.answers.correct + _g.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Play Again?').appendTo('body').show();
        }
    };
    _g.timer = function() {
        _g.count--;
        if (_g.count <= 0) {
            setTimeout(function() {
                _g.nextQ();
            });

        } else {
            $("#timer").html("You have: " + "00:" + _g.count + " secs");
        }
    };
    _g.nextQ = function() {
        _g.current++;
        clearInterval(window.triviaCounter);
        _g.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _g.cleanUp();
            _g.ask();
        }, 1000)
    };
    _g.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _g.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _g.answers.incorrect);
    };
    _g.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _g.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _g.answers[string]);
    };
    return _g;
};

var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userInput = $(this).data("id"),
        _g = Trivia || $(window).trivia(),
        index = _g.questions[_g.current].correct,
        correct = _g.questions[_g.current].choices[index];

    if (userInput !== index) {
        $('#choices_div').text("You wish...the correct answer was: " + correct);
        _g.answer(false);
    } else {
        $('#choices_div').text("Sure, why not...correct answer is: " + correct);
        _g.answer(true);
    }
    _g.nextQ();
});
});
