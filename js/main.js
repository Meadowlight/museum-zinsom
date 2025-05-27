window.onload = function () {
  const bgm = document.getElementById('bgm');
  const toggleBtn = document.getElementById('bgm-toggle');

  toggleBtn.addEventListener('click', () => {
    if (bgm.paused) {
      bgm.play();
      toggleBtn.textContent = '⏸️';
    } else {
      bgm.pause();
      toggleBtn.textContent = '🎵';
    }
  });
};
