var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var sTime = 400;
var time = 200;
var times = [-1, -1, time,time,time,time,time,time,time,time,time,time,time,time, time, -1, sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime,sTime*5,sTime,sTime,sTime*5,sTime, sTime*3, sTime*2, sTime];
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
var tableY = 150;
var spacer = 35;
var baseCol = "#eeeff7";
var selectCol = "#AA0303"
var goodCol = "#60CD00";
var commands = {
    // edge lines
    "a-b": ["dl", v.a.x, v.a.y, v.b.x, v.b.y, baseCol], // A-B
    "a-c": ["dl", v.a.x, v.a.y, v.c.x, v.c.y, baseCol], // A-C
    "a-e": ["dl", v.a.x, v.a.y, v.e.x, v.e.y, baseCol], // A-E
    "a-f": ["dl", v.a.x, v.a.y, v.f.x, v.f.y, baseCol], // A-F
    "b-c": ["dl", v.b.x, v.b.y, v.c.x, v.c.y, baseCol], // B-C
    "b-d": ["dl", v.b.x, v.b.y, v.d.x, v.d.y, baseCol], // B-D
    "c-d": ["dl", v.c.x, v.c.y, v.d.x, v.d.y, baseCol], // C-D
    "c-e": ["dl", v.c.x, v.c.y, v.e.x, v.e.y, baseCol], // C-E
    "f-g": ["dl", v.f.x, v.f.y, v.g.x, v.g.y, baseCol], // F-G
    "e-f": ["dl", v.e.x, v.e.y, v.f.x, v.f.y, baseCol], // E-F
    "e-g": ["dl", v.e.x, v.e.y, v.g.x, v.g.y, baseCol], // E-G
    "d-g": ["dl", v.d.x, v.d.y, v.g.x, v.g.y, baseCol], // D-G
    //edge weights
    "a-b val": ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, baseCol], // A-B
    "a-c val": ["t", "11", 30, (v.a.x + v.c.x) / 2, (v.a.y + v.c.y) / 2 - 10, baseCol], // A-C
    "a-e val": ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, baseCol], // A-E
    "a-f val": ["t", "4", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2 + 15, baseCol], // A-F
    "b-c val": ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, baseCol], // B-C
    "b-d val": ["t", "9", 30, (v.b.x + v.d.x) / 2, (v.b.y + v.d.y) / 2 - 10, baseCol], // B-D
    "c-d val": ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, baseCol], // C-D
    "c-e val": ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, baseCol], // C-E
    "f-g val": ["t", "12", 30, (v.f.x + v.g.x) / 2, (v.f.y + v.g.y) / 2 + 35, baseCol], // F-G
    "e-f val": ["t", "7", 30, (v.e.x + v.f.x) / 2 + 25, (v.e.y + v.f.y) / 2 + 15, baseCol], // E-F
    "e-g val": ["t", "8", 30, (v.e.x + v.g.x) / 2, (v.e.y + v.g.y) / 2 - 10, baseCol], // E-G
    "d-g val": ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, baseCol], // D-G
    // vertex
    "a-circle": ["dc", v.a.x, v.a.y, 20, "#000"], // A
    "b-circle": ["dc", v.b.x, v.b.y, 20, "#000"], // B
    "c-circle": ["dc", v.c.x, v.c.y, 20, "#000"], // C
    "d-circle": ["dc", v.d.x, v.d.y, 20, "#000"], // D
    "e-circle": ["dc", v.e.x, v.e.y, 20, "#000"], // E
    "f-circle": ["dc", v.f.x, v.f.y, 20, "#000"], // F
    "g-circle": ["dc", v.g.x, v.g.y, 20, "#000"], // G
    // vertex label
    "a-letter": ["t", "A", 30, v.a.x, v.a.y + 10, baseCol],
    "b-letter": ["t", "B", 30, v.b.x, v.b.y + 10, baseCol],
    "c-letter": ["t", "C", 30, v.c.x, v.c.y + 10, baseCol],
    "d-letter": ["t", "D", 30, v.d.x, v.d.y + 10, baseCol],
    "e-letter": ["t", "E", 30, v.e.x, v.e.y + 10, baseCol],
    "f-letter": ["t", "F", 30, v.f.x, v.f.y + 10, baseCol],
    "g-letter": ["t", "G", 30, v.g.x, v.g.y + 10, baseCol],
    "stepTitle": ["t", "Kruskal's Algorithm", 40, canvas.width / 2, 70, "#eeeff7"], // A-B
    "rightKey": ["t", "Press the right arrow key to continue", 20, canvas.width/2, 600, "#eeeff7"],
    "a-bTable": null,
    "a-cTable": null,
    "e-cTable": null,
    "b-cTable": null,
    "a-fTable": null,
    "a-eTable": null,
    "d-gTable": null,
    "f-gTable": null,
    "b-dTable": null,
    "c-dTable": null,
    "c-eTable": null,
    "f-eTable": null,
    "e-gTable": null,
    "tableText": null,
};
var time = 100;
var changes = [
    [

    ],
    [
        ["stepTitle", ["t", "1. Sort the edges in increasing order", 40, canvas.width / 2, 70, "#eeeff7"]], // A-B
    ],
    [
        //["a-b", "del"],
        ["rightKey", []],
        ["a-bTable", ["t", "A -- B", 25, tableX, tableY + 0 * spacer, baseCol]],
    ],
    [
        ["e-cTable", ["t", "E -- C", 25, tableX, tableY + 1 * spacer, baseCol]],
    ],
    [ 
        ["b-cTable", ["t", "B -- C", 25, tableX, tableY + 2 * spacer, baseCol]],
    ],
    [ 
        ["a-fTable", ["t", "A -- F", 25, tableX, tableY + 3 * spacer, baseCol]],
    ],
    [ 
        ["d-gTable", ["t", "D -- G", 25, tableX, tableY + 4 * spacer, baseCol]],
    ],
    [
        ["a-eTable", ["t", "A -- E", 25, tableX, tableY + 5 * spacer, baseCol]],
    ],
    [ 
        ["c-dTable", ["t", "C -- D", 25, tableX, tableY + 6 * spacer, baseCol]],
    ],
    [ 
        ["f-eTable", ["t", "F -- E", 25, tableX, tableY + 7 * spacer, baseCol]],
    ],
    [ 
        ["e-gTable", ["t", "E -- G", 25, tableX, tableY + 8 * spacer, baseCol]],
    ],
    [ 
        ["b-dTable", ["t", "B -- D", 25, tableX, tableY + 9 * spacer, baseCol]],
    ],
    [ 
        ["a-cTable", ["t", "A -- C", 25, tableX, tableY + 10 * spacer, baseCol]],
    ],
    [
        ["f-gTable", ["t", "F -- G", 25, tableX, tableY + 11 * spacer, baseCol]],
    ],
    
    [
        ["stepTitle", ["t", "2. Connect the vertices without forming a loop", 40, canvas.width / 2, 70, "#eeeff7"]], // A-B
    ],
    //a-b
    [
        ["rightKey", ["t", "Press the right arrow key to continue", 20, canvas.width/2, 600, "#eeeff7"]],

    ],
    [
    	["rightKey", []],
        ["a-bTable", ["t", "A -- B", 25, tableX, tableY + 0 * spacer, selectCol]],
        ["a-b", ["dl", v.a.x, v.a.y, v.b.x, v.b.y, selectCol]],
        ["a-b val", ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, selectCol]],
    ],
    [
        ["tableText", ["t", "<-- works", 25, tableX + 100, tableY + 0 * spacer, "#eeeff7"]], // A-B
    ],
    [
        ["a-bTable", ["t", "A -- B", 25, tableX, tableY + 0 * spacer, goodCol]],
        ["a-b", ["dl", v.a.x, v.a.y, v.b.x, v.b.y, goodCol]],
        ["a-b val", ["t", "2", 30, (v.a.x + v.b.x) / 2 - 5, (v.a.y + v.b.y) / 2 - 10, goodCol]],
    ],
    //e-c
    [
        ["tableText", []],
        ["e-cTable", ["t", "E -- C", 25, tableX, tableY + 1 * spacer, selectCol]], // E-C
        ["c-e", ["dl", v.c.x, v.c.y, v.e.x, v.e.y, selectCol]], // C-E
        ["c-e val", ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, selectCol]], // C-E
    ],
    [
        ["tableText", ["t", "<-- works", 25, tableX + 100, tableY + 1 * spacer, "#eeeff7"]], // A-B
    ],
    [
        ["e-cTable", ["t", "E -- C", 25, tableX, tableY + 1 * spacer, goodCol]], // E-C
        ["c-e", ["dl", v.c.x, v.c.y, v.e.x, v.e.y, goodCol]], // C-E
        ["c-e val", ["t", "2", 30, (v.c.x + v.e.x) / 2 + 15, (v.c.y + v.e.y) / 2 + 30, goodCol]], // C-E
    ],
    //b-c
    [
        ["tableText", []],
        ["b-c", [ "dl", v.b.x, v.b.y, v.c.x, v.c.y, selectCol]], // B-C
        ["b-cTable", ["t", "B -- C", 25, tableX, tableY + 2 * spacer, selectCol]], // B-C
        ["b-c val", ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, selectCol]], // B-C
    ],
    [
        ["tableText", ["t", "<-- works", 25, tableX + 100, tableY + 2 * spacer, "#eeeff7"]], // A-B
    ],
    [
        ["b-c", ["dl", v.b.x, v.b.y, v.c.x, v.c.y, goodCol]], // B-C
        ["b-cTable", ["t", "B -- C", 25, tableX, tableY + 2 * spacer, goodCol]], // B-C
        ["b-c val", ["t", "3", 30, (v.b.x + v.c.x) / 2 - 25, (v.b.y + v.c.y) / 2, goodCol]], // B-C
    ],
    //a-f
    [
        ["tableText", []],
        ["a-f", ["dl", v.a.x, v.a.y, v.f.x, v.f.y, selectCol]], // B-C
        ["a-fTable", ["t", "A -- F", 25, tableX, tableY + 3 * spacer, selectCol]], 
        ["a-f val", ["t", "3", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2, selectCol]], // B-C
    ],
    [
        ["tableText", ["t", "<-- works", 25, tableX + 100, tableY + 3 * spacer, "#eeeff7"]], // A-B
    ],
    [
        ["a-f", ["dl", v.a.x, v.a.y, v.f.x, v.f.y, goodCol]], // B-C
        ["a-fTable", ["t", "A -- F", 25, tableX, tableY + 3 * spacer, goodCol]], 
        ["a-f val", ["t", "3", 30, (v.a.x + v.f.x) / 2 - 25, (v.a.y + v.f.y) / 2, goodCol]], // B-C
    ],

    //d-g
    [
        ["tableText", []],
        ["d-g", ["dl", v.d.x, v.d.y, v.g.x, v.g.y, selectCol]], // B-C
        ["d-gTable", ["t", "D -- G", 25, tableX, tableY + 4 * spacer, selectCol]], 
        ["d-g val", ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, selectCol]], // B-C
    ],
    [
        ["tableText", ["t", "<-- works", 25, tableX + 100, tableY + 4 * spacer, "#eeeff7"]], // A-B
    ],
    [
        ["d-g", ["dl", v.d.x, v.d.y, v.g.x, v.g.y, goodCol]], // B-C
        ["d-gTable", ["t", "D -- G", 25, tableX, tableY + 4 * spacer, goodCol]], 
        ["d-g val", ["t", "5", 30, (v.d.x + v.g.x) / 2 + 20, (v.d.y + v.g.y) / 2 - 5, goodCol]], // B-C
    ],
    //a-e
    [
        ["tableText", []],
        ["a-e", ["dl", v.a.x, v.a.y, v.e.x, v.e.y, selectCol]], // B-C
        ["a-eTable", ["t", "A -- E", 25, tableX, tableY + 5 * spacer, selectCol]], 
        ["a-e val", ["t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, selectCol]], // B-C
    ],
    [
        ["tableText", ["t", "<-- Creates a Loop", 25, tableX + 150, tableY + 5 * spacer, "#eeeff7"]], // A-B
    ],
    /*[
        ["a-e", [0, false, "dl", v.a.x, v.a.y, v.e.x, v.e.y, goodCol]], // B-C
        ["a-eTable", [0, false, "t", "A -- E", 25, tableX, tableY + 5 * spacer, goodCol]], 
        ["a-e val", [0, true, "t", "6", 30, (v.a.x + v.e.x) / 2, (v.a.y + v.e.y) / 2 + 45, goodCol]], // B-C
    ],*/

    //c-d
    [
        ["tableText", []],
        ["c-d", ["dl", v.c.x, v.c.y, v.d.x, v.d.y, selectCol]], // B-C
        ["c-dTable", ["t", "C -- D", 25, tableX, tableY + 6 * spacer, selectCol]], 
        ["c-d val", ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, selectCol]], // B-C
    ],
    [
        ["tableText", [0, false, "t", "<-- works", 25, tableX + 100, tableY + 6 * spacer, "#eeeff7"]], // A-B
    ],
    [
        ["c-d", ["dl", v.c.x, v.c.y, v.d.x, v.d.y, goodCol]], // B-C
        ["c-dTable", ["t", "C -- D", 25, tableX, tableY + 6 * spacer, goodCol]], 
        ["c-d val", ["t", "7", 30, (v.c.x + v.d.x) / 2, (v.c.y + v.d.y) / 2 - 5, goodCol]], // B-C
    ],
    [
        ["tableText", []],
        ["stepTitle", ["t", "All Vertices are connected", 40, canvas.width / 2, 70, "#eeeff7"]], // A-B
    ],

    [
        ["a-e", []],
        ["a-eTable", []],
        ["a-e val", []],

        ["e-f", []],
        ["f-eTable", []],
        ["e-f val", []],

        ["e-g", []],
        ["e-gTable", []],
        ["e-g val", []],

        ["b-d", []],
        ["b-dTable", []],
        ["b-d val", []],

        ["a-c", []],
        ["a-cTable", []],
        ["a-c val", []],

        ["f-g", []],
        ["f-gTable", []],
        ["f-g val", []],
        ["c-dTable", ["t", "C -- D", 25, tableX, tableY + 5 * spacer, goodCol]], 

    ],
    [
        ["stepTitle", ["t", "All Vertices are connected", 40, canvas.width / 2, 70, "#eeeff7"]], // A-B
    ],
    [
        ["stepTitle", ["t", "Kruskal's Algorithm is complete", 40, canvas.width / 2, 70, "#eeeff7"]], // A-B
    ],
    [
        ["rightKey", ["t", "Press the right arrow key to restart", 20, canvas.width/2, 600, "#eeeff7"]],

    ],

];