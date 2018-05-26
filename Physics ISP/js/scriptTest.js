var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.translate(0,284);   // Move (0,0) to (250, 250)
ctx.scale(1,-1);          // Make y grow up rather than down
var animalsize = 48;
var finishLine = 1075;
var isRacing = false;
var raceOver = false;
var winningAnimals = [];


var bField = 2;
var eField = 1;
var particle = {
  x: 400,
  y: 0,
  k: 1,
  m: 2,
  q: 1,
  r: 0,
  v: 40,
  aE: 0, // acceleration due to the efield.


};

$(document).ready(function() {
  $( function() {
    $( "#mass-slider" ).slider({
      range: "max",
      min: 0,
      max: 10,
      value: 2,
      slide: function( event, ui ) {
        $( "#mass" ).val( ui.value );
      }
    });
    $("#mass").keyup(function () {
      $("#mass-slider").slider("value", this.value);
    });
  });

  $( function() {
    $( "#charge-slider" ).slider({
      range: "max",
      min: -10,
      max: 10,
      value: 2,
      slide: function( event, ui ) {
        $( "#charge" ).val( ui.value );
      }
    });
    $("#charge").keyup(function () {
      $("#charge-slider").slider("value", this.value);
    });
  });

  $( function() {
    $( "#e-field-mag-slider" ).slider({
      range: "max",
      min: -100000,
      max: 100000,
      value: 2,
      slide: function( event, ui ) {
        $( "#e-field-mag" ).val( ui.value );
      }
    });
    $( "#e-field-mag" ).val( $( "#e-field-mag-slider" ).slider( "value" ) );
    $("#e-field-mag").keyup(function () {
      $("#e-field-mag-slider").slider("value", this.value);
    });
  });

  $( function() {
    $( "#b-field-mag-slider" ).slider({
      range: "max",
      min: -5,
      max: 5,
      value: 2,
      slide: function( event, ui ) {
        $( "#b-field-mag" ).val( ui.value );

      }
    });
    $( "#b-field-mag" ).val( $( "#b-field-mag-slider" ).slider( "value" ) );
    $("#b-field-mag").keyup(function () {
      $("#b-field-mag-slider").slider("value", this.value);
    });
  });
});


calculate();
draw();
var start = new Date().getTime();

function drawParticle() {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function updateParticle(){
  var now = new Date().getTime();
  var t = (now - start)/500;

  particle.x = particle.r*Math.cos( particle.k*t) + 400;
  particle.y = particle.r*Math.sin( particle.k*t) + (particle.aE *Math.pow(t,2))/(2*particle.m);

}

function calculate(){
  if(particle.q!=0 && bField != 0){
    particle.r = (particle.m * particle.v)/(particle.q * bField);
    particle.k = particle.v/particle.r;
    console.log(particle.r + ',' + particle.k);
  }
  particle.aE = (particle.q *eField)/particle.m;

}
function draw() {
    //ctx.clearRect(-100, -100, canvas.width, canvas.height);
    drawParticle();
    updateParticle();
}
var timer = setInterval(draw,20);

