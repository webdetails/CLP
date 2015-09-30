require(['cdf/lib/jquery'], function($) {
    
	
	// Configure Icon and Logo

    // display at top left corner
    var mastheadContent = 
    '<div class="col-xs-12">'+
    '   <div id="logoObj" class="logoObj "></div>'+
    '</div>'; 
    
    // append contents to html
    $('#logoRow').html(mastheadContent);
    
    // Configure Overlay Message here
    var overlayMessage = ''+
    '<div>'+
        '<div id="overlayMessage" class="overlayMessage">'+
    		'<div id="overlayHeaderRow" class="row clearfix ">'+
    			'<div class="col-xs-12 last">'+
    				'<div id="overlayHeaderObj" class="overlayHeader ">Community Launch Pad</div>'+
    			'</div>'+
    		'</div>'+
    		'<div id="overlayText" class="row clearfix ">'+
    			'<div class="col-xs-12 last">'+
    				'<div id="overlayTextObj" class="overlayText ">'+
    					'<p>This is the Community Launch Pad plugin. This plugin lists the contents of a folder in the Pentaho 		Repository (accessible via the Pentaho User Console), allowing for the selection and display of these contents. By default, the plugin loads the contents of the BI Developer Examples (SteelWheels reports). The default configuration is set in the plugin\'s clp.xml file.</p>'
    				'</div>'+
    			'</div>'+
    		'</div>'+
    	'</div>'+
    '</div>' ;
	
	
	


    
    $('#overlayMessageObj').html(overlayMessage);
    
	
	// Configure about button and message here
	
    // About message we want to present
    var aboutMsg = '<a>About</a>';
    
    //append to html
    $('.aboutClass').html(aboutMsg);
    
    // display message dialog
    $('.aboutClass').click(function(){
        $('#overlayMessage').dialog({
            resizable: false,
            height:300,
            width:500,
            modal: true,
            buttons: {
                "Proceed": function() {
                  $( this ).dialog( "close" );
                }
            },
            create:function () {
            $(this).closest(".ui-dialog")
                .find(".ui-button:first") // the first button
                .addClass("proceedClass");
            }
        });
    });
});
