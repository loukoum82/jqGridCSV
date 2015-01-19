/* jquery.jqGrid.xls.js  Version 1.0.0.0

Export a jqGrid in a CSV doc (can be opened with MS Excel, Libre Office Calc)

by Loukoum82

*/


$.jgrid.extend({
 toCSV : function(callback,onePage) {
  if ($(this).getGridParam("lastpage")>1 && !onePage) {
   /* Change text to your own language */
   var msg = "It seems to be a multi pages grid. Would you like to export this page only?";
   var gridcsv = this;
   var cbgrid = callback;
   if (jAnyQuestion) // plugin jquery.alerts.js needed (https://github.com/loukoum82/jquery.alerts)
    jAnyQuestion (msg, "Multi-pages", function(r){
     switch(r) {
      case 0 : $(gridcsv).toCSV(cbgrid,true); break;
      case 1 : $(gridcsv).toCSVLoader(cbgrid); break;
     }
    },['Yes','All pages','Cancel']);
   else
    $(this).toCSVLoader(callback);
   return "";
  }
  var data = $(this).getRowData();
  var headers = $(this).getGridParam("colNames");
  var ligne,res=[];
  res.push(headers.join(';'));
  for (var i=0;i<data.length;i++) {
   ligne = [];
   for (var key in data[i])
    ligne.push(data[i][key]);
  
   res.push(ligne.join(';'));
  }
  var uri='data:application/csv;charset=ISO-8859-1,' + escape(res.join('\n'));
  if (callback) callback(uri);
  return uri; 
 },
 toCSVLoader : function(callback) {
  $(this).exportCSVOpts.oldRowNum = $(this).getGridParam("rowNum");
  $(this).exportCSVOpts.oldNumPage = $(this).getGridParam("page");
  $(this).exportCSVOpts.loading = true;
  $(this).exportCSVOpts.callback = callback;
  $(this).exportCSVOpts.oldLoadComplete = $(this).getGridParam("loadComplete");
  $(this).setGridParam( { rowNum:$(this).getGridParam("records"),loadComplete : function () {
   if ($(this).exportCSVOpts.callback)
    $(this).exportCSVOpts.callback($(this).toCSV());
   $(this).resetExportCSV();
   $(this).exportCSVOpts.justExported = true;
   
   setTimeout("$('#"+$(this).attr("id")+"').trigger('reloadGrid',[{page:1}])",10);
  }});
  $(this).trigger('reloadGrid',[{page:1}]);
 },
 resetExportCSV : function () {
  $(this).exportCSVOpts.loading = false;
  $(this).exportCSVOpts.callback = null;
  $(this).setGridParam( { page:$(this).exportCSVOpts.oldNumPage,rowNum:$(this).exportCSVOpts.oldRowNum,loadComplete:$(this).exportCSVOpts.oldLoadComplete});
 },
 justCSVExported : function () {
  var res =$(this).exportCSVOpts.justExported;
  $(this).exportCSVOpts.justExported = false;
  return res; 
 },
 canExportCSV : true,
 exportCSVOpts : { loading : false, callback : null,oldLoadComplete : null,oldRowNum : 10,oldNumPage : 1,justExported : false }
});
