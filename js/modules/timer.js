function timer(id, deadline) {
	// 041 Timer =====================================================

/*	const deadline = '2021-12-31';
	console.log(Date.parse(deadline)) // Преобразует строчную дату в мс с 1970г
	console.log(Date.parse(new Date())) // Текущая дата в мс с 1970г (NUMBER)
	
*/
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

	setClock(id, deadline);
}

export default timer;