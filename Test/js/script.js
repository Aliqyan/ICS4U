var fn = function(){
	alert(1);
}
function hoverAction() {
    //console.log("helloWorld");
    //alert('Yolo');
    var el = document.getElementById('sample'); // grabs the element by id
    el.style.color = 'red'; // each element has a style property 
    // which is a map 
    var arr = arrayPractice();
    bigMathFunction(1, 20);

    var mapMe = mapPractice();
    var obj = mapPractice2();

    var elements = document.querySelectorAll('h1'); // returns an Array - same selectro rules as css
    var i;
    for(i = 0; i< elements.length; i++){
   		elements[i].style.color = mapMe.color; 

    }
}
/* We can return valued from a function but we do not need to specify the tupe*/
/*we can accept arguments but again do nit have to specify the type*/
function bigMathFunction(i, j) {
    var sum = 0;
    for (var count = i; count <= j; count++) {
        sum += count;
    }
    var evenOdd = (sum % 2 === 0) ? 'even' : 'odd';
    console.log('This is the sum: ' + sum + ' it is ' + evenOdd);
     var el = document.getElementById('sample'); // grabs the element by id
     el.innerHTML = ('This is the sum: ' + sum + ' it is ' + evenOdd);
}



function arrayPractice() {
    var arr = [];
    arr[0] = 'hi';
    arr[1] = 6;
    arr[7] = fn;
    arr[8] = true;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            console.log(arr[i]);
        }
    }
    return arr;
}

function mapPractice(){
	var obj = {};
	obj.color = 'red';
	obj['color'] = 'blue';

	var ex = 'color';
	obj[ex] = 'yellow';


	return obj;

}

function mapPractice2(){
	var objArr = {};
	var i;
	for(i = 0; i< 10; i++){
		objArr[i] = 'hi';
	}


	return objArr;

}
