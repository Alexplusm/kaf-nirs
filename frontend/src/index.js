const {fullCalendar} = require('./calendar');

var unit_js = document.getElementById("unitId").value;
var unit_name_js = document.getElementById("unitName").value;
var logined_user = document.getElementById("loginedUser").value;
var dataWithoutTime = "1";
var eventId = 0;

// запуск календаря
$(document).ready(fullCalendar());
// запуск календаря


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }


function addEvent(dataWithoutTime) {
    $.ajax({

        beforeSend: function(xhr, settings) {
            var csrftoken = Cookies.get('csrftoken');
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
        
        cache: false,

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

function deleteEvent(event) {
    $.ajax({

            beforeSend: function(xhr, settings) {
                var csrftoken = Cookies.get('csrftoken');
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },

            type: "DELETE",

            url: "../../unit_schedule/" + eventId + "/",

            success: function(){
                $("#confirmDelete").modal('hide');
                console.log("успешный Delete");
                location.reload();
            },

            error: function(){
                $("#confirmDelete").modal('hide');
                console.log("delete error");
                location.reload();
            }
       });
}

function updateEvent(dataWithoutTime) {
    retrieveAllFormsUpdate();
    $.ajax({

            beforeSend: function(xhr, settings) {
                var csrftoken = Cookies.get('csrftoken');
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },

            type: "PUT",

            url: "../../unit_schedule/" + eventId + "/",

            data: {   
                "unit": unit_js,
                "start_work": timeStart,
                "end_work": timeEnd,
                "tester": selectTesterValue,
                "distance": selectDistanceValue,
                "test_object": formInputObjectValue,
                "note_text": formInputNoteText,
            },

            success: function(){
                console.log("update success");
                $("#updateEventModal").modal('hide');
                location.reload();

            },

            error: function(){
                console.log("update error");
                $("#updateEventModal").modal('hide');
                location.reload();
            }
       });
}


function confirmDelete() {
    $("#eventInfo").modal('hide');
    $("#confirmDelete").modal('show');
}

function openUpdateWindow() {
    $("#eventInfo").modal('hide');
    $("#updateEventModal").modal('show');
}

// for create modal window
   

function retrieveFormTimeStart() {
  form = document.getElementById("formInputTimeStart");
  timeStart = String(dataWithoutTime + " " + String(form.value).slice(0,-1));
}   

// добавить выбор дня окнчания испытания
function retrieveFormTimeEnd() {
  form = document.getElementById("formInputTimeEnd");
  timeEnd = String(dataWithoutTime + " " + String(form.value).slice(0,-1));
}

function retrieveAllForms() {
    retrieveSelectOfTester();
    retrieveSelectOfDistance();
    retrieveFormObject();
    retrieveFormNote();
    retrieveFormTimeStart();
    retrieveFormTimeEnd();
}

// for update modal window
function retrieveSelectOfTesterUpdate() {
    select = document.getElementById("selectTesterUpdate"); // Выбираем  select по id
    selectTesterValue = select.options[select.selectedIndex].value; // Значение value для выбранного option
    }

function retrieveSelectOfDistanceUpdate() {
    select = document.getElementById("selectDistanceUpdate"); // Выбираем  select по id
    selectDistanceValue = select.options[select.selectedIndex].value; // Значение value для выбранного option
    }

function retrieveFormObjectUpdate() {
  form = document.getElementById("formInputObjectUpdate");
  formInputObjectValue = form.value;
}    

// добавить обработку undefind
function retrieveFormNoteUpdate() {
  form = document.getElementById("formNoteTextUpdate");
  formInputNoteText = form.value;
}    

function retrieveFormTimeStartUpdate() {
  form = document.getElementById("formInputTimeStartUpdate");
  timeStart = String(dataWithoutTime + " " + String(form.value).slice(0,-1));
}   

// добавить выбор дня окнчания испытания
function retrieveFormTimeEndUpdate() {
  form = document.getElementById("formInputTimeEndUpdate");
  timeEnd = String(dataWithoutTime + " " + String(form.value).slice(0,-1));
}

function retrieveAllFormsUpdate() {
    retrieveSelectOfTesterUpdate();
    retrieveSelectOfDistanceUpdate();
    retrieveFormObjectUpdate();
    retrieveFormNoteUpdate();
    retrieveFormTimeStartUpdate();
    retrieveFormTimeEndUpdate();
}

///////////////////////////////////////////////////////

function eventList(){
    $.ajax({

        type: "GET",

        url: "../../unit_schedule/",

        data: {"unit": unit_js},
            
        cache: false,

        success: function(data){
                console.log(data);                  
            },
        color: 'yellow',
        textColor: 'black'
    },)
}


(function($) {
        $(function() {
            $('input.timepicker').timepicker({
                zindex: 99999,
                timeFormat: 'H:mm ',
                interval: 30,
                minTime: '8',
                maxTime: '9:00pm',
                defaultTime: '12',
                startTime: '08:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true

            });
        });
    })(jQuery);


$(function(){
    $('#model-submit').click(function(e){
        e.preventDefault();
        retrieveAllForms();
        console.log(timeStart)
        addEvent();
        $('#exampleModal').modal('hide')
    });
});

Notify = {              
    TYPE_INFO: 0,               
    TYPE_SUCCESS: 1,                
    TYPE_WARNING: 2,                
    TYPE_DANGER: 3,                             

    generate: function (aText, aOptHeader, aOptType_int) {                  
        var lTypeIndexes = [this.TYPE_INFO, this.TYPE_SUCCESS, this.TYPE_WARNING, this.TYPE_DANGER];                    
        var ltypes = ['alert-info', 'alert-success', 'alert-warning', 'alert-danger'];                                      
        var ltype = ltypes[this.TYPE_INFO];                 

        if (aOptType_int !== undefined && lTypeIndexes.indexOf(aOptType_int) !== -1) {                      
            ltype = ltypes[aOptType_int];                   
        }                                       

        var lText = '';                 
        if (aOptHeader) {                       
            lText += "<h4>"+aOptHeader+"</h4>";                 
        }                   
        lText += "<p>"+aText+"</p>";                                        
        var lNotify_e = $("<div class='alert "+ltype+"'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button>"+lText+"</div>");                    

        setTimeout(function () {                        
            lNotify_e.alert('close');                   
        }, 3000);                   
        lNotify_e.appendTo($("#notifies"));             
    }           
};  

function check_user(user_full_name) {

    let ownerOrNot = document.getElementById('ownerOrNot');
    if (user_full_name == logined_user) {
        ownerOrNot.style.cssText = "display: none";
        $('#updateButton').prop('disabled',false);
        $('#deleteButton').prop('disabled',false);
        // $('#updateButton').removeClass('disabled').addClass('active');
    } else {
        ownerOrNot.style.cssText = "display: block";
        $('#updateButton').prop('disabled',true);
        $('#deleteButton').prop('disabled',true);
    }
}

