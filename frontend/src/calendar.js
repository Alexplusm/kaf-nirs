const {openBlankForm, openWithEventForm} = require('./form/form');

const unit_js = document.getElementById("unitId").value;
const unit_name_js = document.getElementById("unitName").value;
const logined_user = document.getElementById("loginedUser").value;
const dataWithoutTime = "1";
let eventId = 0;

// setup params
const minTime = '09:00:00';
const maxTime = '22:30:00';
// setup params

const fullCalendar = function() {

  $('#calendar').fullCalendar({

      locale: 'ru',
      minTime: minTime,
      maxTime: maxTime,

      defaultView: 'agendaWeek',

      events: {
        type: "GET",
        url: "../../unit_schedule/",
        data: {"unit": unit_js},
        cache: false,
        success: function(data, event){
            console.log(data);                
        },
        textColor: 'black',
      },

      header: {
          left: 'prev next',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },

      eventClick:  function(event) {
        // существующий эвент - event
        openWithEventForm(event);
      },

      dayClick: function(date) {
        // прокидываем дату и время клетки, по которой кликнули
        openBlankForm(date.format());
      },
  });
}  

module.exports = {fullCalendar};