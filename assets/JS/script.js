var titre = document.querySelector("audio");
var play = document.getElementById("play");
var audioElement = new Audio(titre.getAttribute("src"));
var iconPlayPause = document.querySelector("#playpause");
var speaker = document.getElementById("volume");
var btnSpeakDown = document.getElementById("speakdown");
var btnSpeakUp = document.getElementById("speakup")
var rangeTime = document.getElementById("progresstime")
var btnPrevious = document.getElementById("previous")
var btnNxt = document.getElementById("next");

rangeTime.value=0;
var duree = titre.duration;
rangeTime.setAttribute("max" , duree);
speaker.value = titre.volume;
play.addEventListener("click", function(){playAndPause; if(titre.paused){titre.play()}else{titre.pause()})

btnSpeakDown.addEventListener("click" , function(){speaker.stepDown();
    titre.volume = speaker.value;
    console.log(titre.volume)});

btnSpeakUp.addEventListener("click" , function(){speaker.stepUp();
    titre.volume = speaker.value});

speaker.addEventListener("change",function(e){titre.volume = e.target.value;});

rangeTime.addEventListener("change",function(e){titre.currentTime = parseFloat(e.target.value);});


titre.addEventListener("play", playAndPause);
titre.addEventListener("pause",playAndPause)





var actualTime = -1;


function playAndPause(){
    
    if(titre.paused ){
        actualTime = setInterval(upDateTime,100);
        // 
        iconPlayPause.setAttribute("class" , "fas fa-play-circle");
    }else{
        iconPlayPause.setAttribute("class" , "fas fa-pause-circle");
        // titre.pause();
        clearInterval(actualTime);
        
    }
}

function upDateTime(){
    console.log(rangeTime.value);
    var n= parseFloat(rangeTime.value);
    n = titre.currentTime; 
    rangeTime.value=n.toString();
    console.log(n);
    console.log(rangeTime.value);
    if (titre.currentTime==duree){
        clearInterval(actualTime);
    }

}    


