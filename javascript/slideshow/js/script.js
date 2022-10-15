const totalSlides = document.querySelectorAll(".slider--item").length;
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
let sliderWidth = document.querySelector(".slider").clientWidth;

let currentSlide = 0;

btnPrev.addEventListener("click", () => goPrev());
btnNext.addEventListener("click", () => goNext());

document.querySelector(".slider--width").style.width = `${
	sliderWidth * totalSlides
}px`;

document.querySelector(".slider--controls").style.width = `${sliderWidth}px`;

document.querySelector(".slider--controls").style.height = `${
	document.querySelector(".slider").clientHeight
}px`;

const goPrev = () => {
	currentSlide--;
	if (currentSlide < 0) {
		currentSlide = totalSlides - 1;
	}
	updateMargin();
}

const goNext = () => {
	currentSlide++;
	if (currentSlide > totalSlides - 1) {
		currentSlide = 0;
	}
	updateMargin();
}

const updateMargin = () => {
	let sliderItemWidth = document.querySelector(".slider--item").clientWidth;
	let newMargin = currentSlide * sliderItemWidth;
	document.querySelector(
		".slider--width",
	).style.marginLeft = `-${newMargin}px`;
}

setInterval(goNext, 5000);
