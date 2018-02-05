var bettingPlayer = 0;
var dialog, userForm, betForm;
var players = [];
var isBetting = false;

$(document).ready(function() {
     $("#start").button().on("click", function() {
            $("#users-contain").show();
            $("#start-screen").hide();
    });
    $("#users-contain").hide();
    $("#race-graphic").hide();




});
    function initializeGamePlay(){
        // Base Screen
        console.log('init');
        isBetting = false;
        $("#users-contain").show();

        // hide canvas
        $("#race-graphic").hide();
        $("#create-user").button("option", "disabled", false);
        $("#begin-betting").button("option", "disabled", false);
        $("#begin-race").button("option", "disabled", true);

        for(var i = 0; i<players.length; i++){
            players[i].bet = 0;
            players[i].animal = null;
            $("#" + players[i].name + "-bet").text("0");
            $("#" + players[i].name + "-wallet").text( players[i].wallet);

        }


    }
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

            $("#users tbody").append("<tr id ='" + n + "'>" + "<td id = '" + n + "-name'>" + n 
              + "</td>" + "<td  id = '" + n + "-wallet'>" + "$" + curr.wallet + "</td>" 
              + "<td id = '" + n + "-bet'> 0 </td>" + "</tr>");
            $("#" + n + "-name").click(function() {
                if (isBetting && curr.bet === 0) {
                    $("#bet-message").text("Welcome to the Magnificient Horse Parlour! Good luck " + curr.name + "!!!");
                    bettingPlayer = curr;
                    console.log(curr.name + " :)")
                    betDialog.dialog("open");
                }
            });
            $("#" + curr.name).hover(function() {
                console.log(curr.name + "--> " + curr.bet);
                if (isBetting && curr.bet === 0) {
                    $(this).css("background", "#007fff");
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
        console.log(players);
        if (valid) {
            var curr = {
                name: playerName.val(),
                wallet: 1000,
                bet: 0
            };
            players.push(curr);
            $("#users tbody").append("<tr id ='" + playerName.val() + "'>" + "<td id = '" + playerName.val() + "-name'>" + playerName.val() + "</td>" + "<td  id = '" + playerName.val() + "-wallet'>" + "$" + players[players.length - 1].wallet + "</td>" + "<td id = '" + playerName.val() + "-bet'> 0 </td>" + "</tr>");
            $("#" + playerName.val() + "-name").click(function() {
                if (isBetting && curr.bet === 0) {
                    $("#bet-message").text("Welcome to the Magnificient Horse Parlour! Good luck " + curr.name + "!!!");
                    bettingPlayer = curr;
                    console.log(curr.name + " :)")
                    betDialog.dialog("open");
                }
            });
            $("#" + curr.name).hover(function() {
                console.log(curr.name + "--> " + curr.bet);
                if (isBetting && curr.bet === 0) {
                    $(this).css("background", "#007fff");
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
            userForm[0].reset();
            //allFields.removeClass( "ui-state-error" );
        }
    });
    var betDialog = $("#bet-form").dialog({
        autoOpen: false,
        height: 400,
        width: 1000,
        modal: true,
        buttons: {
            "Bet Time": processBet,
            Cancel: function() {
                betDialog.dialog("close");
            }
        },
        close: function() {
            betForm[0].reset();
            //allFields.removeClass( "ui-state-error" );
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
        playerDialog.dialog("open");
    });
    $("#begin-race").button().on("click", function() {
        $("#users-contain").hide();
        race();
        $("#race-graphic").show();

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
        console.log(bettingPlayer.name);
        var betAmount = $("#bet-amount");
        bettingPlayer.bet = betAmount.val();
        bettingPlayer.animal = chosenAnimal;
        console.log(bettingPlayer.animal);
        chosenAnimal.clicked = false;
        clearAnimal(chosenAnimal.name);
        $("#" + bettingPlayer.name + "-bet").text(betAmount.val());
        betDialog.dialog("close");
        //betAmount.val(0);
    }

    function reset(){
        initializeGamePlay();
        initializeHorses();
        innitializeRace();
    }