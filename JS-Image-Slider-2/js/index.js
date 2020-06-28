/*
 * It creates a image carousel out of div elements with carousel-container class.
 *
 * @param {string} elemId Holds the ID that will be given to the carousel.
 * @param {number} transitionTime Holds the time it would take to change one image to another in 
 *                                milliseconds.
 * @param {number} holdTime Holds the time between two image transitions in milliseconds. 
 */
function Carousel(elemId, transitionTime, holdTime) {
  // Declare variables
  var carouselContainers = document.getElementsByClassName('carousel-container');
  var functionUnlock = true; // Ensures only one transition occurs at a time
  var holdTime = holdTime;
  var idName = elemId;
  var imagesArray = []; // Holds img elements entered by the user
  var indicatorDots = []; // Holds the indicator dot div elements
  var previousIndex; // Index of image that should transition out of the slide container
  var transition = (1000 / transitionTime); // Percentage the image needs to move every 10 milliseconds.
  var transitionPercent;
  var slideIndex = 0; // Index of which image to show
  var slideInterval;

  if (holdTime == undefined) { holdTime = 2000; }
  if (transitionTime == undefined) { transition = 0.5; }

  // Give ID to carousel containers
  for (var i = 0; i < carouselContainers.length; i++) {
    if (carouselContainers[i].id == '') {
      if (idName == undefined) { idName = 'carousel' + (i + 1); }
      carouselContainers[i].id = idName;
      break;
    }
  }

  // Create slide container 
  var carouselContainer = document.getElementById(idName);
  var images = document.querySelectorAll('#' + idName + ' img');
  var slideContainer = document.createElement('div');
  slideContainer.setAttribute('class', 'slide-container');
  carouselContainer.appendChild(slideContainer);

  // Create container for indicator dots
  var indicatorDotsContainer = document.createElement('div');
  indicatorDotsContainer.style.width = (17 * images.length) + 'px';
  indicatorDotsContainer.style.left = 'calc(50% - ' + ((parseInt(indicatorDotsContainer.style.width) / 2) - 5) + 'px)';
  indicatorDotsContainer.setAttribute('class', 'indicator-dots-container');
  slideContainer.appendChild(indicatorDotsContainer);

  for (var i = 0; i < images.length; i++) {
    // Put image elements in image container div elements
    var imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'img-container');
    images[i].setAttribute('class', 'image');
    images[i].parentNode.insertBefore(imgContainer, images[i]);
    imgContainer.appendChild(images[i]);
    imagesArray.push(imgContainer);
    carouselContainer.removeChild(imgContainer);

    // Create indicator dots
    var indicatorDot = document.createElement('div');
    indicatorDot.setAttribute('class', 'indicator-dot');
    indicatorDot.onclick = (function (index) {
      return function () {
        setSlideIndex(index);
      }
    })(i);
    indicatorDotsContainer.appendChild(indicatorDot);
    indicatorDots.push(indicatorDot);
  }

  // Set values for first image
  indicatorDots[0].style.backgroundColor = '#fff';
  imagesArray[0].style.left = '0%';
  slideContainer.appendChild(imagesArray[0]);

  /* 
   * It creates button for transition.
   *
   * @param {string} direction Holds the direction of transition for the button.
   */
  var createButton = function createButton(direction) {
    var button = document.createElement('div');
    button.setAttribute('class', direction + '-btn');
    button.onclick = function () { slideSetUp(direction); }
    slideContainer.appendChild(button);
    buttonImageContainer = document.createElement('div');
    buttonImageContainer.setAttribute('class', direction + '-image-container');
    button.appendChild(buttonImageContainer)
    buttonImage = document.createElement('img');
    buttonImage.setAttribute('src', 'images/arrow_' + direction + '.png');
    buttonImageContainer.appendChild(buttonImage);
  }

  createButton('left');
  createButton('right');

  /*
   * It starts the automatic transition of images in the right direction.
   */
  var initSlider = function () {
    slideInterval = setTimeout(function () {
      slideSetUp('right');
    }, holdTime);
  }

  /*
   * It sets up required variables for transition.
   *
   * @param {string} direction Gives the direction of the transition.
   * @param {number} newIndex Holds the value of the next image index when an indicator dot is clicked. 
   */
  var slideSetUp = function (direction, newIndex) {
    if (functionUnlock && imagesArray.length > 1) {
      functionUnlock = false;
      previousIndex = slideIndex;
      if (newIndex == undefined) {
        if (direction == 'left') {
          slideIndex = (slideIndex - 1);
          if (slideIndex < 0) { slideIndex = (images.length - 1); }
        } else { slideIndex = (slideIndex + 1) % (images.length); }
      } else { slideIndex = newIndex; }

      if (direction == 'left') {
        imagesArray[slideIndex].style.left = '-100%';
        transitionPercent = transition;
      } else {
        imagesArray[slideIndex].style.left = '100%';
        transitionPercent = -transition;
      }

      indicatorDots[slideIndex].style.background = '#fff';
      indicatorDots[previousIndex].style.background = 'transparent';

      slideImage();
    }
  }

  /* 
   * It creates the animation from the current image to the next image.
   */
  var slideImage = function () {
    var percentMoved = 0;
    slideContainer.appendChild(imagesArray[slideIndex]);

    var interval = setInterval(function () {
      clearTimeout(slideInterval);
      imagesArray[slideIndex].style.left = parseFloat(imagesArray[slideIndex].style.left) + transitionPercent + '%';
      imagesArray[previousIndex].style.left = parseFloat(imagesArray[previousIndex].style.left) + transitionPercent + '%';
      percentMoved += transition;

      if ((percentMoved + transition) > 100) {
        imagesArray[slideIndex].style.left = '0%';
        slideContainer.removeChild(imagesArray[previousIndex]);
        percentMoved = 0;
        functionUnlock = true;
        clearInterval(interval);
        initSlider();
      }
    }, 10);
  }

  /*
   * It sets up which direction to go and when image to show based on which indicator dot is clicked. 
   */
  var setSlideIndex = function (newIndex) {
    if (newIndex > slideIndex) {
      direction = 'right';
    } else if (newIndex < slideIndex) {
      direction = 'left';
    }

    slideSetUp(direction, newIndex);
  }

  initSlider();
}

var meta = document.createElement('meta');
meta.setAttribute('name', 'viewport');
meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
document.head.appendChild(meta);

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'css/style.css');
document.head.appendChild(link);