import VideoPlayer from './videoPlayer';

function init() {
  const videoElement = document.querySelector('#video') as HTMLVideoElement;
  const videosSelect = document.getElementById('select') as HTMLSelectElement;
  const videoPlayer = new VideoPlayer(videoElement);

  videosSelect.addEventListener('change', (event) => {
    const { value } = event.target as HTMLSelectElement;
    videoPlayer.load(value);
  });
}

init();
