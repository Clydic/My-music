var titre = document.querySelector("audio");
var play = document.getElementById("play");
var audioElement = new Audio(titre.getAttribute("src"));
var iconPlayPause = document.querySelector("#playpause");
var speaker = document.getElementById("volume");
var btnSpeakDown = document.getElementById("speakdown");
var btnSpeakUp = document.getElementById("speakup")
var rangeTime = document.getElementById("progresstime")
var btnPrevious
rangeTime.value=0;
var duree = titre.duration;
rangeTime.setAttribute("max" , duree);
speaker.value = titre.volume;
play.addEventListener("click", playAndPause);

btnSpeakDown.addEventListener("click" , function(){speaker.stepDown();
    titre.volume = speaker.value;
    console.log(titre.volume)});

btnSpeakUp.addEventListener("click" , function(){speaker.stepUp();
    titre.volume = speaker.value});

// speaker.addEventListener("change",function(e){titre.volume = e.target.value;});
speaker.addEventListener("change",function(e){e.target.value = titre.volume;});
rangeTime.addEventListener("change",function(e){titre.currentTime = parseFloat(e.target.value);});



var actualTime = -1;
function playAndPause(){
    
    if(titre.paused){
        actualTime = setInterval(upDateTime,500);
        titre.play();
        iconPlayPause.setAttribute("class" , "fas fa-pause-circle");
    }else{
        
        titre.pause();
        clearInterval(actualTime);
        iconPlayPause.setAttribute("class" , "fas fa-play-circle");
    }
}

function upDateTime(){
    console.log(rangeTime.value);
    var n= parseFloat(rangeTime.value);
    n = titre.currentTime; 
    rangeTime.value=n.toString();
    console.log(n);
    console.log(rangeTime.value);

}    

