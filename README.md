#CLP

This is the Community Launch Pad plugin.
This plugin lists the contents of a folder in the Pentaho Repository (accessible via the Pentaho User Console),
allowing for the selection and display of these contents.

By default, this plugin loads the contents of the BI Developer Example (SteelWheels reports).
The plugin's default configuration is set in the plugin's clp.xml file. This configuration can be overridden by 
placing a customized version of this file in /public/clp/clp.xml, using the Pentaho User Console


##Customizing the CLP
The clp.xml file defines the settings that of the CLP plugin. These settings are:
	- the name of the repository in the Pentaho User Console (PUC)
	- the basepath points to the folder location in the PUC that we want to display
	- the whitelist attributes specifies the types of files that are to be made available in the selector
	- the css and js attributes refer the CSS and JS files used for customizing the CLP.

Example:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configs>
	<config>
		<name>SteelWheels</name>
		<basepath>/public/bi-developers/legacy-steel-wheels/steel-wheels-4.8</basepath>
		<whitelist>\.wcdf$|\.prpti$|\.prpt$|\.xdash$|.xanalyzer$</whitelist>
		<css>/system/CLP/static/custom/css/clpCSS.css</css>
		<js>/system/CLP/static/custom/js/clpJS.js</js>
	</config>
</configs>
```

The path to the CSS and JS files is retrieved by a ktr endpoint, which feeds the paths to these files to the CLP dashboard.

The CLP plugin has three main areas: the selection pane where the viewable contents are available for selection, a header area which houses the selection pane toggle button and can be customized with a title or image, as well as an 'about' button area. The third area is the visualization pane where the contents are displayed.

Customization of the header area is done using the JS file. This file you can create customized html elements which can be appended to the html placeholders, defined in the cde, using jquery.
The html placeholders we can modify are the **logoRow**:

https://github.com/webdetails/CLP/blob/master/static/custom/js/clpJS.js#L6:L13

and **aboutInfoCol**:

https://github.com/webdetails/CLP/blob/master/static/custom/js/clpJS.js#L44:L50

The **logoRow** html placeholder can be retrieved using either the div id ```#logoRow``` or the ```.logoRow``` class. In similar fashin, the aboutInfoCol can be accessed using either the div id ```#aboutInfoObj```  or its class ```.aboutClass```.

The selection pane toggle button is appended to the **drawerButtonObj** div id. If you need to customize this button, do it exclusively in the CSS file, using the **```.drawerButton button```** selector.

In case you want to use an overlay or dialog, these can be anchored to the ```#overlayMessageObj``` div element. 

Besides appending html, we can also bind jquery events to trigger a dialog element, or a message overlay, for instance:

https://github.com/webdetails/CLP/blob/master/static/custom/js/clpJS.js#L49:L72

Elements appended using the js file, shoud be styled using the css file.

##CLP Contents


The CLP functions as a launcher of various types of Pentaho Reports, located within a folder accessible through the Pentaho User Console. This folder is specified in the basepath configuration in the clp.xml file:

https://github.com/webdetails/CLP/blob/master/clp.xml#L12

The contents of this folder are retrieved via a kettle endpoint. This result is handled by the plugin's template component, which generates the html structure of the selector.

When the selector first loads, it will parse it's own html structure, rendering the first item it encounters in the visualization pane. Before an item is rendered in the visualization pane, a check is conducted to determine if  the file is a CTools dashboard, the  dashboard is injected into the visualization pane, using require JS. For the other content types, defined in the whitelist (https://github.com/webdetails/CLP/blob/master/clp.xml#L13), these are rendered in an iframe.
