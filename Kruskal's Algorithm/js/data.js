var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// vertices position
var v = {
    a: {
        x: 100,
        y: 275
    },
    b: {
        x: 300,
        y: 150
    },
    c: {
        x: 350,
        y: 325
    },
    d: {
        x: 500,
        y: 250
    },
    e: {
        x: 240,
        y: 380
    },
    f: {
        x: 170,
        y: 500
    },
    g: {
        x: 480,
        y: 490
    }
};
var tableX = 620;
var tableY = 190;
var spacer = 35;

var commands = {
    // edge lines
    "a-b": ["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
    "a-c": ["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
    "a-e": ["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
    "a-f": ["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
    "b-c": ["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
    "b-d": ["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
    "c-d": ["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
    "c-e": ["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
    "f-g": ["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
    "e-f": ["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
    "e-g": ["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
    "d-g": ["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G

    //edge weights
    "a-b val": ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, "#d3d0cb"], // A-B
    "a-c val": ["t", "11", 30, (v.a.x + v.c.x) / 2, (v.a.y + v.c.y) / 2 - 10, "#d3d0cb"], // A-C
    "a-e val": ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, "#d3d0cb"], // A-E
    "a-f val": ["t", "4", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2 + 15, "#d3d0cb"], // A-F
    "b-c val": ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, "#d3d0cb"], // B-C
    "b-d val": ["t", "9", 30, (v.b.x + v.d.x) / 2, (v.b.y + v.d.y) / 2 - 10, "#d3d0cb"], // B-D
    "c-d val": ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, "#d3d0cb"], // C-D
    "c-e val": ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, "#d3d0cb"], // C-E
    "f-g val": ["t", "12", 30, (v.f.x + v.g.x) / 2, (v.f.y + v.g.y) / 2 + 35, "#d3d0cb"], // F-G
    "e-f val": ["t", "7", 30, (v.e.x + v.f.x) / 2 + 25, (v.e.y + v.f.y) / 2 + 15, "#d3d0cb"], // E-F
    "e-g val": ["t", "8", 30, (v.e.x + v.g.x) / 2, (v.e.y + v.g.y) / 2 - 10, "#d3d0cb"], // E-G
    "d-g val": ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, "#d3d0cb"], // D-G

    // vertex
    "a-circle":["dc", v.a.x, v.a.y, 20, "#000"], // A
    "b-circle":["dc", v.b.x, v.b.y, 20, "#000"], // B
    "c-circle":["dc", v.c.x, v.c.y, 20, "#000"], // C
    "d-circle":["dc", v.d.x, v.d.y, 20, "#000"], // D
    "e-circle":["dc", v.e.x, v.e.y, 20, "#000"], // E
    "f-circle":["dc", v.f.x, v.f.y, 20, "#000"], // F
    "g-circle":["dc", v.g.x, v.g.y, 20, "#000"], // G

	// vertex label
    "a-letter": ["t", "A", 30, v.a.x, v.a.y + 10, "#d3d0cb"],
    "b-letter": ["t", "B", 30, v.b.x, v.b.y + 10, "#d3d0cb"],
    "c-letter": ["t", "C", 30, v.c.x, v.c.y + 10, "#d3d0cb"],
    "d-letter": ["t", "D", 30, v.d.x, v.d.y + 10, "#d3d0cb"],
    "e-letter": ["t", "E", 30, v.e.x, v.e.y + 10, "#d3d0cb"],
    "f-letter": ["t", "F", 30, v.f.x, v.f.y + 10, "#d3d0cb"],
    "g-letter": ["t", "G", 30, v.g.x, v.g.y + 10, "#d3d0cb"],

    "a-bTable": null,
    "e-cTable": null,
    "a-eTable": null,
	"a-fTable": null,  
	"b-cTable": null,  
	"f-gTable": null,  
	"b-dTable": null,  
	"c-dTable": null,  
	"c-eTable": null,  
	"e-fTable": null,  
	"e-gTable": null, 
	"d-gTable": null, 




};

// to del put the key and "del"
 var changes = [
    [

    ],
    [
        //["a-b", "del"],
		//["t", "based on weight", 25, 580, 175, "#d3d0cb"], // A-B

		//["a-letter", ["t", "A -- B", 25, tableX, tableY + 0 * spacer, "#d3d0cb"]], // A-B
		["a-bTable", ["t", "A -- B", 25, tableX, tableY + 0 * spacer, "#d3d0cb"]], // A-B
		["e-cTable", ["t", "E -- C", 25, tableX, tableY + 1 * spacer, "#d3d0cb"]], // E-C
		["a-eTable" ,["t", "B -- C", 25, tableX, tableY + 2 * spacer, "#d3d0cb"]], // A-E
		["a-fTable" ,["t", "A -- F", 25, tableX, tableY + 3 * spacer, "#d3d0cb"]], // A-F
		["b-cTable" ,["t", "D -- G", 25, tableX, tableY + 4 * spacer, "#d3d0cb"]], // B-C
		["f-gTable" ,["t", "A -- E", 25, tableX, tableY + 5 * spacer, "#d3d0cb"]], // F-G
		["b-dTable" ,["t", "C -- D", 25, tableX, tableY + 6 * spacer, "#d3d0cb"]], // B-D
		["c-dTable" ,["t", "F -- E", 25, tableX, tableY + 7 * spacer, "#d3d0cb"]], // C-D
		["c-eTable" ,["t", "E -- G", 25, tableX, tableY + 8 * spacer, "#d3d0cb"]], // C-E
		["e-fTable" ,["t", "B -- D", 25, tableX, tableY + 9 * spacer, "#d3d0cb"]], // E-F
		["e-gTable" ,["t", "A -- C", 25, tableX, tableY + 10 * spacer, "#d3d0cb"]], // E-G
		["d-gTable" ,["t", "F -- G", 25, tableX, tableY + 11 * spacer, "#d3d0cb"]], // D-G



    ],

];





/*
var changes = [
[
    ["a-b", "#0000000"],
],
[],
]];*/
/*
var commands = [
    [
        ["t", "Kruskal's Algorithm", 40, canvas.width / 2, 70, "#d3d0cb"],
        ["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
        ["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
        ["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
        ["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
        ["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
        ["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
        ["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
        ["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
        ["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
        ["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
        ["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
        ["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G
        ["dc", v.a.x, v.a.y, 20, "#000"], // A
        ["dc", v.b.x, v.b.y, 20, "#000"], // B
        ["dc", v.c.x, v.c.y, 20, "#000"], // C
        ["dc", v.d.x, v.d.y, 20, "#000"], // D
        ["dc", v.e.x, v.e.y, 20, "#000"], // E
        ["dc", v.f.x, v.f.y, 20, "#000"], // F
        ["dc", v.g.x, v.g.y, 20, "#000"], // G
        ["t", "A", 30, v.a.x, v.a.y + 10, "#d3d0cb"],
        ["t", "B", 30, v.b.x, v.b.y + 10, "#d3d0cb"],
        ["t", "C", 30, v.c.x, v.c.y + 10, "#d3d0cb"],
        ["t", "D", 30, v.d.x, v.d.y + 10, "#d3d0cb"],
        ["t", "E", 30, v.e.x, v.e.y + 10, "#d3d0cb"],
        ["t", "F", 30, v.f.x, v.f.y + 10, "#d3d0cb"],
        ["t", "G", 30, v.g.x, v.g.y + 10, "#d3d0cb"],
        ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, "#d3d0cb"], // A-B
        ["t", "11", 30, (v.a.x + v.c.x) / 2, (v.a.y + v.c.y) / 2 - 10, "#d3d0cb"], // A-C
        ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, "#d3d0cb"], // A-E
        ["t", "4", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2 + 15, "#d3d0cb"], // A-F
        ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, "#d3d0cb"], // B-C
        ["t", "9", 30, (v.b.x + v.d.x) / 2, (v.b.y + v.d.y) / 2 - 10, "#d3d0cb"], // B-D
        ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, "#d3d0cb"], // C-D
        ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, "#d3d0cb"], // C-E
        ["t", "12", 30, (v.f.x + v.g.x) / 2, (v.f.y + v.g.y) / 2 + 35, "#d3d0cb"], // F-G
        ["t", "7", 30, (v.e.x + v.f.x) / 2 + 25, (v.e.y + v.f.y) / 2 + 15, "#d3d0cb"], // E-F
        ["t", "8", 30, (v.e.x + v.g.x) / 2, (v.e.y + v.g.y) / 2 - 10, "#d3d0cb"], // E-G
        ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, "#d3d0cb"], // D-G
    ],
    [
        ["t", "Kruskal's Algorithm", 40, canvas.width / 2, 70, "#d3d0cb"],
        ["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
        ["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
        ["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
        ["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
        ["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
        ["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
        ["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
        ["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
        ["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
        ["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
        ["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
        ["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G
        ["dc", v.a.x, v.a.y, 20, "#000"], // A
        ["dc", v.b.x, v.b.y, 20, "#000"], // B
        ["dc", v.c.x, v.c.y, 20, "#000"], // C
        ["dc", v.d.x, v.d.y, 20, "#000"], // D
        ["dc", v.e.x, v.e.y, 20, "#000"], // E
        ["dc", v.f.x, v.f.y, 20, "#000"], // F
        ["dc", v.g.x, v.g.y, 20, "#000"], // G
        ["t", "A", 30, v.a.x, v.a.y + 10, "#d3d0cb"],
        ["t", "B", 30, v.b.x, v.b.y + 10, "#d3d0cb"],
        ["t", "C", 30, v.c.x, v.c.y + 10, "#d3d0cb"],
        ["t", "D", 30, v.d.x, v.d.y + 10, "#d3d0cb"],
        ["t", "E", 30, v.e.x, v.e.y + 10, "#d3d0cb"],
        ["t", "F", 30, v.f.x, v.f.y + 10, "#d3d0cb"],
        ["t", "G", 30, v.g.x, v.g.y + 10, "#d3d0cb"],
        ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, "#d3d0cb"], // A-B
        ["t", "11", 30, (v.a.x + v.c.x) / 2, (v.a.y + v.c.y) / 2 - 10, "#d3d0cb"], // A-C
        ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, "#d3d0cb"], // A-E
        ["t", "4", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2 + 15, "#d3d0cb"], // A-F
        ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, "#d3d0cb"], // B-C
        ["t", "9", 30, (v.b.x + v.d.x) / 2, (v.b.y + v.d.y) / 2 - 10, "#d3d0cb"], // B-D
        ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, "#d3d0cb"], // C-D
        ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, "#d3d0cb"], // C-E
        ["t", "12", 30, (v.f.x + v.g.x) / 2, (v.f.y + v.g.y) / 2 + 35, "#d3d0cb"], // F-G
        ["t", "7", 30, (v.e.x + v.f.x) / 2 + 25, (v.e.y + v.f.y) / 2 + 15, "#d3d0cb"], // E-F
        ["t", "8", 30, (v.e.x + v.g.x) / 2, (v.e.y + v.g.y) / 2 - 10, "#d3d0cb"], // E-G
        ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, "#d3d0cb"], // D-G
        ["tc", "1. Sort all the edges:", 30, 550, 145, "#d3d0cb"], // A-B
        ["dl", 585, 150, 820, 150, 2], // A-B
        //["t", "based on weight", 25, 580, 175, "#d3d0cb"], // A-B
        ["t", "A -- B", 25, tableX, tableY + 0 * spacer, "#d3d0cb"], // A-B
        ["t", "E -- C", 25, tableX, tableY + 1 * spacer, "#d3d0cb"], // A-C
        ["t", "B -- C", 25, tableX, tableY + 2 * spacer, "#d3d0cb"], // A-E
        ["t", "A -- F", 25, tableX, tableY + 3 * spacer, "#d3d0cb"], // A-F
        ["t", "D -- G", 25, tableX, tableY + 4 * spacer, "#d3d0cb"], // B-C
        ["t", "A -- E", 25, tableX, tableY + 5 * spacer, "#d3d0cb"], // F-G
        ["t", "C -- D", 25, tableX, tableY + 6 * spacer, "#d3d0cb"], // B-D
        ["t", "F -- E", 25, tableX, tableY + 7 * spacer, "#d3d0cb"], // C-D
        ["t", "E -- G", 25, tableX, tableY + 8 * spacer, "#d3d0cb"], // C-E
        ["t", "B -- D", 25, tableX, tableY + 9 * spacer, "#d3d0cb"], // E-F
        ["t", "A -- C", 25, tableX, tableY + 10 * spacer, "#d3d0cb"], // E-G
        ["t", "F -- G", 25, tableX, tableY + 11 * spacer, "#d3d0cb"], // D-G
    ],
    []
];
/*
var commands = [	
					[
						["t", "Kruskal's Algorithm", 40, canvas.width/2, 70, "#d3d0cb"],

						["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
						["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
						["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
						["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
						["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
						["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
						["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
						["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
						["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
						["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
						["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
						["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G

						["dc", v.a.x, v.a.y, 20, "#000"], // A
						["dc", v.b.x, v.b.y, 20, "#000"], // B
						["dc", v.c.x, v.c.y, 20, "#000"], // C
						["dc", v.d.x, v.d.y, 20, "#000"], // D
						["dc", v.e.x, v.e.y, 20, "#000"], // E
						["dc", v.f.x, v.f.y, 20, "#000"], // F
						["dc", v.g.x, v.g.y, 20, "#000"], // G

						["t", "A", 30, v.a.x, v.a.y + 10, "#d3d0cb"],
						["t", "B", 30, v.b.x, v.b.y + 10, "#d3d0cb"],
						["t", "C", 30, v.c.x, v.c.y + 10, "#d3d0cb"],
						["t", "D", 30, v.d.x, v.d.y + 10, "#d3d0cb"],
						["t", "E", 30, v.e.x, v.e.y + 10, "#d3d0cb"],
						["t", "F", 30, v.f.x, v.f.y + 10, "#d3d0cb"],
						["t", "G", 30, v.g.x, v.g.y + 10, "#d3d0cb"],

						["t", "2", 30, (v.a.x + v.b.x)/2 - 5 , (v.a.y + v.b.y)/2 - 10, "#d3d0cb"], // A-B
						["t", "11", 30, (v.a.x + v.c.x)/2, (v.a.y + v.c.y)/2 - 10, "#d3d0cb"], // A-C
						["t", "6", 30, (v.a.x + v.e.x)/2, (v.a.y + v.e.y)/2 + 45, "#d3d0cb"], // A-E
						["t", "4", 30, (v.a.x + v.f.x)/2 - 25, (v.a.y + v.f.y)/2 + 15, "#d3d0cb"], // A-F
						["t", "3", 30, (v.b.x + v.c.x)/2 - 25, (v.b.y + v.c.y)/2, "#d3d0cb"], // B-C
						["t", "9", 30, (v.b.x + v.d.x)/2, (v.b.y + v.d.y)/2 - 10, "#d3d0cb"], // B-D
						["t", "7", 30, (v.c.x + v.d.x)/2, (v.c.y + v.d.y)/2 - 5, "#d3d0cb"], // C-D
						["t", "2", 30, (v.c.x + v.e.x)/2 + 15, (v.c.y + v.e.y)/2 + 30, "#d3d0cb"], // C-E
						["t", "12", 30, (v.f.x + v.g.x)/2, (v.f.y + v.g.y)/2 + 35, "#d3d0cb"], // F-G
						["t", "7", 30, (v.e.x + v.f.x)/2 + 25, (v.e.y + v.f.y)/2 + 15, "#d3d0cb"], // E-F
						["t", "8", 30, (v.e.x + v.g.x)/2, (v.e.y + v.g.y)/2 - 10, "#d3d0cb"], // E-G
						["t", "5", 30, (v.d.x + v.g.x)/2 + 20, (v.d.y + v.g.y)/2 - 5, "#d3d0cb"], // D-G
					
					],
					[
						["t", "Kruskal's Algorithm", 40, canvas.width/2, 70, "#d3d0cb"],

						["dl", v.a.x, v.a.y, v.b.x, v.b.y], // A-B
						["dl", v.a.x, v.a.y, v.c.x, v.c.y], // A-C
						["dl", v.a.x, v.a.y, v.e.x, v.e.y], // A-E
						["dl", v.a.x, v.a.y, v.f.x, v.f.y], // A-F
						["dl", v.b.x, v.b.y, v.c.x, v.c.y], // B-C
						["dl", v.b.x, v.b.y, v.d.x, v.d.y], // B-D
						["dl", v.c.x, v.c.y, v.d.x, v.d.y], // C-D
						["dl", v.c.x, v.c.y, v.e.x, v.e.y], // C-E
						["dl", v.f.x, v.f.y, v.g.x, v.g.y], // F-G
						["dl", v.e.x, v.e.y, v.f.x, v.f.y], // E-F
						["dl", v.e.x, v.e.y, v.g.x, v.g.y], // E-G
						["dl", v.d.x, v.d.y, v.g.x, v.g.y], // D-G

						["dc", v.a.x, v.a.y, 20, "#000"], // A
						["dc", v.b.x, v.b.y, 20, "#000"], // B
						["dc", v.c.x, v.c.y, 20, "#000"], // C
						["dc", v.d.x, v.d.y, 20, "#000"], // D
						["dc", v.e.x, v.e.y, 20, "#000"], // E
						["dc", v.f.x, v.f.y, 20, "#000"], // F
						["dc", v.g.x, v.g.y, 20, "#000"], // G




						["t", "A", 30, v.a.x, v.a.y + 10, "#d3d0cb"],
						["t", "B", 30, v.b.x, v.b.y + 10, "#d3d0cb"],
						["t", "C", 30, v.c.x, v.c.y + 10, "#d3d0cb"],
						["t", "D", 30, v.d.x, v.d.y + 10, "#d3d0cb"],
						["t", "E", 30, v.e.x, v.e.y + 10, "#d3d0cb"],
						["t", "F", 30, v.f.x, v.f.y + 10, "#d3d0cb"],
						["t", "G", 30, v.g.x, v.g.y + 10, "#d3d0cb"],

						["t", "2", 30, (v.a.x + v.b.x)/2 - 5 , (v.a.y + v.b.y)/2 - 10, "#d3d0cb"], // A-B
						["t", "11", 30, (v.a.x + v.c.x)/2, (v.a.y + v.c.y)/2 - 10, "#d3d0cb"], // A-C
						["t", "6", 30, (v.a.x + v.e.x)/2, (v.a.y + v.e.y)/2 + 45, "#d3d0cb"], // A-E
						["t", "4", 30, (v.a.x + v.f.x)/2 - 25, (v.a.y + v.f.y)/2 + 15, "#d3d0cb"], // A-F
						["t", "3", 30, (v.b.x + v.c.x)/2 - 25, (v.b.y + v.c.y)/2, "#d3d0cb"], // B-C
						["t", "9", 30, (v.b.x + v.d.x)/2, (v.b.y + v.d.y)/2 - 10, "#d3d0cb"], // B-D
						["t", "7", 30, (v.c.x + v.d.x)/2, (v.c.y + v.d.y)/2 - 5, "#d3d0cb"], // C-D
						["t", "2", 30, (v.c.x + v.e.x)/2 + 15, (v.c.y + v.e.y)/2 + 30, "#d3d0cb"], // C-E
						["t", "12", 30, (v.f.x + v.g.x)/2, (v.f.y + v.g.y)/2 + 35, "#d3d0cb"], // F-G
						["t", "7", 30, (v.e.x + v.f.x)/2 + 25, (v.e.y + v.f.y)/2 + 15, "#d3d0cb"], // E-F
						["t", "8", 30, (v.e.x + v.g.x)/2, (v.e.y + v.g.y)/2 - 10, "#d3d0cb"], // E-G
						["t", "5", 30, (v.d.x + v.g.x)/2 + 20, (v.d.y + v.g.y)/2 - 5, "#d3d0cb"], // D-G


						["tc", "1. Sort all the edges:", 30, 550, 145, "#d3d0cb"], // A-B
						["dl", 585, 150, 820, 150, 2], // A-B
						//["t", "based on weight", 25, 580, 175, "#d3d0cb"], // A-B


						["t", "A -- B", 25, tableX, tableY + 0 * spacer, "#d3d0cb"], // A-B
						["t", "E -- C", 25, tableX, tableY + 1 * spacer, "#d3d0cb"], // A-C
						["t", "B -- C", 25, tableX, tableY + 2 * spacer, "#d3d0cb"], // A-E
						["t", "A -- F", 25, tableX, tableY + 3 * spacer, "#d3d0cb"], // A-F
						["t", "D -- G", 25, tableX, tableY + 4 * spacer, "#d3d0cb"], // B-C
						["t", "A -- E", 25, tableX, tableY + 5 * spacer, "#d3d0cb"], // F-G
						["t", "C -- D", 25, tableX, tableY + 6 * spacer, "#d3d0cb"], // B-D
						["t", "F -- E", 25, tableX, tableY + 7 * spacer, "#d3d0cb"], // C-D
						["t", "E -- G", 25, tableX, tableY + 8 * spacer, "#d3d0cb"], // C-E
						["t", "B -- D", 25, tableX, tableY + 9 * spacer, "#d3d0cb"], // E-F
						["t", "A -- C", 25, tableX, tableY + 10 * spacer, "#d3d0cb"], // E-G
						["t", "F -- G", 25, tableX, tableY + 11 * spacer, "#d3d0cb"], // D-G
						

					],








					[
					]

				];
				*/