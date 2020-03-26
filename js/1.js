
window.onload = function() {
      
      document.getElementById("c1").style.cursor = "pointer";
      document.getElementById("c2").style.cursor = "pointer";
      document.getElementById("c3").style.cursor = "pointer";

      document.getElementById("c1").addEventListener("click", chicken_f);
	  document.getElementById("c2").addEventListener("click", beef_f);
	  document.getElementById("c3").addEventListener("click", sushi_f);
}

 
function chicken_f(){
   
      document.getElementById("c1").style.backgroundColor = "#ff00ff";
      loadItem("data/chicken.json" , "HEADER1" );
}

function beef_f(){

      document.getElementById("c2").style.backgroundColor = "#ff0000";
      loadItem("data/beef.json" , "HEADER2" );
}

function sushi_f(){

      document.getElementById("c3").style.backgroundColor = "#ffff00";
      loadItem("data/sushi.json" , "HEADER3");
}
 

function loadItem( fileJson_path , header_n ){

  //Call server to get the entriy and the items
  var item=null;
  var itemOld=null;
  var shown_items="";

  var xttp=new XMLHttpRequest();

  xttp.onreadystatechange=function(){

    if ( (this.readyState==4) && (this.status==200) ) {
      
      item = this.responseText;
      itemOld = this.responseText;

      var xttp=new XMLHttpRequest();

      xttp.onreadystatechange=function(){

        if((this.readyState==4)&&(this.status==200)){

        	var entry= JSON.parse(this.responseText);
 			 
 			for (let i=0; i<entry.length; i++) {

 				item = itemOld;

  				item = item.replace(new RegExp("{{name}}", "g"), entry[i].name);
    			item = item.replace(new RegExp("{{description}}", "g"), entry[i].description);
          item = item.replace(new RegExp("{{header_n}}", "g"), header_n);

    			shown_items = shown_items + item ;
			}
 
    		document.querySelector("body").innerHTML= " <h1 onClick=\"window.location.reload();\"> Back </h1> " + shown_items ;
			 
        }

      };

      xttp.open("GET", fileJson_path , true);
      xttp.send(null);//for POST only

    }
  };

  xttp.open("GET", "templates/item.html", true);
  xttp.send(null);//for POST only

}

 