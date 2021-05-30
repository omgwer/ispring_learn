window.addEventListener('load', function () {
  setBodyLoaded();
  setAnimatedBlockLoaded();
  widthDocumentParser();
  checkedControl();
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

function widthMeter() {
  let widthDocument = document.querySelector('body').offsetWidth;
  if (widthDocument >= 740) {
    return;
  }
  let offsetData = document.querySelector('body');
  offsetData.style.setProperty('--primary-width', (widthDocument - 35)+ 'px');
}

function widthDocumentParser () {
  widthMeter();
  window.addEventListener('resize', function (evt){
    widthMeter();
  })
}

function checkedControl() {
  let checkboxFirstList = document.getElementById('checkboxFirst');
  let checkboxSecondList = document.getElementById('checkboxSecond');
  let checkboxThirdList = document.getElementById('checkboxThird');

  checkboxFirstList.addEventListener('click', function (evt){
    if (checkboxFirstList.checked) {
      checkboxSecondList.checked = '';
      checkboxThirdList.checked = '';
    }
  });
  checkboxSecondList.addEventListener('click', function (evt){
    if (checkboxSecondList.checked) {
      checkboxFirstList.checked = '';
      checkboxThirdList.checked = '';
    }
  });
  checkboxThirdList.addEventListener('click', function (evt){
    if (checkboxThirdList.checked) {
      checkboxFirstList.checked = '';
      checkboxSecondList.checked = '';
    }
  });
}





