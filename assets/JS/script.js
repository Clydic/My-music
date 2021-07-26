// Initialisation des variables
var titre = document.querySelector("audio");

var play = document.getElementById("play");
var iconPlayPause = document.querySelector("#playpause");

var speaker = document.getElementById("volume");
var btnSpeakDown = document.getElementById("speakdown");
var btnSpeakUp = document.getElementById("speakup");

var rangeTime = document.getElementById("progresstime");
var btnPrevious = document.getElementById("previous");
var btnNxt = document.getElementById("next");

var path = "assets/data/media";

var aMedia = media;
var artistName = document.getElementById("artiste");
artistName.innerHTML = aMedia[0]["artist"]

var titleName = document.getElementById("titre");
titleName.innerHTML = aMedia[0]["name"];


rangeTime.setAttribute("max",titre.duration)
rangeTime.value=0;
speaker.value = titre.volume;

play.addEventListener("click", function(){ changeIcone();
                                            if(titre.paused){titre.play()} 
                                            else{titre.pause()}
});

//Assignation des évènements
//Assignation de l'évènement click au bouton pour Baisser le volume
btnSpeakDown.addEventListener("click" , function(){speaker.stepDown();
                                                    titre.volume = speaker.value;});

//Assignation de l'évènement click au bouton pour Augmenter le volume
btnSpeakUp.addEventListener("click" , function(){speaker.stepUp();
                                                titre.volume = speaker.value});
//Ajout de l'évènement change au curseur de volume afin de gérer celui-ci
speaker.addEventListener("change",function(e){titre.volume = e.target.value;});

// rangeTime.addEventListener("change",function(e){titre.currentTime = parseFloat(e.target.value);});


titre.addEventListener("play", changeIcone);
titre.addEventListener("pause",changeIcone);
titre.addEventListener("timeupdate", function(){rangeTime.value=titre.currentTime.toString();});
// titre.addEventListener("volumechange",function(){speaker.value=titre.volume});


btnPrevious.addEventListener("click",previous);
btnNxt.addEventListener("click",next);





function changeIcone(){
    
    if(titre.paused ){
        
        // clearInterval(actualTime);
        iconPlayPause.setAttribute("class" , "fas fa-play-circle");

    }else{
        iconPlayPause.setAttribute("class" , "fas fa-pause-circle");
        // actualTime = setInterval(upDateTime,100);
        
        
    }
}

function changeMusic(index){
    var music = aMedia[index];
    titre.setAttribute("src",path+"/"+music["file"]+".mp3");
    document.getElementById("artiste").innerHTML = music["artist"];
    document.getElementById("titre").innerHTML = music["name"];
    titre.load();
    changeIcone();
   


}    

function getIndex (array , key , word){
    for (i in array){
        if (array[i][key] == word){
            console.log(i);
            return parseInt(i);
        }
    }
}


function previous(){
    // var nom = titre.getAttribute("name")
    var index = getIndex(aMedia , "name" , titre.getAttribute("name"))
    if(index>0){
        changeMusic(index-1);
        titre.setAttribute("name",aMedia[index-1]["name"]);
        rangeTime.value="0"
        titre.autoplay=true;
        // nom = titre.getAttribute("name");
       
        
    }
    

}

function next(){
    var index = getIndex(aMedia , "name" , titre.getAttribute("name"))
    if(index<aMedia.length-1){
        changeMusic(index+1);
        titre.setAttribute("name",aMedia[index+1]["name"]);
        rangeTime.value="0"
        titre.autoplay=true;
    }
}

function createPochette(){
   
    var classPochette = "pochette d-flex flex-column m-1  col-xs-6 col-md-4 col-lg-3"
   
    var id = "#divpochette"
    for(i in media){
        var div = document.createElement("div");
        var img = document.createElement("img");
        var h5= document.createElement("h5");
        var h6= document.createElement("h6");
        var classe = document.createAttribute("class");
        var src = document.createAttribute("src");
        var small = document.createAttribute("small")
        var id = aMedia[i]["file"];
        
        document.getElementById("divpochette").appendChild(div);
        div.setAttribute("class",classPochette)
        div.setAttribute("id",id)
        div.setAttribute("name",aMedia[i]["name"])
        document.getElementById(id).appendChild(img);
        document.getElementById(id).appendChild(document.createElement("div"));
        

        var selector =document.querySelector("#"+id+" "+"div"); 
        selector.setAttribute("class","card-body bg-light rounded-1");
        selector.appendChild(h5);
        selector.appendChild(h6);
        

        var selector = document.querySelector("#"+id+" "+"img");
        selector.setAttribute("src","assets/data/pochettes/250/"+aMedia[i]["photo"]);
        selector.setAttribute("name",aMedia[i]["name"]);
        selector.addEventListener("click",function(e){pickMusic(e)})

        selector = document.querySelector("#"+id+" "+"div h5");
        selector.setAttribute("class","card-title")
        selector.innerHTML = aMedia[i]["name"];

        selector = document.querySelector("#"+id+" "+"div h6");
        selector.setAttribute("class","card-title")
        selector.innerHTML = aMedia[i]["artist"];
    }
    
    
}

function pickMusic(event){
    var index = getIndex(aMedia , "name", event.target.name);
    changeMusic(index);
    titre.autoplay=true;

}
createPochette();
{/* <div class="pochette d-flex flex-column m-1 col-1">
                         <img  src="assets/data/pochettes/150/2.jpg" alt="-_1"/>
                        <div class="card-body bg-light rounded-1">
                            <h5 class="card-title">DEUX</h5>
                            <p class="card-text">Voici la Chanson DEUX</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div> */}

                  