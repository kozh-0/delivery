import {getResource} from '../services/services.js';

function cards() {
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



	getResource('http://localhost:3000/menu')// приходит js объект (см Ф-ию)
		.then(data => { //деструктуризация объекта
			data.forEach(({img, altimg, title, descr, price}) => { //Каждая отдельная карточка из db.json
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});


}

export default cards;