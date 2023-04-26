window.onload = function() {
	//canvas init
	var browser = document.getElementById("canvas");
	var ctx = browser.getContext("2d");
  
	//canvas dimensions
	var w = window.innerWidth;
	var h = window.innerHeight;
	browser.width = w;
	browser.height = h;
  
	//snow particles values
	var num = 80;
	var snow = []; // 4 objects/array
	for (var i = 0; i < num; i++) {
	  snow.push({
		x: Math.random() * w, //x-coor
		y: Math.random() * h, //y-coor
		r: Math.random() * 4 + 1, //radius
		d: Math.random() * num //density
	  })
	}
	//draw particles
	/* https://github.com/rmlysik/javascript-snowflake/blob/master/index.html
	   https://codepen.io/vickp/pen/YxLwzX */
	function draw() {
	  ctx.clearRect(0, 0, w, h);
	  //ctx.beginPath();
	  c = Math.floor(num / 3);
	  for (var i = 0; i < num; i++) {
		var par = snow[i];
		ctx.beginPath();
		ctx.moveTo(par.x, par.y);
		ctx.arc(par.x, par.y, par.r, 0, 2 * Math.PI, true);
		if (i <= c) {
		  ctx.fillStyle = "#fffafa";
		  ctx.fill();
		}
		if (i > c && i < 2 * c) {
		  ctx.fillStyle = "#ddddFF";
		  ctx.fill();
		}
		if (i > 2 * c) {
		  ctx.fillStyle = "#ccccDD";
		  ctx.fill();
		}
	  }  
	  update();
	}
	//moving particles
	var angle = 0;
	function update() {
	  angle += 0.01;
	  for (var i = 0; i < snow.length; i++) {
		var par = snow[i];
		par.x += Math.sin(angle) * 0.7;
		par.y += Math.cos(angle + par.d) * 1.2 + 1 + par.r / 4;
  
		if (par.x > w + 5 || par.x < -5 || par.y > h) {
		  if (i % 4 > 0) {
			//66.67% of the flakes
			snow[i] = { x: Math.random() * w, y: -28, r: par.r, d: par.d };
		  } else {
			//If the flake is exitting from the right
			if (Math.sin(angle) > 0) {
			  //Enter from the left
			  snow[i] = { x: -6, y: Math.random() * h, r: par.r, d: par.d };
			} else {
			  //Enter from the right
			  snow[i] = { x: w + 8, y: Math.random() * h, r: par.r, d: par.d };
			}
		  }
		}
	  }
	}
	//loop animtion
	setInterval(draw, 35);
  }
  