#CLP

This is the Community Launch Pad plugin.
This plugin lists the contents of a folder in the Pentaho Repository (accessible via the Pentaho User Console),
allowing for the selection and display of these contents.

By default, this plugin loads the contents of the BI Developer Example (SteelWheels reports).
The plugin's default configuration is set in the plugin's clp.xml file. This configuration can be overridden by 
placing a customized version of this file in /public/clp/clp.xml, using the Pentaho User Console


##Customizing the CLP
The clp.xml file defines the settings that the CLP plugin will load. The settings are the name of the repository in the Pentaho User Console (PUC), the basepath points to the folder location in the PUC that we want to display, the whitelist attributes specifies the types of files that are to be made available in the selector, the css and js attributes refer the specific CSS and JS to be used for customizing the CLP.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configs>
	<config>
		<name>SteelWheels</name>
		<basepath>/public/bi-developers</basepath>
		<whitelist>\.wcdf$|\.prpti$|\.prpt$|\.xdash$|.xanalyzer$</whitelist>
		<css>/system/CLP/static/custom/css/clpCSS.css</css>
		<js>/system/CLP/static/custom/js/clpJS.js</js>
	</config>
</configs>
```

The path to the CSS and JS files is retrieved by an endpoint, which then passes these values on to the CLP dashboard.

The CLP plugin has three main areas: the selection pane where the reports available for viewing are displayed and made selectable for viewing, a header area which houses a selection pane toggle button and can be customized with a title or image, as well as an 'about' button area. The third area is the visualization pane where the reports are displayed.

Customization of the header area is done using the JS file. In this file we can create customized html elements which we then append to the html placeholders defined in the cde, using jquery.
The html placeholders we can modify are the logoRow:

https://github.com/webdetails/CLP/blob/master/static/custom/js/clpJS.js#L6:L13

and aboutInfoCol:

https://github.com/webdetails/CLP/blob/master/static/custom/js/clpJS.js#L44:L50

We can fetch the logoRow using either the div id ```#logoRow``` or the ```.logoRow``` class. Similarly we can fetch the aboutInfoCol using the div id ```#aboutInfoObj```  or its class ```.aboutClass```.

The selection pane toggle button is appended to the drawerButtonObj div id. If you need to customize this button, do it exclusively in the CSS file, using the .drawerButton class.

In case you want to use an overlay or dialog we have included a div, to which you can anchor these elements, until you're ready to display them. This div's id is ```#overlayMessageObj```.

Besides appending html, we can also bind jquery events to trigger a dialog element, or a message overlay, for instance:

https://github.com/webdetails/CLP/blob/master/static/custom/js/clpJS.js#L47:L68

Whatever elements you append using the js file, you shoud then style using the css file.

##CLP Contents


The CLP functions as a launcher of various types of Pentaho Reports, located within a folder in the Pentaho User Console. The folder whose contents are made available for selection in the CLP, is defined in the basepath configuration in the clp.xml file:

https://github.com/webdetails/CLP/blob/master/clp.xml#L5

The contents of this folder are retrieved via a kettle endpoint, the result of it, passed to a template component which generates the html structure of the selector.

When the selector first loads, it will parse it's own html structure, rendering first report it encounters in the visualization pane. Whenever a report is rendered in the visualization pane, a check is conducted to determine if the file is to be rendered inside an iframe, or if it happens to be a CTools dashboard, injected into the visualization pane, using require JS.
