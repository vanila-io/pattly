var exportRatio = 0;
var _color = "#0000ff";
var _ImgColor = "#0000ff";
$(document).ready(function(){
	/* find ratio of canvas */
    var padding = 20;
	var cw = $('.canvasContainer').width();
	var ch = $('.canvasContainer').height();
    $("#ColorVal").val(_color);
    var tempWidth = ($('#main-container').width())-$('#main-container>.side-nav').width();
    var tempHeight = ($('#main-container').height());
    SizeSetup(500,500,tempWidth,tempHeight);
	var flag = 0;
	var flagWd = 0;
	var flagHt = 0;
	var ratio_WH = 0;
	var ratio_HW = 0;

    $("#ImgColorVal").val("#0000FF");
    /*$("#textColorPicker").spectrum({
        color: _color
    });*/

	function calculateCanvasSize(original_width,original_height,type){
	    var pageMaxHeight = $('.canvasarea').height();
	    canvasWidth = original_width;
	    canvasHeight = original_height;
	    canvasSizeType = type;
	    mul = (type == 'inches' ? 96 : 1152);
	    sign = (type == 'inches' ? '"' : "'");
	    if (original_width > 0 && original_height > 0) {
	        width = original_width * mul;
	        height = original_height * mul;
	        _wid = $('.canvasarea').width() / width;
	        width = width * _wid;
	        height = height * _wid;
	        if(height > pageMaxHeight)
	        {
	            ratio = pageMaxHeight/height;
	            width = width*ratio;
	            height = height*ratio;
	        }
	        $('.canvasarea').css('padding-top',($('.canvasarea').height()-height)/2);
	        prototypefabric.setCanvasSize(width, height,original_width,original_height,type);
	        $('div#canvasSizeText').html(original_width + sign + 'x' + original_height + sign);
	    }
    }
	/* get file type source */
	var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
               	prototypefabric.addImage(e.target.result);
                setTimeout(function(){
                    /*popups.imagepopup.update(prototypefabric.getCurrentObject());
                    popups.imagepopup.show();
                    popups.imagepopupResponsive.show();*/
                    $(".file-upload").val('');
                },1000);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

	  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
	//$("div.canvas-container").css({margin:"0 auto"});

	$('#addtext').click(function(){
		prototypefabric.addtext();
	});
	/* browse / browse Svg*/
	$('#browse,#browse1').click(function(){
		$("#hidden-input").trigger('click');
	});
	$("#hidden-input,#hidden-input1").on('change', function(){
        readURL(this);
    });
    $("#test5a").change(function(){
        var opacity = $("#test5a").val();
        console.log("HERE IN #test5a");
        prototypefabric.opacity(opacity);
    });
    $("#test5b").change(function(){
        var opacity = $("#test5b").val();
        console.log("HERE IN #test5b");
        prototypefabric.textopacity(opacity);
    });
    $("#duplicate").click(function(){
    	prototypefabric.duplicate();
    });
    $("#remove").click(function(){
    	prototypefabric.removeObj();
    });
    $("#duplicateText").click(function(){
    	prototypefabric.duplicate();
    });
    $("#removeText").click(function(){
    	prototypefabric.removeObj();
    });

	/***************************** AHMAD's CODE *****************************/
    function SizeSetup(width,height,divwidth,divheight)
    {
        width = parseFloat(width);
        height = parseFloat(height);
        if(width > height){

            var ratio = (divwidth-padding)/width;
            exportRatio = ratio;
            var newwidth = width * ratio;
            var newheight = height * ratio;
            prototypefabric.setobjectsize(newwidth, newheight);
        }
        else if(height > width){
            var ratio = (divheight-padding)/height;
            exportRatio = ratio;
            var newwidth = width * ratio;
            var newheight = height * ratio;
            prototypefabric.setobjectsize(newwidth, newheight);
        }
        else{
            var ratio = (divheight-padding)/height;
            exportRatio = ratio;
            var newwidth = width * ratio;
            var newheight = height * ratio;
            prototypefabric.setobjectsize(newwidth, newheight);
        }
        var mtop = Math.abs(newheight-divheight)/2;
        var mleft = Math.abs(newwidth-divwidth)/2;
        $('.canvas-container').css({
            'position' :'absolute',
            'margin-left': mleft,
            'margin-top':mtop
        });
    }
    var map = [];
    $(window).bind('keydown', function(e) {

        map[e.keyCode] = e.type;
        console.log(map);
        if(e.keyCode == 46)
        {
            prototypefabric.removeObj();
            return;
        }
        if(map[17] && map[38]&&map[16])//Rotate Top to down with increment of 10
        {
            prototypefabric.angle_top_down(1,50);
            return;
        }
        else if(map[17] && map[40]&&map[16])//Rotate Down to top with increment of 10
        {
            prototypefabric.angle_top_down(0,50);
        }
        else if (map[17] && map[38]) { //Rotate Top to down with increment of 1
            prototypefabric.angle_top_down(1,1);

        }
        else if (map[17] && map[40]) {//Rotate Down to top with increment of 1
            prototypefabric.angle_top_down(0,1);

        }
        else if(map[16] && map[38] )//top with increment of 10
        {
            prototypefabric.keyboard_Movement(0, 10, 0, 0);
        }
        else if(map[16] && map[40] )//down with increment of 10
        {
            prototypefabric.keyboard_Movement(10, 0, 0, 0);
        }
        else if(map[16] && map[39] )//right with increment of 10
        {
            prototypefabric.keyboard_Movement(0, 0, 10, 0);
        }
        else if(map[16] && map[37] )//left with increment of 10
        {
            prototypefabric.keyboard_Movement(0, 0, 0, 10);
        }
        else {
            if (e.keyCode == 37) {//************* Key LEFT
                prototypefabric.keyboard_Movement(0, 0, 0, 1);
                //console.log('left');
            } else if (e.keyCode == 38) {//************* UP
                prototypefabric.keyboard_Movement(0, 1, 0, 0);
                console.log('up');
            } else if (e.keyCode == 39) {
                prototypefabric.keyboard_Movement(0, 0, 1, 0);
                console.log('right');
            } else if (e.keyCode == 40) {
                prototypefabric.keyboard_Movement(1, 0, 0, 0);
                console.log('down');
            }
        }

    });
    $(window).bind('keyup', function(e){
        map = [];
    });

	$("#width,#height").keyup(function(){
		var width  = $('#width').val();
		var height = $('#height').val();
		//var divwidth = $('.canvasBig').width();
		//var divheight = $('.container').height();

        var divwidth = $('#main-container').width()-$('#main-container>.side-nav').width();
        var divheight = $('#main-container').height();

        var chatinput = document.getElementById("width").value;
        if (chatinput == "" || chatinput.length == 0 || chatinput == null)//If Width equals Null Exit
        {
            return;
        }
        chatinput = document.getElementById("height").value;
        if (chatinput == "" || chatinput.length == 0 || chatinput == null)//If Height equals Null Exit
        {
            return;
        }
        if(flag == 1){
            if($(this).attr('id') == 'width'){// Check if width has been changed
                var Temp_width = parseInt($("#width").val());
                var Temp_height = Temp_width * (ratio_HW);//Height will change accordingly
                $('#height').val(parseInt(Temp_height));
                SizeSetup(width,parseInt(Temp_height),divwidth,divheight);
            }
            if($(this).attr('id') == 'height'){// Check if height has been changed
                console.log();
                var Temp_height = parseInt($("#height").val());
                var Temp_width = Temp_height * (ratio_WH);//Width will change accordingly
                $('#width').val(parseInt(Temp_width));
                SizeSetup(parseInt(Temp_width),height,divwidth,divheight);
            }
            return;
        }
        //console.log('asd');
        SizeSetup(width,height,divwidth,divheight);


	});

	$('#ratio').change(function(){ 
		if($(this).is(':checked')){//If Ratio Checkbox clicked
			var width = $("#width").val();
			var height = $("#height").val();
			ratio_HW = parseInt(height)/parseInt(width);
			ratio_WH = parseInt(width)/parseInt(height);
			//console.log(ratio_HW, ratio_WH);
			flag = 1;
		}
		else{
			flag = 0;
		}
	});
    $("#Exportbtn").click(function(){
        var ExportHeight = document.getElementById("NewHeightEx").value;
        var ExportWidth = document.getElementById("NewWidthEx").value;
        var Width = parseInt($("#width").val());
        var Height = parseInt($("#height").val());
        //console.log(ExportHeight,ExportWidth);
        prototypefabric.ExportImage(Width,Height,ExportWidth,ExportHeight);
        var mtop = Math.abs($('#myCanvas').height()-$('#main-container').height())/2;
        var mleft = Math.abs($('#myCanvas').width()-tempWidth)/2;
        console.log('Here '+mtop+':'+mleft);
        $('.canvas-container').css({
            'position' :'absolute',
            'margin-left': mleft,
            'margin-top':mtop
        });
    });

    $('#ImgColorVal').change(function(){
        //_ImgColor
        var col = $('#ImgColorVal').val();
        if(_ImgColor!=col) {
            $("#imageColorPicker").spectrum({
                color:col,
                allowEmpty:true,
                move: function(color) {
                    prototypefabric.setImgcolor(color.toHexString());
                }
            });
            prototypefabric.setImgcolor(col);
            console.log("HERE");
            _ImgColor = col;
        }
    });
    $("#imageColorPicker").spectrum({
        color: "blue",
        allowEmpty:true,
        move: function(color) {
            prototypefabric.setImgcolor(color.toHexString());
        }
    });
    
    /*$('#ImgColorVal').onmove(function(){
        //_ImgColor
        var col = $('#ImgColorVal').val();
        if(_ImgColor!=col) {
            prototypefabric.setcolor(col);
            $("#imageColorPicker").spectrum({
                color: col
            });

            console.log("HERE");
            _ImgColor = col;
        }
    });*/
    $('#ColorVal').change(function(){
        var col = $('#ColorVal').val();
        if(_color!=col) {
            prototypefabric.setcolor(col);
            $("#textColorPicker").spectrum({
                color: col
            });

            console.log("HERE");
            _color = col;
        }
    });
    $('#ColorVal').onmove(function(){
        var col = $('#ColorVal').val();
        if(_color!=col) {
            prototypefabric.setcolor(col);
            $("#textColorPicker").spectrum({
                color: col
            });
            console.log("HERE");
            _color = col;
        }
    });

	/***************************** AHMAD'S CODE END *****************************/

	/* color picker*/
	ColorPicker = $('.my-color-picker').colorpicker({
	  color: 'hsl(10, 30%, 30%)',
	  colorSpace: 'hsl',
	  displayColor: 'hex'
	});
    ColorPicker.on('newcolor', function (ev, colorpicker, component, value) {
        color = colorpicker.toCssString();
        prototypefabric.changeBackground(color);
        $('#colorpickerHolder').val($('.output-wrapper').html());
    });
    ColorPicker = $('.my-color-picker1').colorpicker({
	  color: 'hsl(10, 30%, 30%)',
	  colorSpace: 'hsl',
	  displayColor: 'hex'
	});

    ColorPicker.on('newcolor', function (ev, colorpicker, component, value) {
        color = colorpicker.toCssString();
        console.log("asdfsd");
        prototypefabric.setcolor(color);
    });
    Colorpicker.on('newcolor', function(ev, colorpicker, component, value){
    	color = colorpicker.toCssString();
        console.log("123");
    	portotypefabric.setcolor(color);
    });
    $("#").click(function(){
        console.log("hi");
        prototypefabric.tint();
    });
});

/*var range_wrapper = '.range-field';
$(document).on('input change', range_type, function(e) {
    var thumb = $(this).siblings('.thumb');
    var humb = $(this).siblings('.thumb');
    thumb.find('.value').html($(this).val());
    humb.find('.val')
});
*/