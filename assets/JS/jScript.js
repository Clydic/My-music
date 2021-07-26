$(function(){
    
    // Initialisation des variables
    var titre = $("audio");
   
    var play = $("#play");
    var iconPlayPause = $("#playpause");
    console.log($("audio").attr("src"))

    var speaker = $("#volume");
    var btnSpeakDown = $("#speakdown");
    var btnSpeakUp = $("#speakup");

    var rangeTime = $("#progresstime");
    var btnPrevious = $("#previous");
    var btnNxt = $("#next");

    var path = "assets/data/media";

    var aMedia = media;
    var artistName = $("#artiste");
    artistName.html(aMedia[0]["artist"]);

    var titleName = $("#titre");
    titleName.html(aMedia[0]["name"]);


    rangeTime.attr("max",titre.get(0).duration)
    rangeTime.get(0).value=0;
    speaker.get(0).vallue = titre.volume;

    play.click(function(){ changeIconePLay();
                                                if(titre.get(0).paused){titre.get(0).play();} 
                                                else{titre.get(0).pause();}
    });

    /*--------------Assignation des évènements---------------*/
    //Assignation de l'évènement click au bouton pour Baisser le volume
    btnSpeakDown.click(function(){speaker.get(0).stepDown();
                                                        titre.volume = speaker.value;});

    //Assignation de l'évènement click au bouton pour Augmenter le volume
    btnSpeakUp.click(function(){speaker.get(0).stepUp();
                                                    titre.volume = speaker.value});
    //Ajout de l'évènement change au curseur de volume afin de gérer celui-ci
    speaker.change(function(e){titre.get(0).volume = e.target.value;});


    //Assignation des évènement play and pause et mise à jour  du curseur de progression de musique
    titre.bind("play",changeIconePLay);
    titre.bind("pause",changeIconePLay);
    titre.bind("timeupdate", function(){rangeTime.get(0).value=titre.get(0).currentTime.toString();});


    //Assignation des évènement lick aux bouton chanson précédente et suivante
    btnPrevious.click(previous);
    btnNxt.click(next);


    /*------------Fonctions--------------- */

    // Change l'Icone du bouton de lecture
    /**
     * IN:Void
     * OUT:Void
     */
    function changeIconePLay(){
        
        if(titre.get(0).paused){
            
            // clearInterval(actualTime);
            
            iconPlayPause.attr("class" , "fas fa-play-circle");

        }else{
            iconPlayPause.attr("class" , "fas fa-pause-circle");
            // actualTime = setInterval(upDateTime,100);
            
            
        }
    }

    //Change la musique actuelle par une musique à l'indexe donné
    /**
     * 
     * @param {number} index 
     */
    function loadMusic(index){
        var music = aMedia[index];
        titre.attr("src",path+"/"+music["file"]+".mp3");
        $("#artiste").html(music["artist"]);
       $("#titre").html(music["name"]);
        titre.get(0).load();
        changeIconePLay();
    


    }    
    /**
     * Récupère l'indice d'un élément donné par son array, sa clé et sa valeur.
     * @param {Array} array 
     * @param {String} key 
     * @param {String} word 
     * @returns {Int} 
     */
    function getIndex (array , key , word){
        for (i in array){
            if (array[i][key] == word){
               
                return parseInt(i);
            }
        }
    }

    /**
     * Modifie la musique actuel par la précédente dans la liste
     * @param None
     * @returns None
     */
    function previous(){
        // var nom = titre.getAttribute("name")
        var index = getIndex(aMedia , "name" , titre.attr("name"))
        if(index>0){
            loadMusic(index-1);
            titre.attr("name",aMedia[index-1]["name"]);
            rangeTime.get(0).value="0"
            titre.get(0).autoplay=true;
            // nom = titre.getAttribute("name");
        
            
        }
        

    }
    /**
     * Modifie la musique actuel par la suivante dans la liste
     * @param Void
     * @returns None
     */
    function next(){
        var index = getIndex(aMedia , "name" , titre.attr("name"))
        if(index<aMedia.length-1){
            loadMusic(index+1);
            titre.attr("name",aMedia[index+1]["name"]);
            rangeTime.get(0).value="0"
            titre.get(0).autoplay=true;
        }
    }
    /**
     * Crée les pochettes des musiques à partir du tableau Media.
     * @param None
     * 
     */
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
            
            $("#divpochette").append(div);
            div.setAttribute("class",classPochette)
            div.setAttribute("id",id)
            div.setAttribute("name",aMedia[i]["name"])
            $("#"+id).append(img);
            $("#"+id).append(document.createElement("div"));
            

            var selector =$("#"+id+" "+"div"); 
            selector.addClass("card-body bg-light rounded-1");
            selector.append(h5);
            selector.append(h6);
            

            var selector = $("#"+id+" "+"img");
            selector.attr("src","assets/data/pochettes/250/"+aMedia[i]["photo"]);
            selector.attr("name",aMedia[i]["name"]);
            selector.click(function(e){pickMusic(this)})

            selector = $("#"+id+" "+"div h5");
            selector.addClass("card-title")
            selector.html(aMedia[i]["name"])

            selector = $("#"+id+" "+"div h6");
            selector.addClass("card-title")
            selector.html(aMedia[i]["artist"]);
        }
        
        
    }
    function jCreatePochette(){
        var classPochette = "pochette d-flex flex-column m-1  col-xs-6 col-md-4 col-lg-3"
        for (i in media){
            $("divpochette").append("div");
            div.setAttribute("class",classPochette)
            div.setAttribute("id",id)
            div.setAttribute("name",aMedia[i]["name"])
            $(id).append(img);
            $(id).append(document.createElement("div"));

        }
    }
    /**
     * 
     * @param {Event} event 
     */
    function pickMusic(target){
        var index = getIndex(aMedia , "name", target.name);
        loadMusic(index);
        titre.get(0).autoplay=true;

    }
    /**
     * Lance la fonction Pochette
     */
    createPochette();

});
    


                  