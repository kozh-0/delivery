'use strict';

	// 038 Tabs ================================================

	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader__items');
	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}


	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();


	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}

	});

	// 041 Timer =====================================================

	const deadline = '2021-12-12';
	console.log(Date.parse(deadline))
	console.log(Date.parse(new Date()))
	
	function getTimeRemaining(endtime) { 
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  days = Math.floor(t / (1000 * 60 * 60 * 24)), // t в дни
			  hours = Math.floor((t / (1000 * 60 * 60) % 24)), // часы
			  minutes = Math.floor((t / (1000 * 60) % 60)), // минуты
			  seconds = Math.floor((t / 1000) % 60); // секунды
	
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	
	//Вывод на сайт
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if(t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);


	// 043 Modal ===================================================

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal');
	
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = `hidden`;
		clearInterval(modalTimerId);
	};
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = ``;
	};



	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
	});


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);



	// 048 КЛАССЫ =================================================
	// Шаблонизация карточек меню

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.toRub();
		}

		toRub() {
			this.price *= 73;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				element.classList.add('menu__item');
			} else {
				element.classList.add('product__item');
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                    	<span>${this.price}</span> руб./день
                    </div>
                </div>  
			`;
			this.parent.append(element);
		}
	}



	const getResource = async (url) => {
		const res = await fetch(url);
		console.log(res)

		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${res.status}`); 
		}

		return await res.json();
	};



// GET

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});


// Второй варик
// тут не нужен шаблон классов, нет перевода из долларов
// Если один раз чет построить надо, то норм можно юзать
	/*getResource('http://localhost:3000/menu')
		.then(data => {createCard(data)});
	function createCard(data) {
		data.forEach(({img, altimg, title, descr, price}) => {
			const element = document.createElement('div');
			element.classList.add('menu__item');
			element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                    	<span>${price}</span> руб./день
                    </div>
                </div>  
			`;
			document.querySelector('.menu .container').append(element);
		});
	}*/

	



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


	const slides = document.querySelectorAll('.offer__slide'),
		  left = document.querySelector('.offer__slider-prev'),
		  right = document.querySelector('.offer__slider-next'),
		  index = document.querySelector('span#current'),
		  indexTotal = document.querySelector('span#total');
	let counter = 0;


	function showSlide(i = 0) {
		slides.forEach(slide => slide.classList.add('hide'));
		
		slides[i].classList.toggle('hide');
		indexTotal.textContent = getZero(slides.length);
		index.textContent = getZero(i + 1);
	};
	showSlide();

	right.addEventListener('click', () => {
		counter++;

		if (counter < slides.length) {
			showSlide(counter);
		} else {
			counter = 0;
			showSlide(counter);
		}
	});

	left.addEventListener('click', () => {
		counter--;

		if (counter < 0) {
			counter = slides.length - 1;
			showSlide(counter);
		} else {
			showSlide(counter);
		}
	});






	// 053 FORMS =================================================


	const forms = document.querySelectorAll('form');

	const message = { 
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	}

	forms.forEach(item => bindPostData(item));



// POST

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 20px auto 0;
			`;
			form.append(statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries())); 

			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
				statusMessage.remove();
			})
			.finally(() => form.reset());
		});
	}


// Сообщения после отправленной формы
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');

		thanksModal.innerHTML = `
			<div class='modal__content'>
				<div data-close class="modal__close">&times;</div>
				<div class='modal__title'>${message}</div>
			</div>
		`;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}




// });
