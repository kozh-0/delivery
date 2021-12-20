'use strict';


// document.addEventListener('DOMContentLoaded', () => {

	// 038 Tabs ================================================

	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader__items');// для делигирования

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
	console.log(Date.parse(deadline)) // Преобразует строчную дату в мс с 1970г
	console.log(Date.parse(new Date())) // Текущая дата в мс с 1970г (NUMBER)
	

	//Ф-ия рассчета времени, Разница между дедлайном и текущим временм
	function getTimeRemaining(endtime) { 
		// Разница в мс, floor округляет до ближайшего меньшего целого.
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

		updateClock();// чтоб сразу норм время на сайте было, а не с верстки

		function updateClock() {
			const t = getTimeRemaining(endtime); // t = объект, где return

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

	// через время открывает модалку, но если пользователь 
	// открыл раньше чистится интервал в openModal
	const modalTimerId = setTimeout(openModal, 50000);


	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// pageYOffset - то что прокручено сверху + видимая часть экрана => общая высота документа
	window.addEventListener('scroll', showModalByScroll);// со скролом {once: true} сработает при малейшеей прокрутке



	// 048 КЛАССЫ =================================================
	
	// Шаблонизация карточек меню
	// СУТЬ - написать класс, который будет выводить на сайт верстку, в теги которой, будут записываться свойства новых созданных объектов

	// 49 хотим добавлять новые классы, хз сколько поэтому ...rest
	// И чтоб верстка была сама, без нахождения в создаваемом div
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) { //хуй пропишеш дефолт у rest
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes; // Массив, classes || 'menu__item', строку нельзя перебирать forEach
			this.parent = document.querySelector(parentSelector);
			this.toRub();
		}

		toRub() {
			this.price *= 73;
		}


		// Тут удаляем <div class="menu__item"></div>
		//Пустой массив, если не указаны переменные, то он все равно вставится, по boolean [] = true
		// Если в rest ниче не передали присвоим класс
		render() {
			const element = document.createElement('div'); //В классе переменные создаем без this, но далее обращаемся с this
			// console.log(this); // Объект MenuCard
			// Короче законтрили что запись идет в пустой див, в условии стили добавляем к нему
			if (this.classes.length === 0) { //Задали дефолтное значение classes
				element.classList.add('menu__item');
			} else { // Если классес не пустой, то добавляем его аргументы в елемент, как css стили
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

// тк это GET запрос, то не прописываем
// фикс НЕ ошибки http ошибок, ручная обработка
// 2 свойства Promise
// .ok получили не, ок не ок
// .status статус, который вернул сервер (200, 404 и тд)
// блок кода который будет выбрасывать ошибки в консоль
// Ошибка в ручном режиме - блок кода catch
	const getResource = async (url) => {
		const res = await fetch(url);


	if (!res.ok) { //Если не ок чет, то...
		throw new Error(`Couldn't fetch ${url}, status: ${res.status}`); 
	}
	return await res.json(); // превращаем данные сервера в норм js объект
	};


/*	getResource('http://localhost:3000/menu')// приходит js объект (см Ф-ию)
		.then(data => { //деструктуризация объекта
			data.forEach(({img, altimg, title, descr, price}) => { //Каждая отдельная карточка из db.json
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});*/





	// CDN ============================================================
	// axios - ресурс для работы с сервером, получение, пост элементов и др
// много доп возможностей, например мы вручную прописывали выбрасывание ошибки для fetch, тут встроено, также конвертация в JSON. Короче не нужно описывать некоторые ручные функции

// идет из другого js файла
axios.get('http://localhost:3000/menu')
	.then(data => {
		data.data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
		});
	})



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



	/*new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		2,
		'.menu .container',
		'menu__item' // Передается в классес, но мы порешали условиме в рендер, так что нет смысла
	).render()

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню "Премиум"',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		5,
		'.menu .container',
		// 'menu__item',
		// 'big'
	).render()

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		4,
		'.menu .container',
		'menu__item'
	).render()*/


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
		  slider = document.querySelector('.offer__slider'),
		  left = document.querySelector('.offer__slider-prev'),
		  right = document.querySelector('.offer__slider-next'),
		  index = document.querySelector('span#current'),
		  indexTotal = document.querySelector('span#total'),
		  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		  slidesField = document.querySelector('.offer__slider-inner'),
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




// Первый варик, МОЙ лучший =========

	/*function showSlide(i = 0) {
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
	});*/

		

		// Второй вариант чела --------------------

	/*showSlides(slideIndex);

	if (slides.length < 10) {
		indexTotal.textContent = `0${slides.length}`;
	} else {
		indexTotal.textContent = slides.length;
	}

	function showSlides(n) {
		if (n > slides.length) {slideIndex = 1;}
		if (n < 1) {slideIndex = slides.length;}

		slides.forEach(item => item.style.display = 'none');
		slides[slideIndex - 1].style.display = 'block';

		if (slides.length < 10) {
			index.textContent = `0${slideIndex}`;
		} else {
			index.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	} //Если придет отрицательное число - вычитание

	left.addEventListener('click', () => plusSlides(-1));
	right.addEventListener('click', () => plusSlides(1));
*/




	


	// 053 FORMS =================================================
	// php - бэкенд файл
	// ЗАДАЧА - взять несколько форм с сайта и из них отправлять данные к php файлу


	const forms = document.querySelectorAll('form');

	// Список фраз, для различных ситуаций
	const message = { 
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	}
	// Куда помещать сообщение - частый прием создание нового динамического блока, и вывод в него сообщения, картинки и тп


	// Сброс кеша shift + f5, чтоб на сервере обновлялся код
	forms.forEach(item => {
		bindPostData(item);
	});

// 1 - отправим formData
// 2 - отправим JSON файл на наш сервер
// ФОРМАТЫ ДАННЫХ ЗАВИСЯТ ОТ СЕРВЕРА
// Показывает спиннер, собирает данные из формы, и при помощи fetch уже отправляем данные



// formData Promise
// В php файле только echo var_dump($_POST);

	/*function postData(form) {
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

			fetch('server.php', { // Куда
				method: 'POST', // Каким образом
				body: formData // что именно
			})
			.then(data => data.text()) //Data - ответ пользователя, мы превратили в текст
			.then(data => { // Если нет data.text(), то data - объект с описанием запроса
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			})
		});
	}*/



// отправляет запрос на сервер, получает ответ, трансформирует полученный объект json в js объект
//Делается запрос, потом присвоение
// при присвоение в res помещается ничего, из фетча ниче не вернулось, там только обещаение вернуть данные
// далее будет ошибка, тк данные не успеют придти от сервера
// async - говорит, что внутри ф-ии будет АСИНХРОННЫЙ КОД
// await - ПАРНЫЙ ОПЕРАТОР, всегда вместе, ставим перед теми операциями, которые нужно дождаться
// Теперь при запуске postData, начинается запрос, и await заставляет js дождаться результата запроса (неважно какой), но последующий код не блокирует


	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data // Отправленная форма в JSON формате
		});

		return await res.json(); // - возвращается Promise в js объект, но если ответ не успеет придти, то ошибка, для этого asyn await
	};
// Далее эту функцию вызываем вместо фетча в bindPostData()
// ЭТО АСИНХРОННЫЙ КОД, поэтому хз когда сервер ответит
// АСИНХРОННЫЙ КОД НЕ ЖДЕТ ДРУГОЙ КОД
// res = 4+4 (сначала вычисление, справа налево, потом присвоение)

/*const obj = {a: 23, b: 50};
console.log(Array.isArray (Object.entries(obj))); //true */

// JSON Promise
// В php файле json_decode + echo var_dump($_POST);

// привязка постинга
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
			// formData - непростой объект, сначала его надо превратить в массив массивов и обратно в объект, тогда можно с ним работать, а после этот объект превращаем в json
// меняем php файл на json, создан при помощи сервера
			postData('http://localhost:3000/requests', json)
			// .then(data => data.text()) //Data - ответ пользователя, мы превратили в текст, не нужно так как она в postData спрятана
			.then(data => { // Если нет data.text(), то data - объект с описанием запроса
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
				statusMessage.remove();
			})
			.finally(() => {
				form.reset();
			});
		});
	}







	// new XMLHttpRequest() + FormData=======================================

	// Функция постит данные
	// 'submit' - срабатывает когда пытаемся отправить форму
	// если кнопка через тег button, то у нее автоматом стоит тип submit
	/*function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault(); // чтоб не перезагружалась страница

		// Вывод сообщения о загрузке, как только отправил форму
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 20px auto 0;
			`
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			// request.setRequestHeader('Content-type', 'multipart/form-data');
			// Как получить данные от пользователя в JS
			// Формирует все инпуты пользователя в объект, который отображается в network php файл
			const formData = new FormData(form);
			// Для интерактивных тегов (input, option, textarea) всегда используем name='name', иначе new FormData(form) не сможет найти этот input, и не сможет взять value, чтобы сформировать объект
			request.send(formData);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset(); // альтернатива - перебрать value формы и очистить их
					statusMessage.remove();
				} else {
					showThanksModal(message.failure);
				}

			});
			// Когда мы используем связку new XMLHttpRequest() + объект + new FormData(form), заголовок указывать не нужно, устанавливается автоматически, поэтому мы на сервер не получили данные

		});
	}*/



	// new XMLHttpRequest() + JSON =======================================

	/*function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json');
			// new FormData - нельзя просто превратить в json
			const formData = new FormData(form);
			console.log(formData)
			//Перебираем new FormData и записываем его данные в пустой объект
			const object = {};
			formData.forEach(function(item, i) {
				object[i] = item;
			});
			// php нативно не умеет работать с json, через node js надо
			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {statusMessage.remove();}, 4000);
				} else {
					statusMessage.textContent = message.failure;
				}

			});

		});
	}*/


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
		//Новый крест не реагирует на закрытие, поменяли делигирование 043 Modal
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}


// В объекте настройка
/*	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({name: 'Alex'}),
		headers: {
			'Content-type': 'application/json'
		}
	})
  		.then(response => response.json())
  		.then(json => console.log(json));
*/






	// NPM ============================================================

//data - ответ от сервера, data.json() - превращение json в js объект

	/*fetch('http://localhost:3000/menu')
		.then(data => data.json()) 
		.then(data => console.log(data))*/








	// 065 CALCULATOR =================================================

// Ваш пол и активность имеют общую структуру, поэтому для них будт одна и та же функция, а при использовании мы будем вытягивать из них нужную информацию
// В HTML установили id для муж и жен, + добавили дата атрибуты для кадой активности

	const result = document.querySelector('.calculating__result span');
	
	let sex, height, weight, age, ratio;


	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = +localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}

		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');




	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			return result.textContent = "(ツ)";
			 // Чтобы досрочно прервать ф-ию, ф-ия не работает после return
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	calcTotal();
	

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));		
				}

				elements.forEach(elem => elem.classList.remove(activeClass));
				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);
		
		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '2px solid red';
			} else {
				input.style.border = 'none';
			}

			switch(input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}

			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');





// });
