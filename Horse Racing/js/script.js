var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
$(document).ready(function(){
  // Base Screen
      $("#data-entry").hide();

  $( "#start" ).button().on( "click", function() {
      $("#data-entry").show();
    });
  //


    // hide canvas
    $("#race-graphic").hide();
    var bettingPlayer = 0;
    var dialog, userForm,betForm,
      
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      players = [];
      playerName = $( "#name" ),
      //allFields = $( [] ).add( playerName ),
      //tips is the message: ie name can not have numbers...
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var curr = {name: playerName.val(), wallet: 1000, bet: 0};
      players.push(curr);
      var valid = true;
      //allFields.removeClass( "ui-state-error" );
 
      //valid = valid && checkLength( name, "username", 3, 16 );
      //valid = valid && checkLength( wallet, "wallet", 6, 80 );
 
      valid = valid && checkRegexp( playerName, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
 
      if ( valid ) {
        $( "#users tbody" ).append( "<tr id ='" + playerName.val() + "'>" +
          "<td id = '"+playerName.val()+"-name'>" + playerName.val() + "</td>" +
          "<td  id = '"+playerName.val()+"-wallet'>" + "$" + players[players.length-1].wallet + "</td>" + "<td id = '"+playerName.val()+"-bet'> 0 </td>" + 
        "</tr>" );

        $("#" + playerName.val() + "-name").click(function() {

          if(isBetting && curr.bet === 0){
             $("#bet-message").text("Welcome to the Magnificient Horse Parlour! Good luck " + curr.name + "!!!");
              bettingPlayer = curr;
              console.log(curr.name+" :)")

              betDialog.dialog( "open" );
          }
        });

        $("#" + curr.name).hover(function(){
          console.log(curr.name + "--> " + curr.bet);
          if(isBetting && curr.bet === 0){
            $(this).css("background", "#007fff");
          }
        },
        function(){
            $(this).css("background", "");
        });
      playerDialog.dialog( "close" );

      }
      return valid;
    }

 
    var playerDialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Create an account": addUser,
        Cancel: function() {
          playerDialog.dialog( "close" );
        }
      },
      close: function() {
        userForm[ 0 ].reset();
        //allFields.removeClass( "ui-state-error" );
      }
    });

    var betDialog = $( "#bet-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 1000,
      modal: true,
      buttons: {
        "Bet Time": processBet,
        Cancel: function() {
          betDialog.dialog( "close" );
        }
      },
      close: function() {
        betForm[ 0 ].reset();
        //allFields.removeClass( "ui-state-error" );
      }
    });
 
    var userForm = playerDialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      //addUser();
    });
    var betForm = betDialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      //processBet(bettingPlayer);
    });

 
    $( "#create-user" ).button().on( "click", function() {
      playerDialog.dialog( "open" );
    });
    var isBetting = false;
    //begin bet
     $( "#begin-betting" ).button().on( "click", function() {
      isBetting = true;
      $("#instructHeader").text("Select a name to start Betting");
      //betDialog.dialog( "open" );
    });
    function processBet(){
      console.log(bettingPlayer.name);
        var betAmount = $("#bet-amount");
        bettingPlayer.bet = betAmount.val();
        $("#" + bettingPlayer.name + "-bet").text(betAmount.val());
        betDialog.dialog( "close" );
        //betAmount.val(0);
    }

});


var i = 0;
var allBears = [
    //grey
    {
        x: 56,
        y: 120,
        xPos: 10,
        yPos: 100,
        type: 0,
        high: 30,
        low: 0,
    },
    //polar
    {
        x: 56,
        y: 120,
        xPos: 10,
        yPos: 200,
        type: 1,
        high: 30,
        low: 0,
    },
    //panda
    {
        x: 56,
        y: 120,
        xPos: 10,
        yPos: 300,
        type: 2,
        high: 30,
        low: 0,
    },
    //grizzly
    {
        x: 56,
        y: 120,
        xPos: 10,
        yPos: 400,
        type: 3,
        high: 30,
        low: 0,
    }
];

function drawBear(bear) {
    var img = new Image();
    img.src = 'images/bears.png';
    if (bear.xPos < canvas.width) {
        bear.xPos += (bear.high - bear.low) * Math.random() + bear.low;
        height = 48;
        width = img.width / 12;
        i++;
        if (i > 21) {
            i = 0;
        }
        var c = 0;
        if (i > 10) {
            c = 2;
        } else if (i > 5) {
            c = 1;
        }
        ctx.drawImage(img, (bear.type * 3 + c) * bear.x, bear.y, width, height, bear.xPos, bear.yPos, 90, 45);
    }
    //}
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let bear of allBears) {
        drawBear(bear);
    }
}
setInterval(draw, 80);