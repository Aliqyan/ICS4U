ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillStyle = '#486BEC';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240,160,20,0, Math.PI*2, false);
ctx.fillStyle = '#00FF1E';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160,10,100,40);
ctx.strokeStyle = '#63EBFF';
ctx.stroke();
ctx.closePath();