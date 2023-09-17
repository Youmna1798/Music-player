var playlist = [
    "https://ia601701.us.archive.org/5/items/78_show-train_two-on-the-aisle-orchestra-jule-styne-betty-comden-adolph-green-herber_gbia8001738/02%20-%20SHOW%20TRAIN%20-%20%22TWO%20ON%20THE%20AISLE%22%20CHORUS%20AND%20ORCHESTRA.mp3",
"https://ia801701.us.archive.org/5/items/78_show-train_two-on-the-aisle-orchestra-jule-styne-betty-comden-adolph-green-herber_gbia8001738/12%20-%20FINALE%20-%20%22TWO%20ON%20THE%20AISLE%22%20CHORUS%20AND%20ORCHESTRA.mp3",
"https://ia601701.us.archive.org/5/items/78_show-train_two-on-the-aisle-orchestra-jule-styne-betty-comden-adolph-green-herber_gbia8001738/01%20-%20OVERTURE%20-%20%22TWO%20ON%20THE%20AISLE%22%20ORCHESTRA%20-%20Jule%20Styne.mp3",
"https://ia601701.us.archive.org/5/items/78_show-train_two-on-the-aisle-orchestra-jule-styne-betty-comden-adolph-green-herber_gbia8001738/03%20-%20HOLD%20ME%20-%20HOLD%20ME%20-%20HOLD%20ME%20%28Hold%20Me%20Tight%29%20-%20DOLORES%20GRAY.mp3"

]
var playlistname = ["show train", "finale", "overtrue", "hold me"]
var x = document.getElementById("myAudio");
var ul = document.getElementById('MyList')
var buttons = document.querySelectorAll("#MyList li button")
var songlist = document.querySelectorAll("#MyList li")

for(let i =0; i < playlist.length; i++){
    createElements(playlist[i],playlistname[i])
}
// createElements function
function createElements(sSrc,sName){
    let li = document.createElement("li");
    ul.appendChild(li);
    let a = document.createElement("a");
    li.appendChild(a);
    a.href = sSrc;
    a.innerHTML += sName;
    let removeButton = document.createElement("button")
    li.appendChild(removeButton)
    removeButton.innerHTML += "x" 
    
}


     
// playAudio function
function playAudio() { 
    x.play(); 
} 

// Remove function
function Remove() {
    buttons = document.querySelectorAll("#MyList li button")
    songlist = document.querySelectorAll("#MyList li")
    for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", () => {
        delete playlist[i]
        songlist[i].remove()
        })
    }
}

Remove()
// preventDef function
function preventDef(){
    let anchors = document.querySelectorAll("a")
    for(let i=0; i < playlist.length; i++){
        anchors[i].addEventListener("click",(e)=>{
        e.preventDefault()    
        x.src = playlist[i]
        playAudio()
        })
    }    
}

preventDef()

// pauseAudio function
function pauseAudio() { 
  x.pause(); 
} 

var inputAudio = document.querySelector(".custom-file-input")
// Adding songs function

inputAudio.addEventListener("change",()=>{
    fileName = inputAudio.files[0].name
    let name = fileName.split(".")
    staticPath = "../Songs/" + fileName
    playlist.push(staticPath)
    playlistname.push(name[0])
    createElements(staticPath, name[0])
    preventDef()
    Remove()
})

// Playback function
var index = 0;
function Playback() {
    x.src = playlist[0];
    playAudio()
    x.addEventListener("ended", function () {
        index++;
        if (index == playlist.length) {
            index = 0;
        }
        else{
            x.src = playlist[index];
            playAudio();


        }
    });
}


// RandomPlay function
var lastSong = null;
var selection = null;
function RandomPlay() { 
    x.src = playlist[0];
    playAudio()
    x.addEventListener("ended", function() {
        while(selection == lastSong){
            selection = Math.floor(Math.random() * playlist.length);
        }
        lastSong = selection;
        x.src = playlist[selection];
        playAudio();
    });
}
$('#Mylist> ul > li').each(function(i,li){
    var href = $(li).find('a').attr("href");
    if (reverse(document.location.href).indexOf(reverse(href))==0){
        $(li).addClass('active');
    }
});
