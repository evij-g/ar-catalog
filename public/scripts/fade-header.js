//script from: https://coolcssanimation.com/element-fade-out-on-scroll/

var header = document.getElementById('header');
var opacity = 1;
function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }
 
  
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  
 
  if (scrollTop <= elementHeight) {

    opacity = (elementHeight-scrollTop) / elementHeight;
    
    
  }

  if(opacity <= 0.04){
    opacity = 0;
    
  }
  element.style.opacity = opacity;
  
}

function scrollHandler() {
  fadeOutOnScroll(header);
}

window.addEventListener('scroll', scrollHandler);

