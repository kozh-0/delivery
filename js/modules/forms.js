import {closeModal} from './modal.js';
import {openModal} from './modal.js';
import {postData} from '../services/services.js';


function forms(formSelector, modalTimerId) {
	// 053 FORMS =================================================
	// php - бэкенд файл
	// ЗАДАЧА - взять несколько форм с сайта и из них отправлять данные к php файлу


	const forms = document.querySelectorAll(formSelector);

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




// отправляет запрос на сервер, получает ответ, трансформирует полученный объект json в js объект
//Делается запрос, потом присвоение
// при присвоение в res помещается ничего, из фетча ниче не вернулось, там только обещаение вернуть данные
// далее будет ошибка, тк данные не успеют придти от сервера
// async - говорит, что внутри ф-ии будет АСИНХРОННЫЙ КОД
// await - ПАРНЫЙ ОПЕРАТОР, всегда вместе, ставим перед теми операциями, которые нужно дождаться
// Теперь при запуске postData, начинается запрос, и await заставляет js дождаться результата запроса (неважно какой), но последующий код не блокирует


	
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



	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

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
			closeModal('.modal');
		}, 4000);
	}

}

export default forms;