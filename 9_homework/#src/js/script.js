window.addEventListener('load', function () {
  setBodyLoaded();
  setAnimatedBlockLoaded();
  setScrollToStartPage();
  setMenuScrollNavigation();
  initPopup();
  initMobileMenu();
  validationForm();
  customDropList();
  setAccordionBlockHide();
  smoothAccordionSlide();
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

function setAccordionBlockHide() {
  const accordionButtons = document.querySelectorAll('.faq__accordion');
  accordionButtons.forEach(element =>{
    element.addEventListener('click', evt =>{
      const triggerButton = element.querySelector('.faq__accordion_hide')
      if (!triggerButton.classList.contains('active')) {
        const activeDropList = document.querySelector('.active');
        activeDropList.classList.remove('active');
      }
    });
  });
}

function smoothAccordionSlide() {
  document.querySelector('.faq__container').addEventListener('click', function (event) {
    let block = event.target.closest('.faq__accordion');
    if (block) {
      let elem = block.querySelector('.faq__accordion_hide');
      if (elem.classList.contains('active')) {
        elem.style.height = getComputedStyle(elem).height;
        elem.classList.remove('active');
        getComputedStyle(elem).height; // reflow
        elem.style.height = '';
      } else {
        elem.classList.add('active');
        let h = getComputedStyle(elem).height;
        elem.style.height = '0';
        getComputedStyle(elem).height; // reflow
        elem.style.height = h;
        setTimeout(function () { elem.style.height = '' }, 1000); // Когда закончится анимация
      }
    }
  })
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

function initPopup() {
  const closedButton = document.querySelector('.popup_closed');
  const popupForm = document.querySelector('.popup');
  const overlay = document.querySelector('.overlay');
  const popupButtons = document.querySelectorAll('.js-button-join');
  const VISUALLY_HIDDEN = 'visually-hidden';

  function hiderPopup(command, evt) {
    evt.preventDefault();
    if (command) {
      popupForm.classList.add(VISUALLY_HIDDEN);
      overlay.classList.add(VISUALLY_HIDDEN);
    } else {
      popupForm.classList.remove(VISUALLY_HIDDEN);
      overlay.classList.remove(VISUALLY_HIDDEN);
    }
  }

  closedButton.addEventListener('click', hiderPopup.bind(null, 'closePopup'));
  overlay.addEventListener('click', hiderPopup.bind(null, 'closePopup'));
  popupButtons.forEach(popupButton => {
    popupButton.addEventListener('click', hiderPopup.bind(null, null));
  })
}

function initMobileMenu() {
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
  const feedbackProffession = document.querySelector('.feedback-form__container');
  const optionList = feedbackProffession.querySelectorAll('.option');
  optionList.forEach(option => {
    option.addEventListener('click', evt =>{
      feedbackProffession.classList.add('valid');
    })
  })
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