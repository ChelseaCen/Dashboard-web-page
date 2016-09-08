StandaloneDashboard(function (tdb) {
  tdb.setTabbedDashboardTitle("My Dashboard");

  // Dashboard 1 
  var db1 = new Dashboard();
  db1.setDashboardTitle('Utilization');

   var quarterlySales = new ChartComponent();
  quarterlySales.setDimensions (6, 6);
  quarterlySales.setCaption("Utilization Analyze");
  quarterlySales.setLabels (["Rack1", "Rack2", "Rack3", "Rack4"]);
  quarterlySales.addYAxis('CPUUsage', "IdleRAM");
  quarterlySales.addSeries('IdleRAM', "Idle RAM", [32, 41, 46, 51], {
    numberPrefix: "percent"
  });
  quarterlySales.addSeries('CPUUsage', "CPU Usage", [21, 39, 42, 48], {
    yAxis: 'CPUUsage'

  });
  quarterlySales.addComponentKPI ('OverallUtilisationinRack1', {
      caption: 'Overall Utilisation in Rack1',
      value: 39.27,
      numberPrefix: 'percent',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('OverallUtilisationinRack2', {
      caption: 'Overall Utilisation in Rack2',
      value: 41.58,
      numberPrefix: 'percent',
      numberHumanize: true
  });
  quarterlySales.addComponentKPI('OverallUtilisationinRack3', {
      caption: 'Overall Utilisation in Rack3',
      value: 35.49,
      numberPrefix: 'percent',
      numberHumanize: true
  });
  db1.addComponent (quarterlySales);

  var tableData = [
  {name: "Node_No:5", category: "CPU-Utilisation", percent: 33.5018728743842},
  {name: "Node_No:8", category: "CPU-Utilisation", percent: 21.2154183469966},
  {name: "Node_No:60", category: "CPU-Utilisation", percent: 42.53464255117},
  {name: "Node_No:64", category: "CPU-Utilisation", percent: 43.2747157362985},
  {name: "Node_No:69", category: "Disk-Utilisation", percent: 31.1139394228022},
  {name: "Node_No:91", category: "Disk-Utilisation", percent: 42.808340596119},
  {name: "Node_No:112", category: "Disk-Utilisation", percent: 53.8615162741232},
  {name: "Node_No:118", category: "Disk-Utilisation", percent: 60.4438955970038},
  {name: "Node_No:171", category: "Memory-Utilisation", percent: 36.6747790235831},
  {name: "Node_No:183", category: "Memory-Utilisation", percent: 48.0821011314874},
  {name: "Node_No:230", category: "Memory-Utilisation", percent: 60.0367085242432},
  {name: "Node_No:238", category: "Memory-Utilisation", percent: 53.1771024904934},
  ];
  var productsTable = new TableComponent ();
  productsTable.setDimensions (6, 6);
  productsTable.setCaption ('CPU,Disk,and memory utilization information');
  productsTable.addColumn ('name', 'Name');
  productsTable.addColumn ('category', 'Category');
  productsTable.addColumn ('percent', 'percent', {
    dataType: "number",
    //numberPrefix: "$",
    textAlign: "right",
    numberForceDecimals: true
  });
  productsTable.addMultipleRows (tableData);
  db1.addComponent(productsTable);
  var productFilterForm = new FormComponent ();
  productFilterForm.setDimensions (6, 6);
  productFilterForm.setCaption ('Filter Products');
  productFilterForm.addMultiSelectField ('category', 'Select Category', ['CPU-Utilisation', 'Disk-Utilisation', 'Memory-Utilisation']);
  productFilterForm.addTextField ('name', 'Product Name Contains');
  productFilterForm.addNumericRangeField('percent', 'percent', [0, 100]);
  productFilterForm.onApplyClick(function() {
    var inputValues = productFilterForm.getAllInputValues();
    // Create a fresh copy of the products table data
    var filteredValues = tableData;
// Filter the rows which contain product name requested
if(productFilterForm.isFieldSet ('name')) {
  filteredValues = rf._.filter(filteredValues, function (row) {
    return row['name'].search(inputValues['name']) !== -1;
  })
}

// Filter rows which fall between a range of prices
if(productFilterForm.isFieldSet ('percent')) {
  filteredValues = rf._.filter(filteredValues, function (row) {
    return row['percent'] >= inputValues['percent'][0] && row['percent'] <= inputValues['percent'][1]
  })
}

// Filter only valid categories
if(productFilterForm.isFieldSet ('category')) {
  filteredValues = rf._.filter(filteredValues, function (row) {
    return rf._.contains(inputValues['category']['text'], row['category'])
  })
}

productsTable.clearRows ();
productsTable.addMultipleRows (filteredValues);
  });
  db1.addComponent(productFilterForm);


    var c3 = new KPIComponent();
    c3.setDimensions(4, 2);
    c3.setCaption('Average Utilization of CPU(%)');
    c3.setValue(44.28);
    c3.setSparkValues(['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                        [12.31, 10.34, 10.26, 9, 8.21, 13.41, 14.43, 23.31, 13.41, 11.4, 28.34, 29.21]);
    db1.addComponent(c3);

        var c4 = new KPIComponent();
    c4.setDimensions(4, 2);
    c4.setCaption('Average Utilization of Disk(%)');
    c4.setValue(44.46);
    c4.setSparkValues(['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                        [9, 23.31, 10.26, 12.31, 29.21, 13.41, 14.43, 10.34, 13.41, 11.4, 28.34, 8.21]);
    db1.addComponent(c4);

        var c5 = new KPIComponent();
    c5.setDimensions(4, 2);
    c5.setCaption('Average Utilization of Memory(%)');
    c5.setValue(44.85);
    c5.setSparkValues(['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
                        [14.43, 29.21, 10.34, 13.41, 8.21, 13.41, 12.31, 10.26, 9, 11.4, 28.34,  23.31]);
    db1.addComponent(c5);


  // Dashboard 2
    var db2 = new Dashboard('db2');

    db2.setDashboardTitle('COST');

    var chart1 = new ChartComponent();
    chart1.setDimensions (6, 4);
    chart1.setCaption("DataCenter Sales(GBP)");
    chart1.setLabels (["Jan", "Feb", "Mar", "Apr", "May", "June"]);
    chart1.addSeries ("Revenue", "Revenue", [5854, 4171, 1375, 1875, 2246, 2696]);
    chart1.addSeries ("Profit", "Profit", [3242, 3171, 700, 1287, 1856, 1126], {
        seriesDisplayType: "area"
    });
    chart1.addSeries ("Predicted_Profit", "Predicted Profit", [4342, 2371, 740, 3487, 2156, 1326], {
        seriesDisplayType: "line"
    });
    chart1.setYAxis("Sales");
    db2.addComponent (chart1);
 
  
 var c2 = new KPIComponent();
    c2.setDimensions(4, 2);
    c2.setCaption('Average Timestamp Sales per Node');
    c2.setValue(513.22, {
        numberPrefix: 'GBP'
    });
    db2.addComponent(c2);



  tdb.addDashboardTab(db1, {
        title: 'Utilization'
    });
  tdb.addDashboardTab(db2, {
        active: true
    });

  
  var chart1 = new ChartComponent();
    chart1.setDimensions (4, 4);
    chart1.setCaption("Total Expenditures by differnt racks");    
    chart1.setLabels (["Rack1", "Rack2", "Rack3"]);
    chart1.setYAxis("", {
        numberPrefix: "GBP"
    });
    chart1.addSeries ("PowerConsumption", "Power Consumption", [1355, 1916, 1150], {
        seriesStacked: true,
        seriesDisplayType: "column"
    });
    chart1.addSeries ("Airconditionfee", "Air condition fee", [1513, 976, 1321], {
        seriesStacked: true,
        seriesDisplayType: "column"
    });
    chart1.addSeries ("Capitalfee", "Capital fee", [1313, 1976, 924], {
        seriesStacked: true,
        seriesDisplayType: "column"
    });
    db2.addComponent (chart1);

   var chart = new ChartComponent();
    chart.setDimensions (8, 6);
    chart.setCaption("Budget allocation");
    chart.setLabels (["Capitalfee", "PowerConsumption", "Airconditionfee","Otherfees"]);
    chart.setPieValues ([35, 37, 18,10], {
        dataType: "number",
        numberSuffix: "%"
    });
    db2.addComponent (chart);

    var gauge = new GaugeComponent();
    gauge.setDimensions(4,3);
    gauge.setCaption('Customer Satisfaction Survey');
    gauge.setLimits(0, 100);
    gauge.setValue(42);
    db2.addComponent(gauge);



}, {tabbed: true});