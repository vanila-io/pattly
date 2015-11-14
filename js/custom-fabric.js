prototypefabric;
var prototypefabric = new function(){
	var canvas = new fabric.Canvas('myCanvas', { width: 400, height: 400, backgroundColor: '#0D1E2C'});
	canvas.renderAll();
	this.addtext = function(){		
		var text = new fabric.IText('hello world', { left: 100, top: 100,backgroundColor: 'transparent', textAlign : 'center' });
		canvas.add(text);
		canvas.renderAll();
	}
	this.setCanvasWidth = function(width, height){
		canvas.setHeight(height);
		canvas.setWidth(width);
		canvas.renderAll();
	}
	this.addImage = function(source){
		console.log(source);
		fabric.Image.fromURL(source, function(img) {
		  img.filters.push(new fabric.Image.filters.Grayscale());

		  img.applyFilters(canvas.renderAll.bind(canvas));

	
		  canvas.add(img);
		});
	}
	this.changeBackground = function(color){
		canvas.setBackgroundColor(color);
		canvas.renderAll();
	}
	canvas.renderAll();
}