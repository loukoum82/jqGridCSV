# jqGridCSV
Export a jqGrid into a CSV file

To use this, add the js file to your html (with the jqgrid script too), then use the function $('#mygrid').toCSV(callback);
The result of the callback is a URI you can past to an href attribute of a hyperlink or use with window.open();
