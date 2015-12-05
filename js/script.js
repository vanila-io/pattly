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

    $("#width").keyup(function(){
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
				prototypefabric.setobjectsize(parseInt($("#width").val()),parseInt(Temp_height));
			}
			if($(this).attr('id') == 'height'){// Check if height has been changed
				console.log();
				var Temp_height = parseInt($("#height").val());
				var Temp_width = Temp_height * (ratio_WH);//Width will change accordingly
				$('#width').val(parseInt(Temp_width));
				prototypefabric.setobjectsize(parseInt(Temp_width),parseInt($("#height").val()));
			}
			return;
		}
		//console.log('asd');
		prototypefabric.setobjectsize(parseInt($("#width").val()),parseInt($("#height").val()));
		if(parseInt($("#width").val()) > parseInt($("#height").val()))
		{
			var cn_height = $(".canvas-container").height();
			var c_height = Math.floor($('.container').height());
			var temp_height = (c_height - cn_height)/2;
			console.log(cn_height, c_height, temp_height,parseInt($("#height").val()));
			if(temp_height > 0){
				$('.canvas-container').css({
					'position' :'absolute',
					'margin-top': temp_height+'px'
				});
			}
			else{
				$('.canvas-container').css({
					'position' :'relative',
					'margin-top': '0px'
				});
			}
		}
		else{
			$('.canvas-container').css({
				'position' :'relative',
				'margin-top': '0px'
			});
		}
	});

    $("#height").keyup(function(){
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
                prototypefabric.setobjectsize(parseInt($("#width").val()),parseInt(Temp_height));
            }
            if($(this).attr('id') == 'height'){// Check if height has been changed
                console.log();
                var Temp_height = parseInt($("#height").val());
                var Temp_width = Temp_height * (ratio_WH);//Width will change accordingly
                $('#width').val(parseInt(Temp_width));
                prototypefabric.setobjectsize(parseInt(Temp_width),parseInt($("#height").val()));
            }
            return;
        }
        //console.log('asd');
        prototypefabric.setobjectsize(parseInt($("#width").val()),parseInt($("#height").val()));
        if(parseInt($("#width").val()) > parseInt($("#height").val()))
        {
            var cn_height = $(".canvas-container").height();
            var c_height = Math.floor($('.container').height());
            var temp_height = (c_height - cn_height)/2;
            console.log(cn_height, c_height, temp_height,parseInt($("#height").val()));
            if(temp_height > 0){
                $('.canvas-container').css({
                    'position' :'absolute',
                    'margin-top': temp_height+'px'
                });
            }
            else{
                $('.canvas-container').css({
                    'position' :'relative',
                    'margin-top': '0px'
                });
            }
        }
        else{
            $('.canvas-container').css({
                'position' :'relative',
                'margin-top': '0px'
            });
        }
    });

	$('#ratio').change(function(){ 
		if($(this).is(':checked')){//If Ratio Checkbox clicked
			var width = $("#width").val();
			var height = $("#height").val();
			ratio_HW = parseInt(height)/parseInt(width);
			ratio_WH = parseInt(width)/parseInt(height);
			console.log(ratio_HW, ratio_WH);
			flag = 1;
		}
		else{
			flag = 0;
		}
	});
    $("#Exportbtn").click(function(){
        var ExportHeight = document.getElementById("NewWidthEx").value;
        var ExportWidth = document.getElementById("NewHeightEx").value;
        console.log(ExportHeight,ExportWidth);
        prototypefabric.ExportImage(ExportWidth,ExportHeight);
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