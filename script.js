const stageWrapper = document.querySelector('.stage-wrapper');
const stageCards = document.querySelector('.stage-cards');
const stages = Array.from(document.querySelectorAll('.card')).slice(0, 5);
const stageLeft = document.querySelector('#stage-left');
const stageRight = document.querySelector('#stage-right');
const stageDots = document.querySelector('.stage-dots');
let currentSlide = document.getElementById('current-slide');
const totalSlides = document.getElementById('total-slides');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const firstCard = document.querySelector('#first-card');
let memberCard = document.querySelectorAll('.member-card');
const membersCards = document.querySelector('.members-cards');

let stageSlide = 0;
let memberCurrent = 0;
const memberWidth = firstCard.offsetWidth;

const checkArr = () => {
	if (stageSlide === 0) {
		stageLeft.style.backgroundColor = '#d6d6d6';
		stageLeft.disabled = true;
	} else {
		stageLeft.style.backgroundColor = '';
		stageLeft.disabled = false;
	}
	if (stageSlide === 4) {
		stageRight.style.backgroundColor = '#d6d6d6';
		stageRight.disabled = true;
	} else {
		stageRight.style.backgroundColor = '';
		stageRight.disabled = false;
	}
};
const changeSlide = (i) => {
	stageSlide = i;
	updateSlide();
	checkArr();
}

stages.forEach((_, i) => {
	checkArr();
	const dot = document.createElement('button');
	dot.classList.add('dot');
	if (i === 0) dot.classList.add('active');
	dot.addEventListener('click', () => changeSlide(i));
	stageDots.appendChild(dot);
});

const updateDots = () => {
	stageDots.querySelectorAll('.dot').forEach((dot, i) => {
		dot.classList.toggle('active', i === stageSlide);
	});
};
const updateSlide = () => {
	const pos = 20;
	const slideWidth = stageWrapper.offsetWidth + pos;
	stageCards.style.transform = `translateX(-${stageSlide * slideWidth}px)`;
	updateDots();
};

const checkWidth = () => {
	if (document.documentElement.clientWidth >= 768) {
		memberCard = document.querySelectorAll('.member-card').length -= 2;
		totalSlides.textContent = memberCard + 2;
	} else {
		memberCard = document.querySelectorAll('.member-card').length;
		totalSlides.textContent = memberCard;
	}
};

const showSlide = (i) => {
	const checkValue = -(i - 1) * memberWidth + 'px';
	membersCards.style.transform = 'translateX(' + checkValue + ')';
	if (document.documentElement.clientWidth >= 768) {
		currentSlide.textContent = i + 2;
	} else {
		currentSlide.textContent = i;
	}
}
const prevSlide = () => {
	memberCurrent = (memberCurrent - 1 + memberCard) % memberCard || memberCard;
	showSlide(memberCurrent);
}

const nextSlide = () => {
	memberCurrent = memberCurrent % memberCard + 1;
	showSlide(memberCurrent);
}
stageRight.addEventListener('click', () => {
	stageSlide = Math.min(stageSlide + 1, stages.length - 1);
	updateSlide();
	checkArr();
});

stageLeft.addEventListener('click', () => {
	stageSlide = Math.max(stageSlide - 1, 0);
	updateSlide();
	checkArr();
});

left.addEventListener('click', prevSlide)
right.addEventListener('click', nextSlide)

setInterval(nextSlide, 4000);
checkWidth();
updateSlide();