//  click on button and go to the first question
$(document).ready(function() {

  $("#random-button").click(function() {

    // remove all content of jumbotron once button is clicked
    $("#TextIntro").remove();

    // creation of div for highscore and timer
    var headerInfo = $("<div>");
    $("body").prepend(headerInfo);
    var highScores = $("<p>").text("View HighScores");
    $(headerInfo).append(highScores);
    highScores.attr("id", "mainhighScores");
    var TimeLeft = ""; // time left on the clock variable
    var timerClock = $("<p>").text("Time:" + TimeLeft);
    $(headerInfo).append(timerClock);


    // add a new div with title
    var newDivQuestion = $("<div>");
    // add an element for the list of questions
    var newOl = $("<ol>");

    $(".jumbotron").append(newDivQuestion);
    $(".jumbotron").append(newOl);
    newDivQuestion.attr("style", "font-weight: bold");
    newDivQuestion.attr("id", "mainDiv");
    newDivQuestion.text("Commonly used data types DO NOT include:"); 

    // 4 buttons for the answer buttons
    var button1 = $("<button>").text("1. strings"); 
    var button2 = $("<button>").text("2. booleans");
    var button3 = $("<button>").text("3. alerts");
    var button4 = $("<button>").text("4. numbers");
    
    newOl.attr("id", "mainOl");     

    var newHighScore = {};
    var numberHighScores = 0;

    // add success / fail message
    var responseMessage = $("<p>").text(""); 
    $(".jumbotron").append(responseMessage); 
    responseMessage.attr("id", "mainParagraph");  

    button1.attr("id", "firstButton");
    button1.addClass("button");
    button2.attr("id", "secondButton");
    button2.addClass("button");
    button3.attr("id", "thirdButton");
    button3.addClass("button");
    button4.attr("id", "fourthButton");
    button4.addClass("button");
    
    $(newOl).append(button1, button2, button3, button4);

    var questionNumber = 1; // we start at 1 because when we are using this variable question 1 will have already been answered
    var totalScore = 0; // keep track of the score

    // this is where the questions are modified after first question is answer (and this is why there is no case 1)
    function newQuestion(questionNumber) {
      switch (questionNumber) {
        case 2:
          $(newDivQuestion).text("The condition in an if / else statement is enclosed within _______."); 
          button1.text("1. quotes");
          button2.text("2. curly brackets");
          button3.text("3. parantheses"); 
          button4.text("4. square brackets"); 
          break;
        case 3:
        $(newDivQuestion).text("Arrays in JavaScript can be used to store _____."); 
          button1.text("1. numbers and strings");
          button2.text("2. other arrays");
          button3.text("3. booleans"); 
          button4.text("4. all of the above"); 
          break;
        case 4:
        $(newDivQuestion).text("String values must be enclosed within ______ when being assigned to variables."); 
          button1.text("1. commas");
          button2.text("2. curly brackets");
          button3.text("3. quotes"); 
          button4.text("4. parentheses"); 
          break;
        case 5:
        $(newDivQuestion).text("A very useful tool used during development and debugging for printing content to the debugger is:"); 
          button1.text("1. JavaScript");
          button2.text("2. terminal / bash");
          button3.text("3. for loops"); 
          button4.text("4. console.log"); 
          break;
        case 6:
        // calls function to show final score after 5 questions are answered
          allDone();
          break;
      }
    };

    // screen change once all questions have been answered
    function allDone() {
      $("#mainOl").remove();
      
      $(newDivQuestion).text("All done!");
      responseMessage.text("Your final score is " + totalScore + ".");
      responseMessage.stop();

      var enterInitials = $("<p>").text("Enter initials:"); 
      $(".jumbotron").append(enterInitials); 
      enterInitials .attr("id", "mainInitials");

      var inputBoxName = $("<input type=\"text\" id=\"fieldname\" />");
      $(".jumbotron").append(inputBoxName); 
      
      var submitButton = $("<button>").text("Submit"); 
      submitButton.attr("id", "buttonHS");
      submitButton.addClass("buttonHighScore");
      $(".jumbotron").append(submitButton); 

      // capture the name once name is given in the input box 
      $(".buttonHighScore").on("click", function(event) {
        var inputBoxNameActual = $(inputBoxName).val();
        numberHighScores ++;
        newHighScore = { "ActualName" : inputBoxNameActual, "Score" : totalScore};      
        
        console.log(numberHighScores);
        console.log(newHighScore);

        // show highscore screen
        HighScoresScreen();
      });
    }

    // if "view HighScores is hit on the screen we show highscores"
    $("#mainhighScores").on("click", function() {
        HighScoresScreen();
    });

    function HighScoresScreen(){

    // remove former information
        $(mainDiv).remove();
        $("#mainInitials").remove();
        $("#mainParagraph").remove();
        $(fieldname).remove();
        $(buttonHS).remove();
        

        var highScoreTitle = $("<div>");
        $(".jumbotron").append(highScoreTitle);
        highScoreTitle.attr("style", "font-weight: bold");  
        $(highScoreTitle).text("Highscores");

        var scoreOl = $("<ol>");
        scoreOl.attr("id", "scoreOlId"); 
        $(".jumbotron").append(scoreOl);

        console.log(numberHighScores);

        for (i=0; i<numberHighScores;i++) {
            var listHighScore = $("<li>").text(i+1 + " - " + newHighScore["ActualName"] + " - Score: " + newHighScore["Score"]); 
            $(".jumbotron").append(listHighScore);
        }

        // 2 buttons for go back and clear
        var buttonBack = $("<button>").text("Go Back"); 
        var buttonClear = $("<button>").text("Clear Highscores");
        
        buttonBack.attr("id", "backToMainPage");
        buttonBack.addClass("backToMainPage");
        buttonClear.attr("id", "clearHighScores");
        buttonClear.addClass("clearHighScores");
        
        $(".jumbotron").append(buttonBack, buttonClear);

        $("#clearHighScores").click("click", function(event) {
            $("#scoreOlId").empty;
        });
        
    }

    
    $("#backToMainPage").click("click", function(event) {
        newQuestion();
    });
    

    // Called function once one answer is clicked => generates a fading message if right or wrong
    $(".button").on("click", function(event) {
      var buttonclicked = this.id;
      

      switch (buttonclicked){

        case "firstButton":
          responseMessage.text("Wrong!");
          responseMessage.show();
          responseMessage.fadeOut(600);  
        break;

        case "secondButton":
          responseMessage.text("Wrong!");
          responseMessage.show();
          responseMessage.fadeOut(600); 
        break;

        case "thirdButton":
          if (questionNumber===1 || questionNumber===2 || questionNumber===4)  {
            responseMessage.text("Correct!");
            totalScore++;
            responseMessage.show();
            responseMessage.fadeOut(600); 


          }  else {
            responseMessage.text("Wrong!");
            responseMessage.show();
            responseMessage.fadeOut(600); 
          }
        break;

        case "fourthButton":
        if (questionNumber===3 || questionNumber===5)  {
          responseMessage.text("Correct!");
          totalScore++;
          responseMessage.show();
          responseMessage.fadeOut(600); 
          }  else {
          responseMessage.text("Wrong!");
          responseMessage.show();
          responseMessage.fadeOut(600); 
          }
        break;  
      } 
      
      questionNumber++;
      // Moves on to the next question until reach the end of the questions
      newQuestion(questionNumber);
    });

  });

});