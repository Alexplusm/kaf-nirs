const testXHR = () => {
  const xhr = new XMLHttpRequest();

  // 2. Конфигурируем его: GET-запрос на URL '../../unit_schedule/'
  console.log('xhrxhrxhrxhr', xhr);

  let params = 'unit=' + 2;

  xhr.open('GET', '../../unit_schedule?' + params, false);
  xhr.send();

  // 4. Если код ответа сервера не 200, то это ошибка
  if (xhr.status != 200) {
    // обработать ошибку
    console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
    // вывести результат
    console.log('--- JSON ---', JSON.parse(xhr.responseText) ); // responseText -- текст ответа.
  }
};


// запрос какой-то синхроннный....


module.exports = {testXHR};