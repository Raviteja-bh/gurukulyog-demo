const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.img-slider');
const slides_text = slider.querySelectorAll('.text-img');

// Store the total number of images
const slideCount = slides.length;

let activeSlide = 0;

// To change the images dynamically every 
// 5 Secs, use SetInterval() method
setInterval(() => {
  slides[activeSlide].classList.remove('active');
  slides[activeSlide].style.display = "none";
  slides_text[activeSlide].style.display = "none";
  activeSlide++;
  if (activeSlide === slideCount) {
    activeSlide = 0;
  }
  slides[activeSlide].classList.add('active');
  slides[activeSlide].style.display = "block";
  slides_text[activeSlide].style.display = "block";

}, 3000);


/* start of step progress */
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");

one.onclick = function () {
  one.classList.add("active");
  two.classList.remove("active");
  three.classList.remove("active");
  four.classList.remove("active");
  five.classList.remove("active");
}

two.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.remove("active");
  four.classList.remove("active");
  five.classList.remove("active");
}
three.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.remove("active");
  five.classList.remove("active");
}
four.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.remove("active");
}
five.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.add("active");
}

/*end of step progress*/

/*header mobile view start*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})
/*header mobile view end*/


/*partner slider start*/
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const slideButtons2 = document.querySelectorAll(".slider-wrapper2 .slide-button2");

  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    }

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons2.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "previ-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });


  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons2[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";

    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    slideButtons2[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";

  }

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

/*partner slider end */
