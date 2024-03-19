const myAudio = document.querySelector("audio")
const playButton = document.querySelector("#play")
const myShuffle = document.querySelector("#shuffle")

let isAudioPlaying = false

function playTheAudio()
{
    myAudio.play()

    playButton.classList.replace("fa-play", "fa-pause")
    isAudioPlaying = true
}

function pauseTheAudio()
{
    myAudio.pause()
    playButton.classList.replace("fa-pause", "fa-play")
    isAudioPlaying = false
}


playButton.addEventListener("click", function()
{
    if(isAudioPlaying)
    {
        pauseTheAudio()
    }
    else
    {
        playTheAudio()
    }
    
})


const info = [
    {
       songName: "AAA",
       singerName: "Lil Nas X",
       data: 2
    },
    {
        songName: "BBB",
        singerName: "ATB/Topic/A7S",
        data: 3
    },
    {
        songName: "CCC",
        singerName: "Ella Henderson & Tom Grennan",
        data: 4
    }
]

const forwardButton = document.querySelector("#forward")
const mySongName = document.querySelector("h3")
const mySingerName = document.querySelector("h4")
const backwardButton = document.querySelector("#backward")

const myImage = document.querySelector("#image")

function updateSong(songData){

    mySongName.textContent = songData.songName
    mySingerName.textContent = songData.singerName
    myImage.src = `./images/image-${songData.data}.jpg`
    myAudio.src = `./musics/music-${songData.data}.mp3`
}

let songPosition = 0

// songPosition = 2(last song) --> (0)first song

// 3

const myLike = document.querySelector("#like")

forwardButton.addEventListener("click", function()
{    
    myLike.style.color = "white"
    // Update the Song data(image, singer name, song name, audio file)
    if(songPosition > info.length - 1)
    {
        songPosition = 0
    }

    updateSong(info[songPosition])
    console.log(songPosition)
    songPosition++

    playTheAudio()

})


backwardButton.addEventListener("click", function()
{    
    
    myLike.style.color = "white"

    songPosition--

    if(songPosition < 0)
    {
        songPosition = info.length - 1
    }

    updateSong(info[songPosition])

    playTheAudio()

    
})

const htmlTotalDuration = document.querySelector(".totalDuration")
const htmlCurrentTime = document.querySelector(".currentTime")
const ChildProgressBar = document.querySelector(".childProgressBar")

myAudio.addEventListener("timeupdate", function(output)
{
    let myCurrentTime = output.srcElement.currentTime
    let myTotalDuration = output.srcElement.duration

    let totalDurationInMinutes = Math.floor(myTotalDuration / 60)
    let totalDurationInSeconds = Math.floor(myTotalDuration % 60)//remainder

    if(totalDurationInSeconds < 10)
    {
        totalDurationInSeconds = `0${totalDurationInSeconds}`
    }

    htmlTotalDuration.textContent = `${totalDurationInMinutes}:${totalDurationInSeconds}`




    let currentTimeInMinutes = Math.floor(myCurrentTime / 60)
    let currentTimeInSeconds = Math.floor(myCurrentTime % 60)//remainder

    if(currentTimeInSeconds < 10)
    {
        currentTimeInSeconds = `0${currentTimeInSeconds}`
    }

    htmlCurrentTime.textContent = `${currentTimeInMinutes}:${currentTimeInSeconds}`

    ChildProgressBar.style.width = `${myCurrentTime / myTotalDuration * 100}%`
})


myLike.addEventListener("click", function()
{
    // Change the color to red and also store the details(Song Name and Singer Name)
    myLike.style.color = "red"
    // Adding the details to local storage
    localStorage.setItem(mySingerName.textContent, mySongName.textContent)
})

myLike.addEventListener("dblclick", function()
{
    myLike.style.color = "white"

    localStorage.removeItem(mySingerName.textContent)
})

// 3 songs -> 0 or 1 or 2
myShuffle.addEventListener("click", function()
{
    const songPositionNo = Math.floor(Math.random() * info.length)//1
    updateSong(info[songPositionNo])//info[0] OR info[1] info[2]
    playTheAudio()
})



const ParentProgressBar = document.querySelector(".parentProgressBar")

ParentProgressBar.addEventListener("click", function(output)
{
    const clickPercentage = output.offsetX / output.srcElement.offsetWidth * 100

    ChildProgressBar.style.width = `${clickPercentage}%`
    myAudio.currentTime = (output.offsetX / output.srcElement.offsetWidth) * myAudio.duration
    
})