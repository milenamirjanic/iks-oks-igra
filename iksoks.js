var mat = [
    [ null , null , null ], // 1. red - 0
    [ null , null , null ], // 2. red - 1
    [ null , null , null ]  // 3. red - 2
]; // 1.- 0, 2.- 1, 3.- 2

var X = "x";
var O = "o";

function odigraj(x,y,ko) {
    if(mat[x][y] == null) {
        mat[x][y] = ko;
    }
}

function odigrajAI() {
    var preostala =[];
    for (let i = 0; i < 3; i++) {   
        for (let j = 0; j < 3; j++) {   
            if(mat[i][j] == null) {
                preostala.push({
                    x : i,
                    y : j
                });
            }
        }
    }

    var r =  Math.floor(Math.random()*preostala.length);
    var odabrano = preostala[r];
    odigraj(odabrano.x,odabrano.y,O);
}


function proveriRed(red) {
    var prvi = mat[red][0];
    if(prvi == null) return null;
    for (let i = 1; i < mat[red].length; i++) {
        if(mat[red][i] != prvi) return null;
    }
    return prvi;
}

function proveriKolonu(kol) {
    var prvi = mat[0][kol];
    if(prvi == null) return null;
    for (let i = 1; i < 3; i++) {
        if(mat[i][kol] != prvi) return null;
    }
    return prvi;
}

function proveriDijagonale() {
    //glavna
    var prvi = mat[0][0];
    var pobednik = prvi;
    for (let i = 0; i < 3; i++) {   
        if(mat[i][i] != prvi) {
            pobednik = null;
        }
    }

    if(pobednik != null) return pobednik;

    //  sporedna
    var prvi = mat[0][2];

    for (let i = 0; i < 3; i++) {   
        for (let j = 0; j < 3; j++) {   
            if(mat[i][j] == 3-1) {
                if(mat[i][i] != prvi) {
                    pobednik = null;
                }
            }
        }
    }
    return pobednik;
}

function proveriPobedu() {
    var pobednik = null;
    for (let i = 0; i < 3; i++) {
        pobednik = proveriRed(i);
        if (pobednik != null) {
            return pobednik;

        }
    }
    for (let i = 0; i < 3; i++) {
        pobednik = proveriKolonu(i);
        if (pobednik != null) {
            return pobednik;

        } 
    }

    pobednik = proveriDijagonale();
    return pobednik;
}

console.table(mat);

// deo vezan za body
var brPotez = 1;
var kraj = false;

var pobedaO =0;
var pobedaX =0;


function pritisnut(x,y) {
    if(kraj) return;

    //var koIgra = brPotez%2 == 1 ? X : O;
    //odigraj(x,y,koIgra);
    //zbog kompa
    odigraj(x,y,X);
    
    var poruka = document.getElementById("poruka");
    var button = document.getElementById("button");
    var pobednik = proveriPobedu();
    if(pobednik != null){
        poruka.style.display = "block";
        button.style.display = "block";
        poruka.innerHTML = " P O B E D I O  : <br><span>" + pobednik + "</span>";
        kraj = true;
        pobedaX++;
    }

    prikaziTablu();
    brPotez++;

    // deo da se igra protiv kompa
    if(pobednik!= null) return;

    odigrajAI();
    pobednik = proveriPobedu();
    if(pobednik != null){
        poruka.style.display = "block";
        button.style.display = "block";
        poruka.innerHTML = " P O B E D I O  : <br><span>" + pobednik + "</span>";
        kraj = true;
        pobedaO++;
    }
    prikaziTablu();

}

function prikaziTablu() {


    for (let i = 0; i < 3; i++) {   
        for (let j = 0; j < 3; j++) {   
            var id = "polje_"+i+"_"+j;
            var klasa = null;
            var koIgra;
            if(mat[i][j] == X) {
                klasa = "iks";
                koIgra = X;
            }
            if(mat[i][j] == O) {
                klasa = "oks";
                koIgra = O;
            }
            var polje = document.getElementById(id);
            if(klasa != null && polje.innerHTML == "") {
                var p = document.createElement('p');
                var text = document.createTextNode(koIgra);
                p.className = klasa;
    
                polje.appendChild(p);
                p.appendChild(text);
            }
        }
    }
}

function newGame() {
    for (let i = 0; i < 3; i++) {   
        for (let j = 0; j < 3; j++) {
              mat[i][j] = null;
        }
    }

    brPotez = 0;
    kraj = false;

    for (let i = 0; i < 3; i++) {   
        for (let j = 0; j < 3; j++) {   
            var id = "polje_"+i+"_"+j;
            var polje = document.getElementById(id);
            polje.textContent = '';
        }
    } 


    var poruka = document.getElementById("poruka");
    var button = document.getElementById("button");
        poruka.style.display = "none";
        button.style.display = "none";
    document.getElementById("pobeda-x").innerHTML= pobedaX;
    document.getElementById("pobeda-o").innerHTML= pobedaO;
}