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
artistName.innerHTML = aMedia[0]["name"]

var titleName = document.getElementById("titre");
titleName.innerHTML = aMedia[0]["file"];


rangeTime.setAttribute("max",titre.duration)
rangeTime.value=0;
speaker.value = titre.volume;

play.addEventListener("click", function(){ changeIcone();
                                            if(titre.paused){titre.play()} 
                                            else{titre.pause()}
});


btnSpeakDown.addEventListener("click" , function(){speaker.stepDown();
                                                    titre.volume = speaker.value;});

btnSpeakUp.addEventListener("click" , function(){speaker.stepUp();
                                                titre.volume = speaker.value});

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
    document.getElementById("artiste").innerHTML = music["name"];
    document.getElementById("titre").innerHTML = music["file"];
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



