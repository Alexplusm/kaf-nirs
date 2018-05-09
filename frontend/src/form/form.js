const { 
  disabledForm,
  abledForm,
  resetForm,
  setForm,
} = require('./formFields');
const {FormState} = require('./formState');
const formState = new FormState();

const changeFormStateToUpdate = () => {
  // при нажатии на кнопку 'изменить'
  // активируем кнопку 'применить' и блокируем кнопку 'изменитьэ
  console.log('---- in --- changeFormStateToUpdate');
  formState.setNewState(3);
};

const openBlankForm = (data) => {
  resetForm();
  abledForm();
  formState.setNewState(1);

  // for TEST
  // for TEST

  const wrapData = moment(data);

  if (wrapData.isValid) {
    pickTime = wrapData.format('HH:mm');
    // console.log('+++ openBlankForm - pickTime', pickTime);

    // при клике на день выбирается 00:00 - пропускаем инициализацию времени!
    if (pickTime !== '00:00') { setForm({timeStart: pickTime}); }
  }
  openForm();
};

const openWithEventForm = (event) => {
  disabledForm();
  formState.setNewState(2);

  console.log('eventick', event);

  const timeStart = event['start'].format('HH:mm');
  const timeEnd = event['end'].format('HH:mm');

  let dataFromEvent = {
    subject: event['test_object'],
    timeStart: timeStart,
    timeEnd: timeEnd,
    noteText: event['note_text'],
    distance: event['distance_num'],
    tester: event['tester_id'],
  }

  setForm(dataFromEvent);
  openForm();
}



const openForm = () => { $("#mainForm").modal('show'); };

// Обработка кнопок -!-!- Обработка кнопок
// Обработка кнопок -!-!- Обработка кнопок

const {btnDelete, btnUpdate, btnCreate,
  btnApplyUpdates, btnCancel} = require('./formButtons');

btnDelete.addEventListener('click', () => {
  console.log('btnDelete', btnDelete);
});

btnUpdate.addEventListener('click', () => {
  console.log('btnUpdate', btnUpdate);
  changeFormStateToUpdate();
});

btnCreate.addEventListener('click', () => {
  console.log('btnCreate', btnCreate);
});

btnApplyUpdates.addEventListener('click', () => {
  console.log('btnApplyUpdates', btnApplyUpdates);
});

// Обработка кнопок -!-!- Обработка кнопок
// Обработка кнопок -!-!- Обработка кнопок


// test zone
// test zone

const {testXHR} = require('./requests');
console.log('WTF???');
testXHR();
// test zone
// test zone

module.exports = {openBlankForm, openWithEventForm, changeFormStateToUpdate, formState};