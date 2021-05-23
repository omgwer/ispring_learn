window.addEventListener('load', function () {
  setBodyLoaded();
  setAnimatedBlockLoaded();
});

function setBodyLoaded() {
  let body = document.getElementsByTagName('body')[0];
  body.classList.add('loaded');
}

function setAnimatedBlockLoaded() {
  const animatedBlockAdventages = document.getElementById('animatedBlockAdventages');
  const animatedBlock = document.getElementById('animatedBlock');
  if (!animatedBlock) {
    return;
  }
  let reachedSecond = false;
  let reached = false;
  const ANIMATED_BLOCK_OFFSET = 300;
  const ANIMATED_BLOCK_SECOND = 150;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset + window.innerHeight > animatedBlock.offsetTop + ANIMATED_BLOCK_OFFSET) {
      if (!reached) {
        animatedBlock.classList.add('scrolled');
        reached = true;
      }
    }
    if (window.pageYOffset + window.innerHeight > animatedBlockAdventages.offsetTop + ANIMATED_BLOCK_SECOND) {
      if (!reachedSecond) {
        animatedBlockAdventages.classList.add('scrolled');
        reachedSecond = true;
      }
    }
  })
}