var types = ["bear", "turtle", "racoon"]; //"camel", "cat", "duck", "horse", "racoon", "rooster", ];
var numAnimals = Math.floor(Math.random() * 4 + 5);
var names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var animals = [];
var animIndexes = [];
var chosenAnimal = null;
function chosen(index) {
    for (var i = 0; i < animIndexes.length; i++) {
        if (index === animIndexes[i]) {
            return false;
        }
    }
    return true;
}

function horseName() {
    var currIndex = Math.floor(Math.random() * 26);
    while (!chosen(currIndex)) {
        currIndex = Math.floor(Math.random() * 26);
    }
    animIndexes.push(currIndex);
    return names[currIndex];
}

function findAnimal(name) {
    for (var i = 0; i < animals.length; i++) {
        if (name == animals[i].name) {
            return animals[i];
        }
    }
}

function clearAnimal(name){
	$("#" + name).css("background", "");
}

for (var i = 0; i < numAnimals; i++) {
    var tempAnim = {
        type: types[Math.floor(Math.random() * types.length)],
        name: horseName(), //horseName(),
        ranking: 5,
        clicked: false,
    };
    animals.push(tempAnim);
    console.log(tempAnim.name);
    var imgSrc = 'images/' + tempAnim.type + 'Face.png';

    $("#displayAnimals").append("<div id = '" + tempAnim.name + "'><img class ='animHeadShot' src = '" + imgSrc + "'></div>");
    //e.currentTarget.id 
    $("#" + tempAnim.name).hover(function(e) {
        var curr = findAnimal(e.currentTarget.id);
        console.log(e.currentTarget.id);
        if (!curr.clicked) {
            $(this).css("background", "#007fff");
        }
    }, function(e) {
    	var curr = findAnimal(e.currentTarget.id);

        if (!curr.clicked) {
            $(this).css("background", "");
        }
    });


    $("#" + tempAnim.name).click(function(e) {
        var curr = findAnimal(e.currentTarget.id);
        //console.log("-->" + result.name);
        //var clicks = $(this).data('clicks');
        curr.clicked = !curr.clicked;

        if (curr.clicked) {
        	console.log('go')
        	console.log('--> ' + e.currentTarget.id)
        	if(chosenAnimal !== null){
        		console.log()
        		chosenAnimal.clicked = false;
        		clearAnimal(chosenAnimal.name);
        	}
        	chosenAnimal = curr;
            $(this).css("background", "#CFCFCF");
        } else {
            $(this).css("background", "");
        }
    });
    //$("#" + animals[i].name).addClass('animDisplay');
    //$("#" + animals[i].name).css('background-image', 'url("images/bear.png")');
}

