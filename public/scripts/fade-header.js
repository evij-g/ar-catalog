//script from: https://coolcssanimation.com/element-fade-out-on-scroll/

var header = document.getElementById('header');
console.log("header",header);

function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }
  var opacity = 1;
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  
  let sT="scrollTop= "+scrollTop;
 
  if (scrollTop <= elementHeight) {

    opacity = (elementHeight-distanceToTop) / elementHeight;
    console.log("test",opacity);
    element.style.opacity = opacity;
  }
  
}

function scrollHandler() {
  fadeOutOnScroll(header);
}

window.addEventListener('scroll', scrollHandler);

