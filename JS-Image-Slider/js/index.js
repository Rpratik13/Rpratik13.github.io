var slideIndex = 0;

var carouselContainer = document.getElementsByClassName('carousel-container')[0];
carouselContainer.style.height = '500px';
carouselContainer.style.width = '700px';
carouselContainer.style.margin = '0px auto';
carouselContainer.style.border = '1px solid black';
carouselContainer.style.overflow = 'hidden';

var images = document.querySelectorAll('img');
var slideContainer = document.createElement('div');
slideContainer.style.height = '100%';
slideContainer.style.width = '100%';
slideContainer.style.position = 'relative';
carouselContainer.appendChild(slideContainer);

var leftButton = document.createElement('div')
leftButton.style.width = '18px';
leftButton.style.paddingLeft = '6px';
leftButton.style.paddingTop = '239px';
leftButton.style.height = 'calc(100% - ' + leftButton.style.paddingTop + ')';
leftButton.style.position = 'absolute';

leftButton.style.zIndex = 10;
leftButton.onmouseover = function () {
  leftButton.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
  leftButton.style.cursor = 'pointer';
};
leftButton.onmouseleave = function () {
  leftButton.style.backgroundColor = 'transparent';

};
leftButton.setAttribute('onclick', 'slideLeft([true])');
slideContainer.appendChild(leftButton);
var leftButtonImage = document.createElement('img');
leftButtonImage.setAttribute('src', 'images/arrow_left.png');
leftButton.appendChild(leftButtonImage)

var rightButton = document.createElement('div')
rightButton.style.width = '18px';
rightButton.style.paddingLeft = '6px';
rightButton.style.paddingTop = '239px';
rightButton.style.height = 'calc(100% - ' + leftButton.style.paddingTop + ')';
rightButton.style.position = 'absolute';
rightButton.style.right = '0px';
rightButton.style.zIndex = 10;
rightButton.onmouseover = function () {
  rightButton.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
  rightButton.style.cursor = 'pointer';
};
rightButton.onmouseleave = function () {
  rightButton.style.backgroundColor = 'transparent';
};
rightButton.setAttribute('onclick', 'slideRight([true])');
slideContainer.appendChild(rightButton);
var rightButtonImage = document.createElement('img');
rightButtonImage.setAttribute('src', 'images/arrow_right.png');
rightButton.appendChild(rightButtonImage)


var indicatorDotsContainer = document.createElement('div')
indicatorDotsContainer.style.height = '20px';
indicatorDotsContainer.style.position = 'absolute';
indicatorDotsContainer.style.bottom = '0px';
indicatorDotsContainer.style.zIndex = 10;
indicatorDotsContainer.style.width = 17 * images.length + 'px';
indicatorDotsContainer.style.left = 'calc(50% - ' + ((parseInt(indicatorDotsContainer.style.width) / 2) - 5) + 'px)';


document.body.onkeydown = function (e) {
  if (e.keyCode == 37) {
    slideLeft([true]);
  } else if (e.keyCode == 39) {
    slideRight([true]);
  }

}


slideContainer.appendChild(indicatorDotsContainer);

var indicatorDots = [];

function indicatorDotColor(val) {
  for (var i = 0; i < images.length; i++) {
    if (i === val) {
      indicatorDots[i].style.background = '#fff';
    } else {
      indicatorDots[i].style.background = 'transparent';
    }
  }
}


for (var i = 0; i < images.length; i++) {
  var imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'img-container');
  imgContainer.style.height = '100%';
  imgContainer.style.width = '100%';
  imgContainer.style.position = 'absolute';
  imgContainer.style.left = (100 * i) + '%';
  images[i].parentNode.insertBefore(imgContainer, images[i]);
  images[i].style.width = '100%';
  images[i].style.height = '100%';
  imgContainer.appendChild(images[i]);
  slideContainer.appendChild(imgContainer);

  var indicatorDot = document.createElement('div');
  indicatorDot.style.width = '10px';
  indicatorDot.style.height = '10px';
  indicatorDot.style.borderRadius = '50%';
  indicatorDot.style.border = '1px solid #fff';
  indicatorDot.style.marginRight = '5px';
  indicatorDot.style.display = 'inline-block';
  indicatorDot.style.cursor = 'pointer';
  indicatorDot.setAttribute('onclick', 'setSlideIndex(' + i + ')')
  indicatorDotsContainer.appendChild(indicatorDot);
  indicatorDots.push(indicatorDot)
}

indicatorDots[slideIndex].style.backgroundColor = '#fff';


var imgs = document.getElementsByClassName('img-container');



var imgIndex = 0;
var isPaused = false;

function stopInterval(val) {
  clearInterval(val);
}

function resetPosition(val) {
  for (var i = 1; i < images.length; i++) {
    imgs[(i + val) % images.length].style.left = 100 * i + '%';
  }
}

var semaphore = true;

function slideRight(buttonClick) {
  if (semaphore) {
    semaphore = false;
    if (buttonClick[0]) {
      slideIndex = (slideIndex + 1) % (images.length);
      indicatorDotColor(slideIndex);
    }
    var leftInterval = setInterval(function () {
      for (var i = 0; i < images.length; i++) {
        imgs[i].style.left = parseFloat(imgs[i].style.left) - 1 + '%';
      }
      for (var i = 0; i < images.length; i++) {
        if (parseInt(imgs[i].style.left) === -100) {
          imgs[i].style.left = 100 * (images.length - 1) + '%';
          if (!buttonClick[0]) {
            resetPosition(buttonClick[1]);
          }
          semaphore = true;
          stopInterval(leftInterval);
        }
      }
    }, 10);
  }
}


function slideLeft(buttonClick) {
  if (semaphore) {
    semaphore = false;
    if (buttonClick[0]) {
      slideIndex -= 1;
      if (slideIndex < 0) {
        slideIndex = (images.length - 1);
      }
      indicatorDotColor(slideIndex);
    }
    var start = parseInt(imgs[0].style.left)

    var rightInterval = setInterval(function () {
      for (var i = 0; i < images.length; i++) {
        if (parseInt(imgs[i].style.left) === 100 * (images.length - 1)) {
          imgs[i].style.left = -100 + '%';
        }
        imgs[i].style.left = parseFloat(imgs[i].style.left) + 1 + '%';

      }
      for (var i = 0; i < images.length; i++) {
        if (parseInt(imgs[i].style.left) === 100 * (images.length - 1)) {
          if (!buttonClick[0]) {
            resetPosition(buttonClick[1]);
          }
          semaphore = true;
          stopInterval(rightInterval);
        }
      }

    }, 10);
  }
}


function setSlideIndex(val) {
  if (semaphore) {
    indicatorDotColor(val);
    if (val > slideIndex) {
      imgs[slideIndex + 1].style.left = 200 + '%';
      imgs[val].style.left = 100 + '%';
      slideRight([false, val]);
      slideIndex = val;
    } else if (val < slideIndex) {
      for (var i = 0; i < images.length; i++) {
        if (parseInt(imgs[i].style.left) === 100 * (imgs.length - 1)) {
          imgs[i].style.left = 100 * (imgs.length - 2) + '%'
        }
      }
      imgs[val].style.left = 100 * (imgs.length - 1) + '%';
      slideLeft([false, val]);
      slideIndex = val;

    }
  }
}