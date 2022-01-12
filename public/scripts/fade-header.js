//script from: https://coolcssanimation.com/element-fade-out-on-scroll/

var header = document.getElementById('header');
console.log("header",header);

function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }
  var opacity = 1;
  //console.log("window.pageYOffset",window.pageYOffset);
  //console.log("element.getBoundingClientRect().top",element.getBoundingClientRect().top);
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  //console.log("elementHeight",elementHeight, "opacity",opacity, "distanceToTop",distanceToTop,"scrollTop", scrollTop);
  
  let sT="scrollTop= "+scrollTop;
  console.log(sT+" distanceToTop= "+distanceToTop+" scrollTop-distanceToTop= "+(scrollTop - distanceToTop));
  
  if (scrollTop <= elementHeight) {
   // opacity = 1 - (elementHeight-distanceToTop) / elementHeight;
    opacity = (elementHeight-distanceToTop) / elementHeight;
    console.log("test",opacity);
    element.style.opacity = opacity;
  }
  
  // if (opacity <= 0) {
  //   console.log("<=0");
  //   element.style.opacity = opacity;
  // }
}

function scrollHandler() {
  fadeOutOnScroll(header);
}

window.addEventListener('scroll', scrollHandler);

