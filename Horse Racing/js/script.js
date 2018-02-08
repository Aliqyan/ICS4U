var bettingPlayer = 0;
var dialog, userForm, betForm;
var players = [];
var isBetting = false;
var aBetMade = false;
$(document).ready(function() {
     $("#start").button().on("click", function() {
            $("#users-contain").show();
            $("#start-screen").hide();
    });
    $("#users-contain").hide();
    $("#race-graphic").hide();
    $("#final-message").hide();
    $("#end-screen").hide();
    $("#background-opacity").hide();



});

function findPlayer(name){
    for (var i = 0; i < players.length; i++) {
        if (name == players[i].name) {
            return players[i];
        }
    }
}
    function initializeGamePlay(){
        // Base Screen
    $("#background-opacity").css("z-index", 1);
       isBetting = false;
        aBetMade = false;
        $("#users-contain").show();


        // hide canvas
        $("#race-graphic").hide();
        $("#create-user").button("option", "disabled", false);
        $("#begin-betting").button("option", "disabled", false);
        $("#begin-race").button("option", "disabled", true);
            $("#users tbody").empty();

        for(var i = 0; i<players.length; i++){
             $("#users tbody").append("<tr id ='" +players[i].name + "'>" + "<td>"+(i+1)+"</td>"+ "<td id = '" + players[i].name + "-name'>" 
                + players[i].name + "</td>" + "<td  id = '" + players[i].name + "-wallet'>" + "$" 
                + players[i].wallet + "</td>" + "<td id = '" + players[i].name + "-bet'> - </td>" + 
                "<td id = '" + players[i].name + "-animal'> - </td>" + "</tr>");
            players[i].bet = 0;
            players[i].reward = 0;

            players[i].animal = null;
 

            $("#" + players[i].name + "-name").click(function(e) {
                var curr = findPlayer(e.currentTarget.id.substring(0,e.currentTarget.id.length - 5));

                if (isBetting && curr.bet === 0) {
                    $("#bet-message").text("Welcome to the Magnificient Horse Parlour! Good luck " + curr.name + "!!!");
                    bettingPlayer = curr;
                    $("#background-opacity").show();
                    betDialog.dialog("open");
                }
            });
            $("#" + players[i].name).hover(function(e) {
                var curr = findPlayer(e.currentTarget.id);

                if (isBetting && curr.bet === 0) {
                    $(this).css("background", "#50808e");
                }
            }, function() {
                $(this).css("background", "");
            });
        }


    }
    var betAmount = $("#bet-amount");
    var playerName = $("#name"),
        //allFields = $( [] ).add( playerName ),
        //tips is the message: ie name can not have numbers...
    tips = $(".validateTips");
    addTestUsers("aliqyan");
    addTestUsers("rodin");
    addTestUsers("arun");
    
    /*
        //TESTING
        $("#users-contain").hide();
        race();
        $("#race-graphic").show();
        */


    function addTestUsers(n) {
        var curr = {
            name: n,
            wallet: 1000,
            bet: 0
        };
        players.push(curr);

            $("#users tbody").append("<tr id ='" + n + "'>" + "<td>"+players.length+"</td>"+"<td id = '" + n + "-name'>" + n 
              + "</td>" + "<td  id = '" + n + "-wallet'>" + "$" + curr.wallet + "</td>" 
              + "<td id = '" + n + "-bet'> - </td>" + "<td id = '" + n + "-animal'> - </td>" + "</tr>");
            $("#" + n + "-name").click(function() {
                if (isBetting && curr.bet === 0) {
                    $("#bet-message").text("Welcome to the Magnificient Horse Parlour! Good luck " + curr.name + "!!!");
                    bettingPlayer = curr;
                    $("#background-opacity").show();
                    betDialog.dialog("open");
                }
            });
            $("#" + curr.name).hover(function() {
                if (isBetting && curr.bet === 0) {
                    $(this).css("background", "#50808e");
                }
            }, function() {
                $(this).css("background", "");
            });

    }



    


    function updateTips(t) {
        tips.text(t).addClass("ui-state-highlight");
        setTimeout(function() {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function checkRange(bet, low, high, message){
        if(!(bet.val()>= low && bet.val()<=high)){
            bet.addClass("ui-state-error");
            updateTips(message);
            return false;
        }
        return true;
    }

    function isAnimChosen(bet, anim, message){
        if(anim === null){
          bet.addClass("ui-state-error");
            updateTips(message);
            return false;
        }
        return true;
    }
    function newUser(playerName, message){
      //
      for(var i = 0; i < players.length; i++){
        if(playerName.val().trim() === players[i].name){
          playerName.addClass("ui-state-error");
            updateTips(message);
            return false;
        }
      }
      return true;
    }
  
    function addUser() {

        var valid = true;
        //allFields.removeClass( "ui-state-error" );
        //valid = valid && checkLength( name, "username", 3, 16 );
        //valid = valid && checkLength( wallet, "wallet", 6, 80 );
        valid = valid && checkRegexp(playerName, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && newUser(playerName, "A player with that name already exists!");
        if (valid) {
            var curr = {
                name: playerName.val(),
                wallet: 1000,
                bet: 0
            };
            players.push(curr);
            $("#users tbody").append("<tr id ='" + playerName.val() + "'>" + "<td>"+players.length+"</td>"+ "<td id = '" + playerName.val() + "-name'>" 
                + playerName.val() + "</td>" + "<td  id = '" + playerName.val() + "-wallet'>" + "$" 
                + players[players.length - 1].wallet + "</td>" + "<td id = '" + playerName.val() + "-bet'> - </td>" + 
                "<td id = '" + playerName.val() + "-animal'> - </td>" + "</tr>");
            $("#" + playerName.val() + "-name").click(function() {
                if (isBetting && curr.bet === 0) {
                    $("#bet-message").text("Welcome to the Magnificient Horse Parlour! Good luck " + curr.name + "!!!");
                    bettingPlayer = curr;
                    $("#background-opacity").show();
                    betDialog.dialog("open");

                }
            });
            $("#" + curr.name).hover(function() {
                if (isBetting && curr.bet === 0) {
                    $(this).css("background", "#50808e");
                }
            }, function() {
                $(this).css("background", "");
            });

            playerDialog.dialog("close");
        }
        return valid;
    }

    var playerDialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function() {

                playerDialog.dialog("close");
            }
        },
        close: function() {
            $("#background-opacity").hide();

            userForm[0].reset();
            $(playerName).removeClass( "ui-state-error" );
        }
    });
    var betDialog = $("#bet-form").dialog({
        autoOpen: false,
        height: 690,
        width: 850,
        modal: true,
        buttons: {
            "Bet Time": processBet,
            Cancel: function() {
                betDialog.dialog("close");
            }
        },
        close: function() {
            $("#background-opacity").hide();
            betForm[0].reset();
            $(betAmount).removeClass( "ui-state-error" );
        }
    });
    var resultDialog = $("#final-message").dialog({
        autoOpen: false,
        height: 550,
        width: 400,
        modal: true,
        buttons: {
            "Continue": reset,
            "Quit": exit,
        },
        close: function() {
            $("#background-opacity").hide();
            //resultDialog[0].reset();
        }
    });

    var userForm = playerDialog.find("form").on("submit", function(event) {
        event.preventDefault();
        //addUser();
    });
    var betForm = betDialog.find("form").on("submit", function(event) {
        event.preventDefault();
        //processBet(bettingPlayer);
    });

    $("#create-user").button().on("click", function() {
            $("#background-opacity").show();

        playerDialog.dialog("open");
    });
    $("#begin-race").button().on("click", function() {
        if(aBetMade){
            $("#users-contain").hide();
            race();
            $("#race-graphic").show();  
        }else{
            $("#warning").fadeIn(1000);  
            $("#warning").text("***You must make a minimum of One Bet***");
            //alert("One Bet Minimum must be made!");
        }


    });

    $("#begin-race").button("option", "disabled", true);
    //begin bet
    $("#begin-betting").button().on("click", function() {
        isBetting = true;
        $("#instructHeader").text("Select a name to start Betting");
        $("#create-user").button("option", "disabled", true);
        $("#begin-race").button("option", "disabled", false);
        $("#begin-betting").button("option", "disabled", true);
        //betDialog.dialog( "open" );
    });

    function processBet() {

        var valid = true;
        valid = valid && checkRegexp(betAmount, /^\d+$/, "Bet may consist of 0-9");
        valid = valid && checkRange(betAmount, 1, bettingPlayer.wallet, "Bet must be between $1 and $" + bettingPlayer.wallet);
        valid = valid && isAnimChosen(betAmount, chosenAnimal, "You must Chose an animal!");

        if(valid ){
            bettingPlayer.bet = parseInt(betAmount.val());
            bettingPlayer.animal = chosenAnimal;
            chosenAnimal.clicked = false;
            clearAnimal(chosenAnimal.name);
            $("#" + bettingPlayer.name + "-bet").text("$" + betAmount.val());
            $("#" + bettingPlayer.name + "-wallet").text("$" + (bettingPlayer.wallet - bettingPlayer.bet));
            $("#" + bettingPlayer.name + "-animal").text(chosenAnimal.name);
            aBetMade = true;

            betDialog.dialog("close");
            //betAmount.val(0);
        }

    }

    function reset(){
        resultDialog.dialog("close");
        initializeGamePlay();
        initializeHorses();
        innitializeRace();

    }
    function exit(){
        resultDialog.dialog("close");
        $("#race-graphic").hide();
        $("#end-screen").show();

    }