"use strict"
class Asteroid extends GameObject
{
	constructor(canvas)
	{
		super();
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}
	
	tick(delta)
	{
		if(this.visible)
		{
			this.location.x += this.velocity.x * delta;
			this.location.y += this.velocity.y * delta;
			
			if(this.location.x < 0.0 || this.location.x > this.canvas.width)
			{
				this.location.x = (this.location.x + this.canvas.width) % this.canvas.width;
			}
			if(this.location.y < 0.0 || this.location.y > this.canvas.height)
			{
				this.location.y = (this.location.y + this.canvas.height) % this.canvas.height;
			}
		}
	}
	
	draw()
	{
		if(this.canvas == undefined)
		{
			console.log(typeof(this) + " : canvas undefined");
			return;
		}
		this.context.save();
		this.context.transform(1.0, this.orientation.x, this.orientation.y, 1.0, this.location.x, this.location.y);
		this.context.beginPath();
		this.context.strokeStyle = "#FFFFFF";
		this.context.lineWidth = 3;
		this.context.moveTo(-20.0, -20.0);
		this.context.lineTo(20.0, -20.0);
		this.context.lineTo(20.0, 20.0);
		this.context.lineTo(-20.0, 20.0);
		this.context.lineTo(-20.0, -20.0);
		this.context.stroke();
		this.context.restore();
	}
}