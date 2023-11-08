'use strict';

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// Modal window
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///Page Scrolling
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); //Get the x and y coordinates between the element and top of the viewport

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // Get the X and Y coordinates of current scroll

  console.log(
    'Height/Width Viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // Get the current viewport height and width

  //Scrolling

  // window.scrollTo(s1coords.left, s1coords.top);

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///Page Navigation
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element  originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Match only the elements you are interested in
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///Tabbed component
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;
  // Remove the active class on all elements
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Add the active class again on clicked element
  clicked.classList.add('operations__tab--active');

  //Remove the active class on tab content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///Selecting, Deleting and creating elements
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>`;
// header.prepend(message); // Append it to the start
// header.append(message.cloneNode(true));
header.append(message); // Append it at the end

// header.before(message); // Append it to the start
// header.after(message); // Append it at the end

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// We can only access inline styles, to access other styles use getComputedStyles method
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Menu fade animation
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Sticky navigation
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

/**
 * This is not efficient as the scroll event is fired very frequently each time we scroll
 */

// const initialCoords = section1.getBoundingClientRect();
// console.log('initialCoords: ', initialCoords);
// console.log('scrollY: ', window.scrollY);
// window.addEventListener('scroll', function (e) {
//   console.log('initialCoords: ', initialCoords);
//   console.log('scrollY: ', window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/**
 * Sticky navigation: Intersection observer API
 */

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// /**
//  * When the target is intersecting viewport at 10%, callback function is called
//  */
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], // observe for when element is 10% visible and element is completely out of the viewport
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

//rootMargin - display the nav when the height between top of the page and section1 is 90px i.e the height of navbar
const headerObserver = new IntersectionObserver(stickyNav, {
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
