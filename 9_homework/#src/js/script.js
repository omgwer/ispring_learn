window.addEventListener('load', function () {
  setBodyLoaded();
  setAnimatedBlockLoaded();
  widthDocumentParser();
  checkedDropList();
  setScrollToStartPage();
  setMenuScrollNavigation();
  closedPopup();
  openPopup();
  setMobileMenu();
  validationForm();
  customDropList();
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

function checkedDropList() {
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

function setScrollToStartPage() {
  const button = document.getElementById('scrollToStart');
  window.addEventListener('scroll', function (evt){
    let offsetYPosition = window.pageYOffset.toFixed();
    const offsetYToButtonVisible = 750;
    if (offsetYPosition >= offsetYToButtonVisible ) {
      button.classList.remove('visually-hidden');
    } else {
      button.classList.add('visually-hidden');
    }
  })

   button.addEventListener('click', function (evt){
     evt.preventDefault();
     window.scroll({
       left: 0,
       top: 0,
       behavior: 'smooth',
     })
   })
}

function setMenuScrollNavigation() {
  const smoothLinks = document.querySelectorAll('.js-menu-item');
  smoothLinks.forEach(smoothLink => {
    smoothLink.addEventListener('click', evt => {
      evt.preventDefault();
      const id = smoothLink.getAttribute('href');
      setInteractiveParameters();
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    });
  });
}

function closedPopup() {
  const closedButton = document.querySelector('.popup_closed');
  const popupForm = document.querySelector('.popup');
  const overlay = document.querySelector('.overlay');

  closedButton.addEventListener('click', function (evt){
    evt.preventDefault();
    popupForm.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden');
  })
  overlay.addEventListener('click', function (evt){
    evt.preventDefault();
    popupForm.classList.add('visually-hidden');
    overlay.classList.add('visually-hidden');
  })
}

function openPopup() {
  const popupButtons = document.querySelectorAll('.js-button-join');
  const popupForm = document.querySelector('.popup');
  const overlay = document.querySelector('.overlay');
  popupButtons.forEach(popupButton => {
    popupButton.addEventListener('click', evt => {
      evt.preventDefault();
      popupForm.classList.remove('visually-hidden');
      overlay.classList.remove('visually-hidden');
    })
  })
}

function setMobileMenu() {
  const burgerButton = document.querySelector('.burger-open');
  const navigationMenu = document.querySelector('.header__links');
  burgerButton.addEventListener('click', evt => {
    navigationMenu.classList.toggle('adaptive_hide');
    burgerButton.classList.toggle('burger-close');
  });
}

function setInteractiveParameters() {
  const burgerButton = document.querySelector('.burger-open');
  const navigationMenu = document.querySelector('.header__links');
  const triggerForClose = navigationMenu.classList.contains('adaptive_hide');
  if (!triggerForClose) {
    navigationMenu.classList.toggle('adaptive_hide');
    burgerButton.classList.toggle('burger-close');
  }
}

 function validationForm() {
//   let invalidName = document.getElementById('user_name');
//   let invalidEmail = document.getElementById('user_email');
//
//   invalidName.oninvalid = function (evt) {
//       console.log('first-11');
//       evt.target.setCustomValidity('Имя состоит из слова или слов, разделенных пробелом. Без символов и цифр!');
//     }
//
//
//   invalidEmail.addEventListener('change', evt=> {
//     evt.oninvalid = function (evt) {
//       evt.target.setCustomValidity('Email состоит из латинских букв. Формат email xxx@xx.xxx');
//     }
//   })
}

function customDropList() {
  const selected = document.querySelector(".selected");
  const optionsContainer = document.querySelector(".options-container");
  const optionsList = document.querySelectorAll(".option");

  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
  });

  optionsList.forEach(option => {
    option.addEventListener("click", () => {
      selected.innerHTML = option.querySelector("label").innerHTML;
      optionsContainer.classList.remove("active");
    });
  });
}