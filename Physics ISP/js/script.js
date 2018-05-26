var canvas = document.getElementById("myCanvas");
$(document).ready(function() {
  $( function() {
    drawBField();


    $( "#mass-slider" ).slider({
      range: "max",
      min: -100000,
      max: 100000,
      value: 2,
      slide: function( event, ui ) {
        $( "#mass" ).val( ui.value );
      }
    });
    $( "#mass" ).val( $( "#mass-slider" ).slider( "value" ) );
    $("#mass").keyup(function () {
      $("#mass-slider").slider("value", this.value);
    });
  });

  $( function() {
    $( "#charge-slider" ).slider({
      range: "max",
      min: -100000,
      max: 100000,
      value: 2,
      slide: function( event, ui ) {
        $( "#charge" ).val( ui.value );
      }
    });
    $( "#charge" ).val( $( "#charge-slider" ).slider( "value" ) );
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
        updateBField(ui.value);

      }
    });
    $( "#b-field-mag" ).val( $( "#b-field-mag-slider" ).slider( "value" ) );
    $("#b-field-mag").keyup(function () {
      $("#b-field-mag-slider").slider("value", this.value);
      updateBField(this.value);
    });
    updateBField( $("#b-field-mag-slider").slider("value"));
  });


  

	console.log('ready')
	$(canvas).drawRect({
    layer: true,
		name: 'pos-plate',
		fillStyle: '#000',
		x: 500, y: 100,
		width: 600,
		height: 40
	});

	$(canvas).drawRect({
		layer: true,
		name: 'neg-plate',
		fillStyle: '#000',
		x: 500, y: 500,
		width: 600,
		height: 40
	});

	$(canvas).drawArc({
		layer: true,
		name: 'particle',
		fillStyle: 'black',
		x: 100, y: 100,
		radius: 20
	});


/*	$(canvas).animateLayer('particle', {
    function(){
      var part = $(canvas).getLayer("particle");
      console.log(part.x + ", " + part.y)
    },
	  x:'+=100'
	});
});*/
  var change = 2;
  $('canvas').animateLayer('particle', {
    x: "+=" + change 
  }, {
    duration: 1000,
    easing: 'swing',
    step: function (now, fx, layer) {
      var part = $(canvas).getLayer("particle");
      change++;
      console.log(part.x + ", " + part.y)
      },
    complete: function (layer) {
      // still do something at end of animation
    }

  });
});

var prev = "";
function updateBField(val){
  console.log(prev)
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
  for(var a = 100; a< 1000; a+= 50){
    for(var b = 100; b< 1000; b+= 50){
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

function forces(){
  var magneticForce = q*v*b;
  var electricForce = q*E;
  var netForce = magneticForce + electricForce;
  var netAcc = netForce/mass;

}