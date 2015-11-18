prototypefabric;
var prototypefabric = new function(){
	var canvas = new fabric.Canvas('myCanvas', { width: 400, height: 400, backgroundColor: '#0D1E2C'});
	canvas.renderAll();
	this.addtext = function(){		
		var text = new fabric.IText('hello world', { left: 100, top: 100,backgroundColor: 'transparent', textAlign : 'center' ,class: 'text'});
		canvas.add(text);
		canvas.renderAll();
	}
	this.setCanvasWidth = function(width, height){
		canvas.setHeight(height);
		canvas.setWidth(width);
		canvas.renderAll();
	}
	this.addImage = function(source){
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
	this.opacity = function(opacity){
		var obj = canvas.getActiveObject();
		obj.setOpacity(opacity/100);
		canvas.renderAll();
	}

	this.duplicate = function(){
		var obj = canvas.getActiveObject();
		if (obj.class == "text") {
            var clone = obj.clone();
            clone.set({
                top: clone.get('top') + 10,
                left: clone.get('left') + 10,
                class: obj.class,
                //original_scaleX: clone.get('scaleX'),
                //original_scaleY: clone.get('scaleY'),
                //original_left: clone.get('left') + 10,
                //original_top: clone.get('top') + 10,
                lockScalingX: true,
                lockScalingY: true,
                hasControls: true,
                angle:obj.angle,
                fill:obj.fill,
                scaleY:obj.scaleY,
                scaleX:obj.scaleX
            });
            canvas.add(clone);
            canvas.setActiveObject(clone);
            canvas.renderAll();
        }
        canvas.renderAll();
	}

	this.setcolor = function(color){
		var obj = canvas.getActiveObject();
		obj.setColor(color);
		canvas.renderAll();
	}
	this.removeObj =function (){
		var obj = canvas.getActiveObject();
		obj.remove();
	}
	canvas.renderAll();
}