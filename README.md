# jqGridCSV
Export a jqGrid(https://github.com/tonytomov/jqGrid/tree/master) into a CSV file (can be opened with MS Excel, Libre Office Calc)

To use this, add the js file to your html (with the jqgrid script too), then use the function $('#mygrid').toCSV(callback);
The result of the callback is a URI you can past to an href attribute of a hyperlink or use with window.open();
