
function GET_HTML_DATA_AS_JSON() {
  var count = document.getElementsByClassName("lvl-f").length;
  var firstLayer = new Array();
  var levelCustomerInfo = new Array();
  var levelCustomerNote = new Array();
  var levelShipping = new Array();
  var levelOrders = new Array();
  var Layer1Counter = 0,
    Layer2Counter = 0,
    Layer6Counter = 0;
  var Layers = {};
  var LayerOutput = {};
  var LayerOrders = new Array();
  var Orders = new Object();
  var ORDER = {};
  
  
  /*Take data and push in to Arrays*/
  jQuery(".lvl-f td").each(function () {
    firstLayer.push(this.innerHTML);
  });
  jQuery(".lvl-i1 td").each(function () {
    levelCustomerInfo.push(this.innerHTML);
  });
  jQuery(".lvl-i2 td").each(function () {
    levelCustomerNote.push(this.innerHTML);
  });
  jQuery(".lvl-i3 td").each(function () {
    levelShipping.push(this.innerHTML);
  });
  

  for (x = 0; x < count; x++) {
    var OrderCount = $(".lvl-v" + x + " td").length / 4;  // OrderCount means how many orders current <tr> have.
    
	var o = new Object();

    for (y = 0; y < OrderCount; y++) {
      
	  var OrderObj = new Object();
      var Order = new Array();
	  
      $(".lvl-v" + x + ".order-" + y + " td").each(function () {
        Order.push(this.innerHTML);
      });
      OrderObj["OrderName"] = Order[0];
      OrderObj["OrderImage"] = Order[1];
      OrderObj["OrderPrice"] = Order[2];
      OrderObj["OrderStatus"] = Order[3];

      o[y] = OrderObj;  // Push the variables to the outer(orders in tr) layer.
    }
    Orders[x] = o; // Push the variables to the outer(orders in table) layer.
  }
         /*Remember this structure created for collecting data's and make a JSON tree with them. */
  for (i = 0; i < count; i++) { // in here we create out result.
    var Layer1 = {},
      Layer2 = {},
      LayerOut = {},
      Layer3 = {},
      Layer4 = {},
      Layer5 = {},
      LayerCounter = 0;

    /*Create 5th Layer*/

    Layer5 = Orders[i];
   

    /*Create 4th Layer*/

    Layer4["CustomerNote"] = levelCustomerNote[i];

    /*Create 3th Layer*/

    Layer3["ShippingInfo"] = levelShipping[i];

    /*Create 2nd Layer*/

    Layer2["NameSurname"] = levelCustomerInfo[i + Layer2Counter];
    Layer2Counter++;
    Layer2["ContactNumber"] = levelCustomerInfo[i + Layer2Counter];
    Layer2Counter++;
    Layer2["Information"] = levelCustomerInfo[i + Layer2Counter];

    /*Create 1st Layer*/
    Layer1["Number"] = firstLayer[(i + Layer1Counter)];
    Layer1Counter++;
    Layer1["Price"] = firstLayer[(i + Layer1Counter)];
    Layer1Counter++;
    Layer1["DateTime"] = firstLayer[(i + Layer1Counter)];
    Layer1Counter++;
    Layer1["Status"] = firstLayer[(i + Layer1Counter)];
 
    Layer1["layer"+LayerCounter] = Layer2;
    LayerCounter++;
    Layer1["layer"+LayerCounter] = Layer3;
    LayerCounter++;
    Layer1["layer"+LayerCounter] = Layer4;
    LayerCounter++;
    Layer1["layer"+LayerCounter] = Layer5;
    LayerCounter++;

    Layers["order" + i] = Layer1;
   
  }
  LayerOutput["data"] = Layers;
  console.log(JSON.stringify(LayerOutput))  
  return JSON.parse(JSON.stringify(LayerOutput));
}