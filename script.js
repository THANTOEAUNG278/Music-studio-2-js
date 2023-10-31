const playListContainer = document.getElementsByClassName('play-list-container')[0];

const audioTag = document.getElementsByClassName('audioTag')[0]

const currentProgressTag = document.getElementById('currentProgress');

const currentAndTotleTimeTag = document.getElementsByClassName('currentAndTotleTime')[0];


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
  })
  musicTag.classList.add('box')
  const title = document.createTextNode((i + 1).toString() + '.' + musicPlay[i].title);
  musicTag.appendChild(title)
  playListContainer.appendChild(musicTag)
}
let durationText = '00:00';
audioTag.addEventListener('loadeddata', () => {
  const duration = Math.floor(audioTag.duration)
  durationText = createMinutesAndSeconds(duration);
})
audioTag.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audioTag.currentTime)
 const currentTimeText = createMinutesAndSeconds(currentTime);
 const currentTimeTextAnddurationText = currentTimeText + " / " + durationText;
 currentAndTotleTimeTag.textContent = currentTimeTextAnddurationText;
})

const createMinutesAndSeconds = (totalSecond) => {
  const minutes = Math.floor(totalSecond/60);
  const seconds = totalSecond % 60;


  const minuteText = minutes < 10 ? "0" + minutes.toString() :minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() :seconds;
  return minuteText + ":" + secondText;
}





// const title = (i + 1).toString() + '.' + musicPlay[i].title;
// musicTag.textContent = title