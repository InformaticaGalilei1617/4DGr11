//CONTROLLO DELLO STORAGE: wsisworking
function hostisworking() {
        if (document.getElementById('wsisworking').style.display=='block')
            collapseisworking();
        else
            isworking();
}

function isworking() {
	if (typeof(localStorage)=='undefined') 
           		  document.getElementById("wsisworking").innerHTML="&raquo; WebStorage non viene supportato. Prova con un altro browser.";
   	    else
          		  document.getElementById("wsisworking").innerHTML="&raquo; WebStorage funziona correttamente :)";
	if (typeof JSON=='undefined') 
           		  document.getElementById("jsonisworking").innerHTML="&raquo; JSON non viene supportato. Prova con un altro browser.";
      	   else
          		  document.getElementById("jsonisworking").innerHTML="&raquo; JSON funziona correttamente :)";
         		  document.getElementById('wsisworking').style.display='block';
        		  document.getElementById('jsonisworking').style.display='block';
}

function collapseisworking() {
    document.getElementById('wsisworking').style.display='none';
    document.getElementById('jsonisworking').style.display='none';
}

//FUNZIONI DI DISEGNO
/* Prende le variabili necessarie: calldraw
 * Disegna sul canvas in modo ricorsivo: draw
 * Sceglie i colori: colorpick
 * Resetta il canvas: clearcanvas
 */
function colorpick(xc,yc,ct,n) {
	var lx=xc-300; 
	var ly=yc-300;
	var m=Math.sqrt(lx*lx+ly*ly);
	if (m>=300)	
		ct.strokeStyle="red";
	else if (m>=200)
		ct.strokeStyle="blue";
	else if (m>=100)
		ct.strokeStyle="green";
	else
		ct.strokeStyle="yellow";
}

function draw (c,ct,xc,yc,d,n) {
	colorpick(xc,yc,ct,n);
	ct.beginPath();
	ct.moveTo(xc-d/2, yc);
	ct.lineTo(xc+d/2, yc);
	ct.moveTo(xc, yc-d/2);
	ct.lineTo(xc, yc+d/2);
	ct.stroke();
	if(n>1) {
		draw(c,ct,xc+d/2,yc+d/2,d/2,n-1);
		draw(c,ct,xc+d/2,yc-d/2,d/2,n-1);
		draw(c,ct,xc-d/2,yc-d/2,d/2,n-1);
		draw(c,ct,xc-d/2,yc+d/2,d/2,n-1);
	}
}

function calldraw() {
var c = document.getElementById("canvas1");
var ct = c.getContext("2d");
ct.globalAlpha=1;
var l = document.getElementById("lato").value;
var d = l*200;
var xc=parseInt(document.getElementById("xc").value);
var yc=parseInt(document.getElementById("yc").value);
var n=document.getElementById("ricorsioni").value;
draw(c,ct,xc,yc,d,n);
store(xc,yc,l,n);
}

function clearcanvas() {
    var c = document.getElementById("canvas1");
    var ct=c.getContext("2d");
    ct.clearRect(0,0,c.width,c.height);
}

//FUNZIONI CRONOLOGIA
/* Salva i dati di ogni disegno: store
 *  - Sposta i dati per fare spazio, e cancella quelli molto vecchi.
 * Mostra i dati nella pagina della Cronologia: showhistory
 * Cancella tutti i dati salvati: clearhistory
*/
function store(xc,yc,l,n) {
    var data = new Date();
    var giorno = data.toLocaleDateString();
    var ora = data.toLocaleTimeString();
    var currentdraw=[xc,yc,l,n,giorno,ora];
    var h=new Array(20); //tutti gli elementi sono null ma almeno l'array esiste
    if (localStorage.getItem(history)!= null && localStorage.getItem(history)!= undefined) 
        h = JSON.parse(localStorage.getItem(history));
    h.unshift(JSON.stringify(currentdraw));
    if (h.length>20)
        h.pop();
    window.localStorage.setItem(history, JSON.stringify(h));
}


function showhistory() {
    var table = document.getElementById("cronologia");
    if (typeof(localStorage)=='undefined' || localStorage.getItem(history)== null) {
        document.getElementById("controlhistory").innerHTML="A quanto pare, non ci sono dati salvati!";
        document.getElementById("controlhistory").style.display='block';
        document.getElementById("cronologia").style.display='none';
    } else {
        var h = JSON.parse(localStorage.getItem(history)); //tutta la cronologia: insieme di varie stringhe
        var hp = JSON.parse(h[0]);
        for (var i=0; i<h.length; i++) {
            hp = JSON.parse(h[i]);
            if (hp!=null) {
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                cell1.innerHTML = i+1;
                cell2.innerHTML = hp[0];
                cell3.innerHTML = hp[1];
                cell4.innerHTML = hp[2];
                cell5.innerHTML = hp[3];
                cell6.innerHTML = hp[4];
                cell7.innerHTML = hp[5];
            }
        }
    }
}

function clearhistory() {
    if (localStorage.length!=0) {
    localStorage.clear();
    document.getElementById('avvisoreset').innerHTML='WebStorage resettato correttamente, aggiorna la pagina per vedere le modifiche.';
    document.getElementById('avvisoreset').style.display='block';
    }
}

//ALTRO

function ridere() {
	if (document.getElementById('aggiunta').style.display!='block')
		expandridere();
	else
		collapseridere();
}

function expandridere() {
	document.getElementById('aggiunta').style.display='block';
}
function collapseridere() {
	document.getElementById('aggiunta').style.display='none';
}