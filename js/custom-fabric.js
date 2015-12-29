prototypefabric;
var r = 0;
var prototypefabric = new function(){
	var canvas = new fabric.Canvas('myCanvas', { width: 400, height: 400, backgroundColor: '#0D1E2C'});
	canvas.renderAll();
    console.log(_gridFlag);
    
        canvas.on('object:moving', function(options) 
        { 
            if($("#GridRT").is(':checked') && _gridFlag==1)
            {
                options.target.set({
                left: Math.round(options.target.left / _gridSize) * _gridSize,
                top: Math.round(options.target.top / _gridSize) * _gridSize
              });
            }
        });

    canvas.on('object:selected', function(o){
        var object = o.target;
        console.log(object.fill);
        $(".sp-preview-inner").css('backgroundColor',object.fill);
        $("#ColorVal").val(object.fill);
        $(".sp-preview-inner").css('backgroundColor',object.fill);
        if(object.class == "image"){
            $("#ImgColorVal").val(object.color);
            $(".sp-preview-inner").css('backgroundColor',object.color);
        }
        if(object.class == "text")
        {
          $("#txtfont").val(object.fontFamily);
            $(".browser-default").css('setBackgroundColor',object.fontFamily);  
        }
        $("#test5b").val(object.opacity*100);
        $("#test5a").val(object.opacity*100);
        
        console.log(object);

    });

	this.addtext = function(_txtfontSelected){		
		var text = new fabric.IText('hello world', {
            left: 100,
            top: 100,
            backgroundColor: 'transparent',
            textAlign : 'left' ,
            class: 'text',
            originX : "left",
            originY : "left",
            fontFamily : _txtfontSelected
        });
        console.log(text);
		canvas.add(text);
		canvas.renderAll();
	}
    
    this.changeTextFont = function(_txtfontSelected){
        var obj = canvas.getActiveObject();
        if(obj && obj.class=="text"){
            obj.fontFamily = _txtfontSelected;
        }
        else
        {
            obj = canvas.getActiveGroup();
            if(obj) {
                for (var i = 0; i < obj._objects.length; i++) {
                    obj._objects[i].fontFamily = _txtfontSelected;
                }
            }
        }
        canvas.renderAll();
    }

	this.setCanvasWidth = function(width, height){
		if( width > height ){
			r = height/width;
			iwidth = 500;
			iheight = 500 * r;
		}
		else
		{
			r = width / height;
			iheight = 500;
			iwidth = 500 * r;
		}
		canvas.setHeight(iheight);
		canvas.setWidth(iwidth);
		canvas.renderAll();
	}
	
	/******************************* AHMAD'S CODE *******************************/

    this.angle_top_down = function(_flag,val){
        var obj = canvas.getActiveObject();
        if(obj) {
            if(_flag == 1)
            {
            obj.angle = obj.angle + val;
            }
            else
            {
                obj.angle = obj.angle - val;
            }
        }
        else
        {
            obj = canvas.getActiveObject();
            if(obj) {
                if (_flag == 1) {
                    for(var i = 0 ; i < obj._objects.length ; i++) {
                        obj._objects[i].angle = obj._objects[i].angle + val;
                    }
                }
                else {
                    for(var i = 0 ; i < obj._objects.length ; i++) {
                        obj._objects[i].angle = obj._objects[i].angle - val;
                    }
                }
            }
        }
        canvas.renderAll();
    }

    this.angle_top_down1 = function(_flag,val){
        var obj1 = canvas.getActiveGroup();
        if(obj1) {
            if(_flag == 1)
            {
            obj1.angle = obj1.angle + val;
            }
            else
            {
                obj1.angle = obj1.angle - val;
            }
        }
        else
        {
            obj1 = canvas.getActiveGroup();
            if(obj1) {
                if (_flag == 1) {
                    for(var i = 0 ; i < obj1._objects.length ; i++) {
                        obj1._objects[i].angle = obj1._objects[i].angle + val;
                    }
                }
                else {
                    for(var i = 0 ; i < obj1._objects.length ; i++) {
                        obj1._objects[i].angle = obj1._objects[i].angle - val;
                    }
                }
            }
        }
        canvas.renderAll();
    }


	this.setobjectsize = function(width, height)
    {
        canvas.setHeight(height);
        canvas.setWidth(width);
        canvas.renderAll();
    }



	this.calGcd = function (a, b) {
		if (b) {
			return this.calGcd(b, a % b);
		} else {
			return Math.abs(a);
		}
	}

    this.keyboard_Movement = function(Up, Down, Right, Left)
    {
        var obj = canvas.getActiveObject();
        var obj1 =canvas.getActiveGroup();
        if(obj) {
            obj.top = obj.top + Up;
            obj.top = obj.top - Down;
            obj.left = obj.left - Left;
            obj.left = obj.left + Right;
            canvas.renderAll();
        }
        else 
        {
            obj1.top = obj1.top + Up;
            obj1.top = obj1.top - Down;
            obj1.left = obj1.left - Left;
            obj1.left = obj1.left + Right;
            canvas.renderAll();

        }
       
          
    }


    this.ExportImage = function(width, height,ExportWidth,ExportHeight)
    {
        if(_gridFlag==0)
        {
            //this.removeGrid();
        canvas.discardActiveGroup();
        canvas.discardActiveObject();
        var _base64 = canvas.toDataURL();
        console.log(_base64);
        //this.makeGrid();
        TempCanvas = window._tmpCanvas = new fabric.Canvas(fabric.util.createCanvasElement());
        TempCanvas.setWidth(ExportWidth);
        TempCanvas.setHeight(ExportHeight);
        TempCanvas.setBackgroundColor({source: _base64, repeat: 'repeat'}, function () {
            TempCanvas.renderAll();
            url = TempCanvas.toDataURL();
            window.open(url);
            console.log(url);
            window.focus();

        });
        }
        else
        {
        this.removeGrid();
        canvas.discardActiveGroup();
        canvas.discardActiveObject();
        var _base64 = canvas.toDataURL();
        console.log(_base64);
        this.makeGrid();
        TempCanvas = window._tmpCanvas = new fabric.Canvas(fabric.util.createCanvasElement());
        TempCanvas.setWidth(ExportWidth);
        TempCanvas.setHeight(ExportHeight);
        TempCanvas.setBackgroundColor({source: _base64, repeat: 'repeat'}, function () {
            TempCanvas.renderAll();
            url = TempCanvas.toDataURL();
            window.open(url);
            console.log(url);
            window.focus();

        });  
        }
    }

   
	/******************************* AHMAD'S CODE END *******************************/
	
    this.removeGrid = function (){
        canvas.forEachObject(function(obj){
            if(obj.class=="grid")
            {
                obj.remove();
            }
        });
    }
     // this.checkRatio = function (){
        
     //    });
    //}

    this.makeGrid = function () {
        this.removeGrid();
        var CanvasSize = canvas.width;
        var LoopLength = CanvasSize/_gridSize;
        console.log('Grid Start');
        for(var i = 1; i <= LoopLength; i++) {
            var StartX=0;
            var StartY=_gridSize*i;
            var EndX=canvas.width;
            var EndY=_gridSize*i;
            var line = new fabric.Line([StartX, StartY, EndX, EndY], {
                stroke: _gridColor,
                strokeWidth: 0.3,
                hasControls: false,
                hasRotatingPoint: false,
                selectable:false,
                class:'grid'
            });
            canvas.add(line);
            canvas.sendBackwards(line);
            //canvas.sendToBack(line);
            console.log('Inside Grid');
        }

        for(var i = 1; i <= LoopLength; i++) {
            var StartX=_gridSize*i;
            var StartY=0;
            var EndX=_gridSize*i;
            var EndY=canvas.height;
            var line = new fabric.Line([StartX, StartY, EndX, EndY], {
                stroke: _gridColor,
                strokeWidth: 0.3,
                hasControls: false,
                hasRotatingPoint: false,
                selectable:false,
                class:'grid'
            });
            canvas.add(line);
            canvas.sendBackwards(line);
            //canvas.sendToBack(line);
            console.log('Inside Grid');
        }
        console.log('Grid End');
        canvas.renderAll();
    }
	this.addImage = function(source){
        var Left = canvas.width/2;
        var Top = canvas.height/2;
        	fabric.Image.fromURL(source, function(img) {
			img.class = 'image';
			img.source = source;
            img.id = "test";
            img.originX = "center";
            img.originY = "center";
            img.top = Top;
            img.left = Left;
            img.color = "#0000ff";
            console.log(img.width);
			canvas.add(img);
		});
	}

	this.changeBackground = function(color){
         $("#canvascolor").val(color);
		canvas.setBackgroundColor(color);
		canvas.renderAll();
	}
    this.FontBold = function()
    {
      var obj = canvas.getActiveObject();
      console.log(obj);
      if(obj.class=="text")
      {
            obj.set
        ({
            fontWeight: 'bold'

        });
       }
       canvas.renderAll();
    }
     this.FontUnderline = function()
    {
      var obj = canvas.getActiveObject();
      console.log(obj);
      if(obj.class=="text")
      {
            obj.set
        ({
            textDecoration: 'underline'

        });
       }
       canvas.renderAll();
    }
    this.Fontitalic = function()
    {
      var obj = canvas.getActiveObject();
      console.log(obj);
      if(obj.class=="text")
      {
            obj.set
        ({
            fontStyle: 'italic',
           fontFamily: 'Delicious'

        });
       }
       canvas.renderAll();
    }
    this.FontAlignRight = function()
    {
      var obj = canvas.getActiveObject();
      console.log(obj);
      if(obj.class=="text")
      {
            obj.set
        ({
            textAlign: 'right'

        });
       }
       canvas.renderAll();
    }
     this.FontAlignleft = function()
    {
      var obj = canvas.getActiveObject();
      console.log(obj);
      if(obj.class=="text")
      {
            obj.set
        ({
            textAlign: 'left'

        });
       }
       canvas.renderAll();
    }
     this.FontAlignCenter = function()
    {
      var obj = canvas.getActiveObject();
      console.log(obj);
      if(obj.class=="text")
      {
            obj.set
        ({
            textAlign: 'center'

        });
       }
       canvas.renderAll();
    }

	this.opacity = function(opacity){
		var obj = canvas.getActiveObject();
        if(obj && obj.class=="image"){
            obj.setOpacity(opacity/100);
        }
        else
        {
            obj = canvas.getActiveGroup();
            if(obj) {
                for (var i = 0; i < obj._objects.length; i++) {
                    obj._objects[i].opacity = opacity / 100;
                }
            }
        }
		canvas.renderAll();
	}
    this.textopacity = function(opacity){
        var obj = canvas.getActiveObject();
        if(obj && obj.class=="text"){
            obj.setOpacity(opacity/100);
        }
        else
        {
            obj = canvas.getActiveGroup();
            if(obj) {
                for (var i = 0; i < obj._objects.length; i++) {
                    obj._objects[i].opacity = opacity / 100;
                }
            }
        }
        canvas.renderAll();
    }
	this.canvasExport = function(){
		console.log(JSON.parse(decodeURIComponent(JSON.stringify(canvas))));
		canvas.renderAll();
	}

	this.duplicate = function(){
		var obj = canvas.getActiveObject();
        if(obj) {
            if (obj.class == "text") {
                console.log("HERE in TEXT");
                var clone = obj.clone();
                clone.set({
                    top: clone.get('top') + 10,
                    left: clone.get('left') + 10,
                    class: obj.class,
                    //original_scaleX: clone.get('scaleX'),
                    //original_scaleY: clone.get('scaleY'),
                    //original_left: clone.get('left') + 10,
                    //original_top: clone.get('top') + 10,
                    hasControls: true,
                    angle: obj.angle,
                    fill: obj.fill,
                    scaleY: obj.scaleY,
                    scaleX: obj.scaleX,
                    color:obj.color
                });
                //clone.color = _color;
                canvas.add(clone);
                canvas.setActiveObject(clone);
                canvas.renderAll();
            }
            else if (obj.class == "image") {
                console.log("HERE in IMAGE");
                console.log(obj);
                var col = "";
                if(obj.filters.length > 0)
                    col = obj.filters[0].color;
                fabric.Image.fromURL(obj.source, function (img) {
                    img.set({
                        top: obj.get('top') + 10,
                        left: obj.get('left') + 10,
                        class: obj.class,
                        //original_scaleX: img.get('scaleX'),
                        //original_scaleY: img.get('scaleY'),
                        //original_left: img.get('left') + 10,
                        //original_top: img.get('top') + 10,
                        hasControls: true,
                        angle: obj.angle,
                        fill: obj.fill,
                        scaleY: obj.scaleY,
                        scaleX: obj.scaleX,
                        opacity: obj.opacity
                    });
                    if(col != ""){
                        var filter = new fabric.Image.filters.Tint({
                            color: col,
                            opacity: 1
                        });
                        img.filters[0] = filter;
                        img.applyFilters(canvas.renderAll.bind(canvas));
                    }

                    canvas.add(img);
                    canvas.renderAll();
                });
                canvas.renderAll();
            }
        }
        else
        {
            alert();
            obj = canvas.getActiveGroup();
            canvas.discardActiveGroup().renderAll();
            if(obj) {
                console.log(obj);
                for (var i = 0; i < obj._objects.length; i++) {
                    //console.log(obj._objects[i].class);
                    if (obj._objects[i].class == "text") {
                        var clone = obj._objects[i].clone();
                        var _topVar = obj.top + obj._objects[i].top + 10 + (obj.height/2);
                        var _leftVar = obj.left + obj._objects[i].left + 10 + (obj.width/2);
                        clone.set({
                            top: _topVar,
                            left: _leftVar,
                            class: obj._objects[i].class,
                            //original_scaleX: clone.get('scaleX'),
                            //original_scaleY: clone.get('scaleY'),
                            //original_left: clone.get('left') + 10,
                            //original_top: clone.get('top') + 10,
                            hasControls: true,
                            angle: obj._objects[i].angle,
                            fill: obj._objects[i].fill,
                            scaleY: obj._objects[i].scaleY,
                            scaleX: obj._objects[i].scaleX
                        });
                        canvas.add(clone);
                        canvas.setActiveObject(clone);
                    }
                    else if (obj._objects[i].class == "image") {

                        var object = obj._objects[i];
                        console.log(object.left);
                        //var col = obj._objects[i].filters[0].color;
                        var col = object.filters[0].color;
                        fabric.Image.fromURL(object.source, function (img) {
                            img.set({
                                top: object.top + 10,
                                left: object.left + 10,
                                class: object.class,
                                hasControls: true,
                                angle: object.angle,
                                fill: object.fill,
                                scaleY: object.scaleY,
                                scaleX: object.scaleX,
                                opacity: object.opacity
                            });
                            var filter = new fabric.Image.filters.Tint({
                                color: col,
                                opacity: 1
                            });
                            img.filters[0] = filter;
                            img.applyFilters(canvas.renderAll.bind(canvas));
                            console.log(img);

                            canvas.add(img);
                            canvas.renderAll();
                        });
                        canvas.renderAll();
                    }
                }
                canvas.renderAll();
            }
        }
	}
	this.setcolor = function(color) {//Latest Modified
        console.log('--== >> '+color);
      $("#ColorVal").val(color);

        var obj = canvas.getActiveObject();
        if(obj){
            obj.fill = color;
            console.log(color);
        }
        else
        {
            obj = canvas.getActiveGroup();
            if(obj) {
                for (var i = 0; i < obj._objects.length; i++) {
                    obj._objects[i].fill = color;
                    console.log(' OBJ '+obj._objects[i].color);
                }
            }
        }
        canvas.renderAll();

	}

    this.setImgcolor = function(color) {//Latest Modified
        //var object = canvas.getActiveObject();
        var obj = canvas.getActiveObject();
        if(obj){
             var filter = new fabric.Image.filters.Tint({
                        color: color,
                        opacity: 1
                    });
                    obj.color = color;
                    obj.filters[0] = filter;
                    obj.applyFilters(canvas.renderAll.bind(canvas));
                    $("#ImgColorVal").val(color);
        }
        else {
            obj = canvas.getActiveGroup();
            if (obj) {
                for (var i = 0; i < obj._objects.length; i++) {
                    var filter = new fabric.Image.filters.Tint({
                        color: color,
                        opacity: 1
                    });
                    obj._objects[i].filters[0] = filter;
                    obj._objects[i].applyFilters(canvas.renderAll.bind(canvas));
                }
            }
        }

    }

	this.removeObj =function (){//Latest Modified
		var obj = canvas.getActiveObject();
        if(obj == null){
            obj = canvas.getActiveGroup();
            for(var i = 0 ; i < obj._objects.length ; i++) {
                console.log(obj._objects[i]);
                canvas.fxRemove(obj._objects[i]);
            }
            canvas.discardActiveGroup();
            canvas.renderAll();
        }
        else{
            canvas.fxRemove(obj);
            canvas.renderAll();
        }
        canvas.renderAll();
	}

	this.tint = function(color){
        alert('asd');
		var obj = canvas.getActiveObject();
		var filter = new fabric.Image.filters.Tint({
			color: color,
			opacity: 0.5
		});
		object.filters.push(filter);
		object.applyFilters(canvas.renderAll.bind(canvas));
		canvas.renderAll();
	}
	canvas.renderAll();
}


