"use strict";

//slider
window.addEventListener('load', function () {
  console.log('Content load success!');
  var i = 0;

  function changeImage() {
    document["public"].src = 'img/image' + i + '.jpg';

    if (i < 2) {
      i++;
    } else {
      i = 0;
    }
  }

  setInterval(changeImage, 3000);
}); //Fin slider

document.querySelector(".menu-btn").addEventListener("click", function () {
  document.querySelector(".nav-menu").classList.toggle("show");
});