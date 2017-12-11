var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// drawText(text, size, posX, posY, color)
// drawCircle(posX, posY , radius, color)
// drawLine(posX1, posY1, posX2, posY2)

var commands = [	[
						["t", "Kruskal's Algorithm", 40, canvas.width/2, 50, "#d3d0cb"]
					],
					[
						["t", "Kruskal's Algorithm", 40, canvas.width/2, 50, "#d3d0cb"],
						["t", "Definition: A minimum spanning tree, i.e. the shortest route to connect all paths together", 20, canvas.width/2, 100, "#d3d0cb"]
					],
					[
						["t", "Kruskal's Algorithm", 40, canvas.width/2, 50, "#d3d0cb"],
						["dc", 100, 100, 20, "#d3d0cb"],
						["dc", 250, 200, 20, "#d3d0cb"],
						["dc", 540, 300, 20, "#d3d0cb"],
						["dc", 340, 400, 20, "#d3d0cb"],


						["dl", 100, 100, 250, 200],



					]

				];