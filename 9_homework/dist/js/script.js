window.addEventListener('load', function () {
  setBodyLoaded();
  setAnimatedBlockLoaded();
  setScrollToStartPage();
  setMenuScrollNavigation();
  closedPopup();
  openPopup();
  setMobileMenu();
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
  const firstButton = document.getElementById('firstButton');
  const secondButton = document.getElementById('secondButton');
  const thirdButton = document.getElementById('thirdButton');

  function buttonHider(element) {
    const toggleCross = element.querySelector('.faq__arrow');
    const hideMenu = element.querySelector('.faq__accordion_hide');
    toggleCross.classList.toggle('rotate');
    hideMenu.classList.toggle('active');
  }

  firstButton.addEventListener('click', evt => {
    firstButton.querySelector('.faq__arrow').classList.toggle('rotate');
    if (secondButton.querySelector('.faq__accordion_hide').classList.contains('active')){
      buttonHider(secondButton);
    }
    if (thirdButton.querySelector('.faq__accordion_hide').classList.contains('active')){
      buttonHider(thirdButton);
    }
  });

  secondButton.addEventListener('click', evt => {
    secondButton.querySelector('.faq__arrow').classList.toggle('rotate');
    if (firstButton.querySelector('.faq__accordion_hide').classList.contains('active')){
      buttonHider(firstButton);
    }
    if (thirdButton.querySelector('.faq__accordion_hide').classList.contains('active')){
      buttonHider(thirdButton);
    }
  });

  thirdButton.addEventListener('click', evt => {
    thirdButton.querySelector('.faq__arrow').classList.toggle('rotate');
    if (secondButton.querySelector('.faq__accordion_hide').classList.contains('active')){
      buttonHider(secondButton);
    }
    if (firstButton.querySelector('.faq__accordion_hide').classList.contains('active')){
      buttonHider(firstButton);
    }
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
  const gradeA = document.getElementById('grade-a');
  const gradeB = document.getElementById('grade-b');
  const gradeC = document.getElementById('grade-c');
  const feedbackProffession = document.querySelector('.feedback-form__container');
  gradeA.addEventListener('click', evt =>{
    feedbackProffession.classList.add('valid');
  });
   gradeB.addEventListener('click', evt =>{
     feedbackProffession.classList.add('valid');
   });
   gradeC.addEventListener('click', evt =>{
     feedbackProffession.classList.add('valid');
   });
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

