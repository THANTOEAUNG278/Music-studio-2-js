const playListContainer = document.getElementsByClassName('play-list-container')[0];

const audioTag = document.getElementsByClassName('audioTag')[0]

const currentProgressTag = document.getElementById('currentProgress');

const currentAndTotleTimeTag = document.getElementsByClassName('currentAndTotleTime')[0];

const playButtonTag = document.getElementsByClassName('playButton')[0];

const pauseButtonTag = document.getElementsByClassName('pauseButton')[0];

const previousButtonTag = document.getElementsByClassName('previousButton')[0];

const nextButtonTag = document.getElementsByClassName('nextButton')[0];


const musicPlay = [
  {musicId: 'music/Akon-Beautiful.mp3', title: 'Beautiful - Akon' },
  {musicId: 'music/Right Now-Akon .mp3', title: 'Right Now - Akon' },
  {musicId: 'music/Toosii - Favorite Song .mp3', title: 'Favorite Song - Toosii ' },
  {musicId: 'music/程响 - Hurt Inside .mp3', title: 'Hurt Inside- 程响 ' },
]
let currentPlayingIndex = 0;
for (let i= 0; i < musicPlay.length; i++) {
  const musicTag = document.createElement('div');
  musicTag.addEventListener('click', () => {
    currentPlayingIndex = i;
    activeNow(musicTag,i)
    playMusic()
  })

  musicTag.classList.add('box')
  const title = document.createTextNode((i + 1).toString() + '.' + musicPlay[i].title);
  musicTag.appendChild(title)
  playListContainer.appendChild(musicTag)
}
let duration = 0;
let durationText = '00:00';
audioTag.addEventListener('loadeddata', () => {
  duration = Math.floor(audioTag.duration)
  durationText = createMinutesAndSeconds(duration);
})
audioTag.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audioTag.currentTime)
 const currentTimeText = createMinutesAndSeconds(currentTime);
 const currentTimeTextAnddurationText = currentTimeText + " / " + durationText;
 currentAndTotleTimeTag.textContent = currentTimeTextAnddurationText;
 updateCurrentProgress(currentTime)
})
// progressBar create start
const updateCurrentProgress = (currentTime) =>{
  const currentProgressWidth = (500/duration) * currentTime
  currentProgressTag.style.width = currentProgressWidth.toString() + "px" 
}
// progressBar create end
const createMinutesAndSeconds = (totalSecond) => {
  const minutes = Math.floor(totalSecond/60);  
  const seconds = totalSecond % 60;


  const minuteText = minutes < 10 ? "0" + minutes.toString() :minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() :seconds;
  return minuteText + ":" + secondText;
}


let isPlaying = false;
playButtonTag.addEventListener('click', () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    playMusic();
  } else {
    audioTag.play()
    updatePlayAndPause()
  }
})

pauseButtonTag.addEventListener('click', () => {
  isPlaying = false
  audioTag.pause()
  updatePlayAndPause()
})

previousButtonTag.addEventListener('click', () => {
  if(currentPlayingIndex === 0){
    currentPlayingIndex = musicPlay.length-1
  }else {
    currentPlayingIndex -= 1;
  }
  playMusic()
})

nextButtonTag.addEventListener('click', () => {
  if(currentPlayingIndex === musicPlay.length-1 ){
    currentPlayingIndex = 0;
  }else {
    currentPlayingIndex += 1;
  }
  playMusic()

})

const playMusic = () => {
  const soungIdToPlay = musicPlay[currentPlayingIndex].musicId;
  audioTag.src = soungIdToPlay
  audioTag.play()
  isPlaying = true;
  updatePlayAndPause()
  activeNow(currentPlayingIndex)

}
const updatePlayAndPause = () => {
  if (isPlaying){
    playButtonTag.style.display = 'none'
    pauseButtonTag.style.display = 'inline'
  }else {
    playButtonTag.style.display = 'inline'
    pauseButtonTag.style.display = 'none'
  }
}

const activeNow = (i) =>{
  const musicActive = document.getElementsByClassName('box');
for (let j = 0; j< musicActive.length; j++){
  musicActive[j].classList.remove('activenow')
}
const musicTag = musicActive[i]
musicTag.classList.add('activenow')
}


// const activeNow = (i) =>{
//   if (currentPlayingIndex === i){
//     musicTag.classList.add('activenow')
//   }else{
//     musicTag.classList.remove('activenow')
//   }

// }


// const title = (i + 1).toString() + '.' + musicPlay[i].title;
// musicTag.textContent = title

// 10/2 =5
 /*
10/2 =5
10/7 =1.4


*/