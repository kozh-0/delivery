function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	// SLIDER ============================================================

	/*
	1) Получение элементов
	2) Индекс слайда, будем использовать и изменять, при клике на стрелку индекс меняется
	3) Написание ф-ии показа слайда, внутри которой скрытие дургих
	Ф-ия принимает индекс, его показыват, остальные индексы скрывает
	В условиях сделать чтоб с первого на последний можно было перейти, налево кнопка
	4) Ф-ия создана, навешиваем обрботчики на стрелки, которые меняют индекс +1 или -1
	5) Нумерация, индекс отоброжаемого слайда идет в нумерацию
	6) Если индекс меньше 10, подставляем 0
	*/


	const slides = document.querySelectorAll(slide),
		  slider = document.querySelector(container),
		  left = document.querySelector(prevArrow),
		  right = document.querySelector(nextArrow),
		  index = document.querySelector(currentCounter),
		  indexTotal = document.querySelector(totalCounter),
		  slidesWrapper = document.querySelector(wrapper),
		  slidesField = document.querySelector(field),
		  width = window.getComputedStyle(slidesWrapper).width;
	// let counter = 0; //Для моего решения
	let offset = 0
	let slideIndex = 1; //Для 2 варика
	console.log(width) // 650px



	if (slides.length < 10) {
		indexTotal.textContent = `0${slides.length}`;
		index.textContent = `0${slideIndex}`;
	} else {
		indexTotal.textContent = slides.length;
		index.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex'; 
	slidesField.style.transition = '0.5s all'; 
	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(item => item.style.width = width);

// 063 Абсолютные элементы внутри слайдера будут нормально отображаться
	slider.style.position = 'relative';
	const indicators = document.createElement('ol'),
		  dots = [];
	indicators.style.cssText = `
	    position: absolute;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    z-index: 15;
	    display: flex;
	    justify-content: center;
	    margin-right: 15%;
	    margin-left: 15%;
	    list-style: none;
	`;

	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
		    flex: 0 1 auto;
		    width: 30px;
		    height: 6px;
		    margin-right: 3px;
		    margin-left: 3px;
		    cursor: pointer;
		    background-color: #fff;
		    background-clip: padding-box;
		    border-top: 10px solid transparent;
		    border-bottom: 10px solid transparent;
		    opacity: .5;
		    transition: opacity .6s ease;
		`;
		if (i == 0) {dot.style.opacity = 1;}
		indicators.append(dot);
		dots.push(dot);
	}

// Если оффсет дошел до конца, то первый слайд
	right.addEventListener('click', () => {
		if (offset == toDigit(width) * (slides.length - 1)) { //650px
			offset = 0;
		} else {
			offset += toDigit(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;


		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		sl()
	});
	
	left.addEventListener('click', () => {		
		if (offset == 0) {
			offset = toDigit(width) * (slides.length - 1);
	 	} else {
			offset -= toDigit(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		sl()
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = toDigit(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			sl()
		});
	});
	
	function sl() {
		if (slides.length < 10) {
			index.textContent = `0${slideIndex}`;
		} else {
			index.textContent = slideIndex;
		}
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}
	function toDigit(str) {
		return +str.replace(/\D/g, '')
	}


}


export default slider;