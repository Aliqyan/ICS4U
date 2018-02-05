var types = ["bear", "turtle", "racoon",  "cat", "duck", "camel", "horse", "rooster"];
var numAnimals;// = Math.floor(Math.random() * 4 + 5);
var names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var animals;// = [];
var animIndexes;//\\ [];
var chosenAnimal = null; ////= null;
initializeHorses();
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

function chooseType(index){
	var type = types[Math.floor(Math.random() * types.length)];

	while(numAnimals >6 && index ===0 && (type === "rooster" || type ==="camel" || type === "horse")){
		type = types[Math.floor(Math.random() * types.length)];
	}
	return type;
}
function initializeHorses(){
	numAnimals = Math.floor(Math.random() * 4 + 5);
	animIndexes = [];
	chosenAnimal = null;
	animals = [];
	$("#displayAnimals").empty();
	for (var i = 0; i < numAnimals; i++) {
	    var tempAnim = {
	        type: chooseType(i),
	        name: horseName(), //horseName(),
	        ranking: (i===1)? 8:(Math.random()*4 + 1).toFixed(2),
	        clicked: false,
	        picNum:  Math.floor(Math.random()*8)+1,
	    };
	    animals.push(tempAnim);
	    var imgSrc = 'images/faces/' + tempAnim.type + tempAnim.picNum + 'face.png';

	    $("#displayAnimals").append("<div id = '" + tempAnim.name + "'><img class ='animHeadShot' src = '" + imgSrc + "'><h3>"
	    	 + tempAnim.name + "</h3><h4>"+tempAnim.type+"</h4><h4>"+tempAnim.ranking+"</h4></div>");

	    //top, right, bottom, left
	    $("#" +tempAnim.name + " img").css('clip', 'rect(0px, 100px, 20px, 0px)');

	    //e.currentTarget.id 
	    $("#" + tempAnim.name).hover(function(e) {
	        var curr = findAnimal(e.currentTarget.id);
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
	        //var clicks = $(this).data('clicks');
	        curr.clicked = !curr.clicked;

	        if (curr.clicked) {
	        	if(chosenAnimal !== null){
	        		chosenAnimal.clicked = false;
	        		clearAnimal(chosenAnimal.name);
	        	}
	        	chosenAnimal = curr;
	            $(this).css("background", "#CFCFCF");
	        } else {
	        	chosenAnimal = null;

	            $(this).css("background", "");
	        }
	    });
	    //$("#" + animals[i].name).addClass('animDisplay');
	    //$("#" + animals[i].name).css('background-image', 'url("images/bear.png")');
	}
}
