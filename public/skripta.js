window.addEventListener('load', function() {
	//stran nalozena
	
	
	
	var prizgiCakanje = function() {
		document.querySelector(".loading").style.display = "block";
	}
	
	var ugasniCakanje = function() {
		document.querySelector(".loading").style.display = "none";
	}
	
	document.querySelector("#nalozi").addEventListener("click", prizgiCakanje);
	
	//Pridobi seznam datotek
	var pridobiSeznamDatotek = function(event) {
		prizgiCakanje();
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "/datoteke", true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var datoteke = JSON.parse(xhttp.responseText);
				var datotekeHTML = document.querySelector("#datoteke");
				
				for (var i=0; i<datoteke.length; i++) {
					var datoteka = datoteke[i];
					
					var enota = "B";
					var velikost = datoteka.velikost;
					if(velikost/1024 >= 1){
						velikost=velikost/1024;
						enota = "KiB";
					}
					if(velikost/1024 >= 1){
						velikost=velikost/1024;
						enota = "MiB";
					}
					if(velikost/1024 >= 1){
						velikost=velikost/1024;
						enota = "GiB";
					}
					if(velikost/1024 >= 1){
						velikost=velikost/1024;
						enota = "TiB";
					}
					
					datotekeHTML.innerHTML += " \
						<div class='datoteka senca rob'> \
							<div class='naziv_datoteke'> " + datoteka.datoteka + "  (" + velikost.toFixed(1) + " " + enota + ") </div> \
							<div class='akcije'> \
							| <span><a href='/prenesi/" + datoteka.datoteka + "' target='_self'>Prenesi</a></span> \
							| <span akcija='brisi' datoteka='"+ datoteka.datoteka +"'>Izbriši</span> \
							| <span><a href='/poglej/" + datoteka.datoteka + "' target='_self'>Poglej</a></span> \
							</div> \
					    </div>";	
				}
				
				if (datoteke.length > 0) {
					for(var x of document.querySelectorAll("span[akcija=brisi]")){
						x.addEventListener("click", brisi);}
				}
				ugasniCakanje();
			}
		};
		
	}
	
	
	var brisi = function(event) {
		prizgiCakanje();
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (xhttp.responseText == "Datoteka izbrisana") {
					window.location = "/";
				} else {
					alert("Datoteke ni bilo možno izbrisati!");
				}
			}
			ugasniCakanje();
		};
		xhttp.open("GET", "/brisi/"+this.getAttribute("datoteka"), true);
		xhttp.send();
	}

	pridobiSeznamDatotek();

});