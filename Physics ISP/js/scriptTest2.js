var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.translate(0,284);   // Move (0,0) to (250, 250)
ctx.scale(1,-1);          // Make y grow up rather than down
var animalsize = 48;
var finishLine = 1075;
var isRacing = false;
var raceOver = false;
var winningAnimals = [];
var interval;
var start;
var bField = 2;
var eField = 0;
var particle = {
  prevX: 0,
  prevY: 0,
  x: 0,
  y: 0,
  velX: 0,
  velY: 0,
  accE: 0, // acceleration due to the efield.
  accB: 0,
  accX: 0,
  accY: 0,
  k: 0,
  m: 1,
  q: 1,
  r: 0,
  v: 40,


};

$(document).ready(function() {
  //mass
    $( "#mass-slider" ).slider({
      range: "max",
      min: 0,
      max: 10,
      value: 10,
      slide: function( event, ui ) {
        $( "#mass" ).val( ui.value );
        particle.m = ui.value;
      }
    });
    $( "#mass" ).val( $("#mass-slider" ).slider( "value" ) );
    particle.m = ($( "#mass-slider" ).slider( "value" ));
    $("#mass").keyup(function () {
      $("#mass-slider").slider("value", this.value);
      particle.m = parseInt(this.value);
    });

  //charge
    $( "#charge-slider" ).slider({
      range: "max",
      min: -10,
      max: 10,
      value: 2,
      slide: function( event, ui ) {
        $( "#charge" ).val( ui.value );
        particle.q = ui.value;
      }
    });
    $( "#charge" ).val( $( "#charge-slider" ).slider( "value" ) );
    particle.q = ($( "#charge-slider" ).slider( "value" ));
    $("#charge").keyup(function () {
      $("#charge-slider").slider("value", this.value);
      particle.q = parseInt(this.value);

    });

  //velocity
    $( "#velocity-slider" ).slider({
      range: "max",
      min: 0,
      max: 100,
      value: 10,
      slide: function( event, ui ) {
        $( "#velocity" ).val( ui.value );
        particle.v = ui.value;
      }
    });
    $( "#velocity" ).val( $( "#velocity-slider" ).slider( "value" ) );
    particle.v = ($( "#velocity-slider" ).slider( "value" ));
    $("#velocity").keyup(function () {
      $("#velocity-slider").slider("value", this.value);
      particle.v = parseInt(this.value);

    });

  //e-field
    $( "#e-field-mag-slider" ).slider({
      range: "max",
      min: -20,
      max: 20,
      value: 2,
      slide: function( event, ui ) {
        $( "#e-field-mag" ).val( ui.value );
        eField = ui.value;
      }
    });
    $( "#e-field-mag" ).val( $( "#e-field-mag-slider" ).slider( "value" ) );
    eField = $( "#e-field-mag-slider" ).slider( "value" );
    $("#e-field-mag").keyup(function () {
      $("#e-field-mag-slider").slider("value", this.value);
      eField = parseInt(this.value);
    });
  
  //b-field
    $( "#b-field-mag-slider" ).slider({
      range: "max",
      min: -5,
      max: 5,
      value: 2,
      slide: function( event, ui ) {
        $( "#b-field-mag" ).val( ui.value );
        bField = ui.value;
        updateBField(ui.value);
      }
    });
    $( "#b-field-mag" ).val( $( "#b-field-mag-slider" ).slider( "value" ) );
    bField = $( "#b-field-mag-slider" ).slider( "value" );
    updateBField($( "#b-field-mag-slider" ).slider( "value" ));
    $("#b-field-mag").keyup(function () {
      $("#b-field-mag-slider").slider("value", this.value);
        bField = parseInt(this.value);
        updateBField(this.value);
    });

  //button
    $( "#reset" ).button().on("click", function(){
      console.log(particle);
      console.log("E-Field: " + eField);
      console.log("B-Field: " +bField);
      clearInterval(interval);
      particle.x = 0;
      particle.y = 0;
      wasIn = false;
      $(canvas).setLayer('particle', {
        x: 0,
        y: 0,
      }).drawLayers();
    });

     $( "#start" ).button().on("click", function(){
      start = new Date().getTime();
      interval = setInterval(updateParticle, 1);

    });

});


calculate();
drawBField();
drawElecCharges();
//draw();


$(canvas).drawArc({
  layer: true,
  name: 'particle',
  fillStyle: '#0095DD',
  x: 0, y: 0,
  radius: 5
});

$(canvas).drawRect({
  layer: true,
  name: 'plate1',
  index: 0,
  fillStyle: '#000',
  x: 500, y: 250,
  width: 600,
  height: 40
});

$(canvas).drawRect({
  layer: true,
  name: 'plate2',
  index: 0,
  fillStyle: '#000',
  x: 500, y: -250,
  width: 600,
  height: 40
});




/*
function drawParticle() {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}*/
var enterBField;
var wasIn = false;
var lastX;
var lastY;
function updateParticle(){
  var now = new Date().getTime();
  var t = (now - start)/500;
  calculate();
  if(particle.x > 200){
    wasIn = true;
    particle.x += particle.velX;
    particle.y += particle.velY
    var angle = Math.atan2(particle.velY, particle.velX);
    particle.velX +=  particle.accB*Math.cos(angle + Math.PI/2);
    particle.velY +=  particle.accB*Math.sin(angle + Math.PI/2) + particle.accE;
  }else{
    if(wasIn){
      particle.x += particle.velX;//particle.x - particle.prevX;
      particle.y += particle.velY; //particle.y - particle.prevY;
    }else{
      particle.velX = particle.v;
      particle.x += particle.v;
    }

  }
  /*if(particle.x> 200){
    wasIn = true;
    var adjTime = t - enterBField;
    particle.x = particle.r*Math.cos( particle.k*adjTime + (3/2) * Math.PI) + 200;
    particle.y = particle.r*Math.sin( particle.k*adjTime + (3/2) * Math.PI) + (particle.aE *Math.pow(t,2))/(2*particle.m) + particle.r; 

    lastX =  particle.x- particle.prevX;
    lastY = particle.y - particle.prevY ;
    particle.prevX = particle.x;
    particle.prevY = particle.y;
  }else{
    if(wasIn){
      particle.x += lastX;//particle.x - particle.prevX;
      particle.y += lastY; //particle.y - particle.prevY;
      console.log(particle.x)
    }else{
     particle.x = particle.v * (t);
     enterBField = t;
    }

  }
  //prevt = t;
  //console.log(t)
  */
  $(canvas).setLayer('particle', {
    x: particle.x,
    y: particle.y
  }).drawLayers();


}

function calculate(){
  var forceB = particle.q*particle.v*bField;
  particle.accB = forceB/particle.m;

  var forceE = particle.q*eField;
  particle.accE = forceE/particle.m;




}

var prev = "";
function updateBField(val){
  if(prev != "zero" && val === 0){
    prev = "zero";
    $(canvas).setLayerGroup('bFieldOut', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('bFieldIn', {visible: false}).drawLayers();
  }else if(prev != "out" && val> 0){
    prev = "out";
    $(canvas).setLayerGroup('bFieldOut', {visible: true}).drawLayers();
    $(canvas).setLayerGroup('bFieldIn', {visible: false}).drawLayers();
  }else if(prev !== "in" && val<0){
    prev = "in";
    $(canvas).setLayerGroup('bFieldIn', {visible: true}).drawLayers();
    $(canvas).setLayerGroup('bFieldOut', {visible: false}).drawLayers();
  }
}
function drawBField(){
  for(var a = 200; a< canvas.width; a+= 50){
    for(var b = -canvas.height/2; b< canvas.height/2; b+= 50){
        $(canvas).drawArc({
          layer: true,
          groups: ['bFieldOut'],
          fillStyle: 'black',
          x: a, y: b,
          radius: 2,
          visible: false
        });

        $(canvas).drawText({
          layer: true,
          groups: ['bFieldIn'],
          fillStyle: '#000',
          strokeStyle: '#000',
          strokeWidth: 1,
          x: a, y: b,
          fontSize: 15,
          fontFamily: 'Verdana, sans-serif',
          text: 'x',
          visible: false
        });
      
      
    }
  }
}

function drawElecCharges(){
  for(var a = 220; a< 800; a+= 40){
    $(canvas).drawText({
      layer: true,
      groups: ['posPlate'],
      index: 1,
      fillStyle: '#000',
      strokeStyle: '#FFF',
      strokeWidth: 2,
      x: a, y: 250,
      fontSize: 24,
      fontFamily: 'Verdana, sans-serif',
      text: '+'
    });

    $(canvas).drawText({
      layer: true,
      groups: ['negPlate'],
      index: 1,
      fillStyle: '#9cf',
      strokeStyle: '#FFF',
      strokeWidth: 2,
      x: a, y: -250,
      fontSize: 24,
      fontFamily: 'Verdana, sans-serif',
      text: '-'
    });
  }

}