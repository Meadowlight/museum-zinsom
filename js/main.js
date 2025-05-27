window.onload = function () {
  // 로딩 화면 1초 후 사라짐
  const loading = document.getElementById('loading-screen');
  if (loading) {
    setTimeout(() => loading.style.display = 'none', 1000);
  }

  // BGM 토글
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
}
