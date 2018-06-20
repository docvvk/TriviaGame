$(function(){
    var options = [
        {
            question: "How many countries are competing in 2018 World Cup?",
            choice: ["12", "21", "32", "45"],
            answer: 2,
            photo: "assets/images/giphy1.gif"
        },
        {
            question: "When is the World Cup 2018 final?",
            choice: ["August 15", "September 1", "July 1", "July 15"],
            answer: 3,
            photo: "assets/images/giphy2.gif"
        },
        {
            question: "What term describes how players are positioned in the field?",
            choice: ["Layout", "Formation", "Sequence", "Positions"],
            answer: 1,
            photo: "assets/images/giphy3.gif"
        },
        {
            question: "What is the distance between the penalty spot and the goal?",
            choice: ["5m", "36m", "20m", "11m"],
            answer: 3,
            photo: "assets/images/giphy13.gif"
        },
        {
            question: "How much will the winning team be awarded at this year's World Cup?",
            choice: ["$12 million", "$38 million", "$101 million", "$6 million"],
            answer: 1,
            photo: "assets/images/giphy5.gif"
        },
        {
            question: "Which country will host the 2022 World Cup?",
            choice: ["Qatar", "United States", "Italy", "Moeocco"],
            answer: 0,
            photo: "assets/images/giphy6.gif"
        },
        {
            question: "Which of these is an informal term for a goalkeeper?",
            choice: ["Shortstop", "Striker", "Goalie", "Defender"],
            answer: 2,
            photo: "assets/images/giphy7.gif"
        },
        {
            question: "Which country has the most World Cup wins?",
            choice: ["Germany", "Italy", "Brazil", "Spain"],
            answer: 2,
            photo: "assets/images/giphy8.gif"
        },
        {
            question: "In what year was the World Cup held in Africa for the first time?",
            choice: ["2010", "2002", "1998", "1990"],
            answer: 0,
            photo: "assets/images/giphy9.gif"
        },
        {
            question: "Which country will host the 2026 World Cup?",
            choice: ["France", "Africa", "Canada", "Mexico"],
            answer: 2,
            photo: "assets/images/giphy10.gif"
        },
        {
            question: "Which color card gets you sent off the field?",
            choice: ["Orange", "Yellow", "Red", "Purple"],
            answer: 2,
            photo: "assets/images/giphy11.gif"
        },
        {
            question: "How many substitutions is each team allowed to make?",
            choice: ["2", "unlimited", "1", "3"],
            answer: 3,
            photo: "assets/images/giphy12.gif"
        }];

        var correctCount = 0;
        var wrongCount = 0;
        var unanswerCount = 0;
        var timer = 30;
        var intervalId;
        var userGuess ="";
        var running = false;
        var qCount = options.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];
        var fifaSound = new Audio(src="assets/sounds/Coupe.mp3");

        
        $("#reset").hide();
        //click start button to start game
        $("#start").on("click", function () {
                fifaSound.play();
                $("#start").hide();
                displayQuestion();
                runTimer();
                for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
        });
       
        //timer starts
        function runTimer() {
            if(!running) {
                intervalId = setInterval(decrement, 1000);
                running = true;
            }
        }
        function decrement() {
            $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            timer --;
        
            //stop timer if reach 0
            if (timer === 0) {
                unanswerCount++;
                stop();
                $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }	
        }
        
        //timer stop
        function stop() {
            running = false;
            clearInterval(intervalId);
        }
        //randomly pick question in array if not already shown
        //display question and loop though and display possible answers
        function displayQuestion() {
            //generate random index in array
            index = Math.floor(Math.random()*options.length);
            pick = options[index];
        
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
        }
        
        
        
        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));
        
            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess="";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();
            } else {
                stop();
                wrongCount++;
                userGuess="";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        });
        }
        function hidepicture () {
            $("#answerblock").append("<img src=" + pick.photo + ">");
            newArray.push(pick);
            options.splice(index,1);
        
            var hidpic = setTimeout(function() {
                $("#answerblock").empty();
                timer= 30;
        
            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#timeleft").empty();
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();
            }
            }, 3000);
        }
        
        $("#reset").on("click", function() {
            $("#reset").hide();
            $("#answerblock").empty();
            $("#questionblock").empty();
            for(var i = 0; i < holder.length; i++) {
                options.push(holder[i]);
            }
            runTimer();
            displayQuestion();
        })
        
    })