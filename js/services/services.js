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

async function getResource(url) {
	const res = await fetch(url);


if (!res.ok) { //Если не ок чет, то...
	throw new Error(`Couldn't fetch ${url}, status: ${res.status}`); 
}
return await res.json(); // превращаем данные сервера в норм js объект
};


export {postData};
export {getResource};