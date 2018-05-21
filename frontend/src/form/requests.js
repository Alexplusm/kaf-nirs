const {
  beforeAjaxSend,
  unit_js, returnDistanceID,
  getStartDateFromTitle, getEventIDToUpdate,
} = require('./../utils');

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

const addNewEventReq = (newEvent) => {
  $.ajax({
    beforeSend: beforeAjaxSend,
    
    type: "POST",
    url: "../../unit_schedule/",

    data: preparationDataToSend(newEvent),

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

const updateEventReq = (eventToUpdate) => {

  $.ajax({
    beforeSend: beforeAjaxSend,
    type: "PUT",
    url: "../../unit_schedule/" + getEventIDToUpdate() + "/",

    data: preparationDataToSend(eventToUpdate),

    success: function(){
      console.log("update success");
      location.reload();
    },

    error: function(){
      console.log("update error");
      location.reload();
    }
  });
}

const deleteEventReq = () => {
  $.ajax({
    beforeSend: beforeAjaxSend,
    type: "DELETE",

    url: "../../unit_schedule/" + getEventIDToUpdate() + "/",
    success: function(){
      // $("#confirmDelete").modal('hide');
      console.log("успешный Delete");
      location.reload();
    },

    error: function(){
      // $("#confirmDelete").modal('hide');
      console.log("delete error");
      location.reload();
    }
  });
}


const preparationDataToSend = (event) => {
  return {
    "unit": unit_js,
    // "start_work": "2018-01-05 14:00"
    "start_work": getStartDateFromTitle() + ' ' + event['timeStartField'],
    // нужен конец испытания конец
    "end_work": getStartDateFromTitle() + ' ' + event['timeEndField'],
    "tester": event['testerField'],
    "distance": returnDistanceID(event['distanceField']),
    "test_object": event['subjectField'],
    "note_text": event['noteTextArea'],
  };

  //   data: {
  //     "unit": unit_js,
  //     // "start_work": "2018-01-05 14:00"
  //     "start_work": startT,
  //     "end_work": endT,
  //     "tester": newEvent['testerField'],
  //     "distance": distance,
  //     "test_object": newEvent['distanceField'],
  //     "note_text": newEvent['noteTextArea'],
  // },
}

module.exports = {
  ajaxRequest,
  addNewEventReq, updateEventReq, deleteEventReq
};