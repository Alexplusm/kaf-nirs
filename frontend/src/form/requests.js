const {csrfSafeMethod} = require('./../utils');

const ajaxRequest = ({
  type,
  url,  
  data,
  }) => {

  const xhr = new XMLHttpRequest();
  // type = 'POST' | 'GET' | 'PUT | 
  // url '../../unit_schedule/?'

  console.log('+++ type', type);
  console.log('+++ url', url);
  console.log('+++ data', data);
  
  let finalUrl = url;

  if (data) {
    finalUrl += '?'

    for (key in data) {
      finalUrl += `${key}=${data[key]}&`;
    }

    // удаляю последний '&'
    finalUrl = finalUrl.slice(0, finalUrl.length - 1);
  }

  console.log('--- finalUrl', finalUrl);

  xhr.open(type, finalUrl, true);
  xhr.send();

  xhr.onload = function() {
    // this === xhr

    // Если код ответа сервера не 200, то это ошибка
    if (this.status != 200) {
      // обработать ошибку // пример вывода: 404: Not Found
      console.log( this.status + ': ' + this.statusText ); 
    } else {
      // вывести результат // responseText -- текст ответа.
      console.log('--- JSON ---', JSON.parse(this.responseText) ); 
    }
  }
};

const addNewEvent = (newEvent) => {
  
  $.ajax({

    beforeSend: function(xhr, settings) {
        let csrftoken = Cookies.get('csrftoken');
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    },

    type: "POST",
    url: "../../unit_schedule/",

    data: {
        "unit": unit_js,
        "start_work": timeStart,
        // "start_work": "2018-01-05 14:00",
        "end_work": timeEnd,
        // "end_work": "2018-01-05 14:30",
        "tester": selectTesterValue,
        "distance": selectDistanceValue,
        "test_object": formInputObjectValue,
        "note_text": formInputNoteText,
    },

    success: function(data){
        console.log(data);
        location.reload();
        Notify.generate('Вы записались!', 'Успех', 1)
    },

    error: function(data){
        console.log(data.responseText);
        Notify.generate(data.responseText, 'Error', 3)
    }
  });

}

module.exports = {ajaxRequest};