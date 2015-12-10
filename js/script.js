$(document).ready(function(){
		/* find ratio of canvas */
	var cw = $('.canvasContainer').width();
	var ch = $('.canvasContainer').height();
	
	var flag = 0;
	var flagWd = 0;
	var flagHt = 0;
	var ratio_WH = 0;
	var ratio_HW = 0;
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
	$("div.canvas-container").css({margin:"0 auto"});

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
    $("#test5").change(function(){
    	var opacity = $("#test5").val();
    	prototypefabric.opacity(opacity);
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
        if(width >= height){
            if(width >= divwidth){
                var r = divwidth / width;
                width = parseInt(width * r);
                height = parseInt(height * r);
                if(height>divheight) {
                    //console.log('Height Here ::: '+height);
                    height = parseInt(divheight - 1);
                }
            }
            else{
                if(height >= divheight){
                    var r = divheight / height ;
                    width = parseInt(width * r);
                    height = parseInt(height * r);
                }
            }
        }
        else{
            if(height >= divheight){
                var r = divheight / height;
                width = parseInt(width * r);
                height = parseInt(height * r);
                if(width>divwidth)
                {
                    //console.log('Height Here ::: '+width);
                    width = parseInt(divwidth-1);
                }
            }
            else{
                if(width >= divwidth){
                    var r = divwidth / width;
                    width = parseInt(width * r);
                    height = parseInt(height * r);
                }
            }
        }
        //console.log('Width : '+width+' Height : '+height+' Canvas Width : '+divwidth+' Canvas Height : '+divheight);
        prototypefabric.setobjectsize(width, height);
        if(width<divwidth)
        {
            var temp_width = parseInt((divwidth-width)/2);
            //console.log('Width Center ::: '+temp_width+' Width Big Canvas : '+divwidth+' Width Canvas : '+width);
            $('.canvas-container').css({
                'position' :'absolute',
                'margin-left': temp_width+'px'
            });
        }
        if(height<divheight) {
            var cn_height = $(".canvas-container").height();
            var c_height = $('.container').height();
            var temp_height =  parseInt((c_height - cn_height)/2);
            //console.log('Height Center ::: '+temp_height);
            $('.canvas-container').css({
                'position' :'absolute',
                'margin-top': temp_height+'px'
            });
        }
        if((height+divheight)>divheight)
        {
            var cn_height = $(".canvas-container").height();
            var c_height = $('.container').height();
            var temp_height =  parseInt((c_height - cn_height)/2);
            //console.log('Height Center ::: '+temp_height);
            $('.canvas-container').css({
                'position' :'absolute',
                'margin-top': temp_height+'px'
            });
        }

        if((width+divwidth)>divwidth)
        {
            var temp_width = parseInt((divwidth-width)/2);
            //console.log('Width Center ::: '+temp_width+' Width Big Canvas : '+divwidth+' Width Canvas : '+width);
            $('.canvas-container').css({
                'position' :'absolute',
                'margin-left': temp_width+'px'
            });
        }
    }

	$("#width,#height").keyup(function(){
		var width  = $('#width').val();
		var height = $('#height').val();
		var divwidth = $('.canvasBig').width();
		var divheight = $('.container').height();

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
        console.log(color);
        prototypefabric.setcolor(color);
    });
    Colorpicker.on('newcolor', function(ev, colorpicker, component, value){
    	color = colorpicker.toCssString();
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