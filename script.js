const playListContainer = document.getElementsByClassName('play-list-container')[0];

const audioTag = document.getElementsByClassName('audioTag')[0]

const currentProgressTag = document.getElementById('currentProgress');

const currentAndTotleTimeTag = document.getElementsByClassName('currentAndTotleTime')[0];

const playButtonTag = document.getElementsByClassName('playButton')[0];

const pauseButtonTag = document.getElementsByClassName('pauseButton')[0];

const musicPlay = [
  {musicId: 'music/Akon-Beautiful.mp3', title: 'Beautiful - Akon' },
  {musicId: 'music/Right Now-Akon .mp3', title: 'Right Now - Akon' },
  {musicId: 'music/Toosii - Favorite Song .mp3', title: 'Favorite Song - Toosii ' },
  {musicId: 'music/程响 - Hurt Inside .mp3', title: 'Hurt Inside- 程响 ' },
]
for (let i= 0; i < musicPlay.length; i++) {
  const musicTag = document.createElement('div');
  musicTag.addEventListener('click', () => {
    musicId = musicPlay[i].musicId
    audioTag.src = musicId
    audioTag.play()
    isPlaying = true
    updatePlayAndPause()
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

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener('click', () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    const soungIdPlay = musicPlay[currentPlayingIndex].musicId;
    audioTag.src = soungIdPlay
    audioTag.play()
    
    updatePlayAndPause();
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

const updatePlayAndPause = () => {
  if (isPlaying){
    playButtonTag.style.display = 'none'
    pauseButtonTag.style.display = 'inline'
  }else {
    playButtonTag.style.display = 'inline'
    pauseButtonTag.style.display = 'none'
  }
}



// const title = (i + 1).toString() + '.' + musicPlay[i].title;
// musicTag.textContent = title