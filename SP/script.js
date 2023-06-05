console.log("welcome to spotify")

//Variables
let soundIndex = 0;
let audioElement = new Audio('./source/sounds/0.mp3'); 
let sPlay = document.getElementById('songsPlay');
let soundNamemain = document.getElementById('soundNamemain');
let Progressbar = document.getElementById('Progressbar');
let soundItem = Array.from(document.getElementsByClassName('soundItem'));
let soundIemPlay = Array.from(document.getElementsByClassName('soundIemPlay'));


let Sounds = [
    {soundName: "Maan Mare Jaan (Afterlife)", filePath: "./source/sounds/0.mp3", coverPath: "./source/covers/maan.jpg"},
    {soundName: "NCS", filePath: "./source/sounds/1.mp3", coverPath: "./source/covers/1.jpg"},
    {soundName: "NCS", filePath: "./source/sounds/2.mp3", coverPath: "./source/covers/2.jpg"},
    {soundName: "NCS", filePath: "./source/sounds/3.mp3", coverPath: "./source/covers/3.jpg"},
    {soundName: "NCS", filePath: "./source/sounds/4.mp3", coverPath: "./source/covers/4.jpg"},
    {soundName: "NCS", filePath: "./source/sounds/5.mp3", coverPath: "./source/covers/5.jpg"},

]

soundItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Sounds[i].coverPath;
    element.getElementsByClassName("soundName")[0].innerText = Sounds[i].soundName;
    
});  


// audioElement.play(); 

//play/pause listener
$(document).ready(function() {
    $('#songsPlay').click(function(){
        if (audioElement.paused || audioElement.currentTime<=0) {
            audioElement.play();
            $("#songsPlay").removeClass('fa-solid fa-circle-play');
            $("#songsPlay").addClass('fa-solid fa-circle-pause');
            $("#playgif").css("opacity", "1");
        }
        else{
            audioElement.pause();
            $("#songsPlay").removeClass('fa-solid fa-circle-pause');
            $("#songsPlay").addClass('fa-solid fa-circle-play');
            $("#playgif").css("opacity", "0");
           }
       });  
       
    });

//Listen to Event
audioElement.addEventListener('timeupdate', () => {
    //update progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    $("#Progressbar").val(progress);
});
    
Progressbar.addEventListener('change', function () {
        audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
    });


const makeAllplays = ()=>{
        Array.from(document.getElementsByClassName('soundIemPlay')).forEach((element)=>{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        })
    }    


Array.from(document.getElementsByClassName('soundIemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        // console.log(e.target);
        makeAllplays();
        soundIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./source/sounds/${soundIndex+1}.mp3`;
        soundNamemain.innerText = Sounds[soundIndex].soundName;
        audioElement.currentTime = 0;
        audioElement.play();
        songsPlay.classList.remove('fa-circle-play');
        songsPlay.classList.add('fa-circle-pause');
        
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(soundIndex>=6){
        soundIndex = 0
    }
    else{
        soundIndex +=1;
    }
    audioElement.src = `./source/sounds/${soundIndex+1}.mp3`;
    soundNamemain.innerText = Sounds[soundIndex].soundName;
    audioElement.currentTime = 0;
    audioElement.play();
    songsPlay.classList.remove('fa-circle-play');
    songsPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(soundIndex<=0){
        soundIndex = 0
    }
    else{
        soundIndex -=1;
    }
    audioElement.src = `./source/sounds/${soundIndex+1}.mp3`;
    soundNamemain.innerText = Sounds[soundIndex].soundName;
    audioElement.currentTime = 0;
    audioElement.play();
    $("#soundIemPlay").removeClass('fa-solid fa-circle-play');
    $("#soundIemPlay").addClass('fa-solid fa-circle-pause');
})
