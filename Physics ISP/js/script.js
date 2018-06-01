var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.translate(0,284);   // Move (0,0) to (250, 250)
ctx.scale(1,-1);          // Make y grow up rather than down
var interval;       
var start;
var bField = 0;
var eField = 0;
var isEFieldPos = true; 
var isBFieldPos = true; 
var forceB;
var forceE;
var displayArrow = false;
var particle = {
  prevX: 0,
  prevY: 0,
  x: 0,
  y: 0,
  velX: 0,
  velY: 0,
  accE: 0, // acceleration due to the efield.
  accB: 0, // acceleration due to the efield.
  accX: 0, // acceleration due to the bfield in x component.
  accY: 0, // acceleration due to the bfield in y component.
  k: 0,
  m: 0,
  q: 0,
  r: 0,
  v: 0,
};

$(document).ready(function() {
  //mass
    $( "#mass-slider" ).slider({
      range: "max",
      min: 0,
      max: 20,
      value: 10,
      slide: function( event, ui ) {
        $( "#mass" ).val( ui.value + " kg");
        particle.m = ui.value;
      }
    });
    $( "#mass" ).val( $("#mass-slider" ).slider( "value") + " kg");
    particle.m = ($( "#mass-slider" ).slider( "value" ));

  //charge
    $( "#charge-slider" ).slider({
      range: "max",
      min: -10,
      max: 10,
      value: 2,
      slide: function( event, ui ) {
        $( "#charge" ).val( ui.value + " C");
        particle.q = ui.value/10;
      }
    });
    $( "#charge" ).val( $( "#charge-slider" ).slider( "value" ) + " C");
    particle.q = ($( "#charge-slider" ).slider( "value" ))/10;

  //velocity
    $( "#velocity-slider" ).slider({
      range: "max",
      min: 0,
      max: 20,
      value: 14,
      slide: function( event, ui ) {
        $( "#velocity" ).val( ui.value + " m/s");
        particle.v = ui.value;
      }
    });
    $( "#velocity" ).val( $( "#velocity-slider" ).slider( "value" ) + " m/s");
    particle.v = ($( "#velocity-slider" ).slider( "value" ));

  //e-field
    $( "#e-field-mag-slider" ).slider({
      range: "max",
      min: 0,
      max: 20,
      value: 5,
      slide: function( event, ui ) {
        $( "#e-field-mag" ).val( ui.value + " N/C");
        eField = ui.value;
        updateEField();
      }
    });
    $( "#e-field-mag" ).val( $( "#e-field-mag-slider" ).slider( "value" ) + " N/C");
    eField = $( "#e-field-mag-slider" ).slider( "value" );
  
  //b-field
    $( "#b-field-mag-slider" ).slider({
      range: "max",
      min: 0,
      max: 5,
      value: 1,
      slide: function( event, ui ) {
        $( "#b-field-mag" ).val( ui.value + " T");
        bField = ui.value;
        updateBField();
      }
    });
    $( "#b-field-mag" ).val( $( "#b-field-mag-slider" ).slider( "value" ) + " T");
    bField = $( "#b-field-mag-slider" ).slider( "value" );
    updateBField($( "#b-field-mag-slider" ).slider( "value" ));

  //buttons
    $( "#reset" ).button().on("click", function(){
      $("#reset").button('option', 'disabled', true);
      restart();
    });

    //start with reset disabled
    $("#reset").button('option', 'disabled', true);


    $( "#start" ).button().on("click", function(){
      $("#reset").button('option', 'disabled', false);
      start = new Date().getTime();
      interval = setInterval(updateParticle, 1);
      $("#start").button('option', 'disabled', true);
    });

    //switches
    // magnetic direction 
    $("#in-out-select").switchButton({
      on_label: "In",          // Text to be displayed when checked
      off_label: "Out",
      width: 40,                 // Width of the button in pixels
      height: 15,                // Height of the button in pixels
      button_width: 20, 
      checked: true,
    });

    $( "#in-out-select" ).change(function() {
      isBFieldPos = $( this).prop('checked');
      updateBField();
    }).change();


    //electric direction
    $("#up-down-select").switchButton({
      on_label: "Up",          // Text to be displayed when checked
      off_label: "Down",
      width: 40,                 // Width of the button in pixels
      height: 15,                // Height of the button in pixels
      button_width: 20, 
      checked: false,
    });

    $( "#up-down-select" ).change(function() {
      //var $input = $( this);
      isEFieldPos = $( this).prop('checked');
      updateEField();
    }).change();

    //checkbox for showing forces
    $('#arrows-display').prop('checked', true);
    $( "#arrows-display" ).change(function() {
      displayArrows = $( this).prop('checked');
    }).change();


});

//innitialize
calculate();
drawBField();
drawElecCharges();

//draw preliminary things
$(canvas).drawArc({
  layer: true,
  name: 'particle',
  fillStyle: '#0095DD',
  x: 0, y: 0,
  radius: 10
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

$(canvas).drawLine({
  strokeStyle: '#000',
  layer: true,
  name: 'e-force-arrow',
  index: 2,
  strokeWidth: 4,
  rounded: true,
  visible: false,
  startArrow: true,
  arrowRadius: 15,
  x1: 100, y1: 100,
  x2: 150, y2: 125,
});

$(canvas).drawLine({
  strokeStyle: '#000',
  layer: true,
  name: 'b-force-arrow',
  index: 2,
  strokeWidth: 4,
  rounded: true,
  visible: false,
  startArrow: true,
  arrowRadius: 15,
  x1: 100, y1: 100,
  x2: 150, y2: 125,
});


var wasIn = false; // inside the area under influence of electromagnetic forces

function updateParticle(){
  var now = new Date().getTime();
  var t = (now - start)/2000; // current time, slowed down to see particle moving
  var accX;
  var accY;
  calculate();
  //particle collides or goes off screen
  if((particle.x >200 && particle.x < 800 && Math.abs(particle.y) > 230) || particle.x < 0 || particle.x > 1008 || Math.abs(particle.y) > 284){
    restart();
  }
  //particle is in area under electro magnetic influence
  if(particle.x > 200 && particle.x < 800){
    $(canvas).setLayer('e-force-arrow', {visible: true}).drawLayers();
    $(canvas).setLayer('b-force-arrow', {visible: true}).drawLayers();
    wasIn = true;
    particle.x += particle.velX;
    particle.y += particle.velY

    var angle = Math.atan2(particle.velY, particle.velX);

    accX = particle.accB*Math.cos(angle + Math.PI/2);
    particle.velX +=  accX;

    accY = particle.accB*Math.sin(angle + Math.PI/2) + particle.accE;
    particle.velY +=  accY;

    var scalingFactor = 15;

    //diplay Arrows if checkbox is checked
    if(displayArrows){
      if(forceE != 0){
        $(canvas).setLayer('e-force-arrow', {
          x2: particle.x,
          y2: particle.y,
          x1: particle.x,
          y1: particle.y + scalingFactor*forceE,  
        }).drawLayers();
      }else{
        $(canvas).setLayer('e-force-arrow', {visible: false}).drawLayers();
      }
      if(forceB != 0){
        $(canvas).setLayer('b-force-arrow', {
          x2: particle.x,
          y2: particle.y,
          x1: particle.x + scalingFactor*(forceB)*Math.cos(angle + Math.PI/2),
          y1: particle.y + scalingFactor*(forceB)*Math.sin(angle + Math.PI/2),
        }).drawLayers();
      }else{
        $(canvas).setLayer('b-force-arrow', {visible: false}).drawLayers();
      }
    }else{
      $(canvas).setLayer('e-force-arrow', {visible: false}).drawLayers();
      $(canvas).setLayer('b-force-arrow', {visible: false}).drawLayers();
    }
  }else{
    accX = 0;
    accY = 0;
    $(canvas).setLayer('e-force-arrow', {visible: false}).drawLayers();
    $(canvas).setLayer('b-force-arrow', {visible: false}).drawLayers();

    if(wasIn){
      particle.x += particle.velX;
      particle.y += particle.velY; 
    }else{
      particle.velX = particle.v;
      particle.x += particle.v;
    }
  }
  //update the info section
  $( "#e-field-display" ).val(Math.round(forceE*100)/100 + " N/C");
  $( "#b-field-display" ).val(Math.round(forceB*100)/100 + " T");
  $( "#acc-x-display" ).val(Math.round(accX*100)/100 + " m/s^2");
  $( "#acc-y-display" ).val(Math.round(accY*100)/100 + " m/s^2");
  $( "#vel-x-display" ).val(Math.round(particle.velX*100)/100 + " m/s");
  $( "#vel-y-display" ).val(Math.round(particle.velY*100)/100 + " m/s");

  //update position of particle
  $(canvas).setLayer('particle', {
    x: particle.x,
    y: particle.y
  }).drawLayers();


}

function calculate(){
  bField = Math.abs(bField);
  eField = Math.abs(eField);

  if(!isBFieldPos){
    bField = -bField;
  }
  if(!isEFieldPos){
    eField = -eField;
  }
  forceB = particle.q*particle.v*bField;
  particle.accB = forceB/particle.m;

  forceE = particle.q*eField;
  particle.accE = forceE/particle.m;
}

function restart(){
  $("#reset").button('option', 'disabled', true);

  clearInterval(interval);
  particle.x = 0;
  particle.y = 0;
  particle.velY = 0;
  particle.velX = 0;
  $("#start").button('option', 'disabled', false);

  wasIn = false;
  $(canvas).setLayer('particle', {
    x: 0,
    y: 0,
  }).drawLayers();
  $(canvas).setLayer('e-force-arrow', {visible: false}).drawLayers();
  $(canvas).setLayer('b-force-arrow', {visible: false}).drawLayers();
}

function updateBField(){
   if(bField === 0){
    $(canvas).setLayerGroup('bFieldIn', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('bFieldOut', {visible: false}).drawLayers();
   }else if(isBFieldPos){
    $(canvas).setLayerGroup('bFieldIn', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('bFieldOut', {visible: true}).drawLayers();
  }else{
    $(canvas).setLayerGroup('bFieldIn', {visible: true}).drawLayers();
    $(canvas).setLayerGroup('bFieldOut', {visible: false}).drawLayers();
  }
}


function drawBField(){
  for(var a = 200; a< 850; a+= 50){
    for(var b = -canvas.height/2+50; b< canvas.height/2-50; b+= 50){
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

function updateEField(){
   if(eField === 0){
    $(canvas).setLayerGroup('posPlateUp', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('negPlateDown', {visible: false}).drawLayers();

    $(canvas).setLayerGroup('negPlateUp', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('posPlateDown', {visible: false}).drawLayers();
   }else if(isEFieldPos){
    $(canvas).setLayerGroup('posPlateUp', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('negPlateDown', {visible: false}).drawLayers();

    $(canvas).setLayerGroup('negPlateUp', {visible: true}).drawLayers();
    $(canvas).setLayerGroup('posPlateDown', {visible: true}).drawLayers();
  }else{
    $(canvas).setLayerGroup('posPlateUp', {visible: true}).drawLayers();
    $(canvas).setLayerGroup('negPlateDown', {visible: true}).drawLayers();

    $(canvas).setLayerGroup('negPlateUp', {visible: false}).drawLayers();
    $(canvas).setLayerGroup('posPlateDown', {visible: false}).drawLayers();
  }
}

function drawElecCharges(){
  for(var a = 220; a< 800; a+= 40){
    $(canvas).drawText({
      layer: true,
      groups: ['posPlateUp'],
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
      groups: ['negPlateDown'],
      index: 1,
      fillStyle: '#9cf',
      strokeStyle: '#FFF',
      strokeWidth: 2,
      x: a, y: -250,
      fontSize: 24,
      fontFamily: 'Verdana, sans-serif',
      text: '-'
    });

    $(canvas).drawText({
      layer: true,
      groups: ['negPlateUp'],
      index: 1,
      fillStyle: '#000',
      strokeStyle: '#FFF',
      strokeWidth: 2,
      x: a, y: 250,
      fontSize: 24,
      fontFamily: 'Verdana, sans-serif',
      text: '-'
    });

    $(canvas).drawText({
      layer: true,
      groups: ['posPlateDown'],
      index: 1,
      fillStyle: '#9cf',
      strokeStyle: '#FFF',
      strokeWidth: 2,
      x: a, y: -250,
      fontSize: 24,
      fontFamily: 'Verdana, sans-serif',
      text: '+'
    });
  }
}