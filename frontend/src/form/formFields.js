const form = document.forms['mainForm'];

const subjectField = form['subject'];
const timeStartField = form['timeStart'];
const timeEndField = form['timeEnd'];
const noteTextArea = form['noteText'];

const distanceField = form['distance'];
const testerField = form['tester'];

const formElements = [
  subjectField, timeStartField, timeEndField, noteTextArea
];

const setForm = ({ subject,
                  timeStart,
                  timeEnd,
                  noteText,
                  distance, 
                  tester, }) => {

  subjectField.value = (subject) ? subject : null;
  noteTextArea.value = (noteText ? noteText : null);
  timeStartField.value = (timeStart) ? timeStart : null;
  timeEndField.value = (timeEnd) ? timeEnd : null;

  testerField.selectedIndex = (tester) ? tester : null;
  distanceField.selectedIndex = (distance) ? distance : null;
};

const resetForm = () => {
  formElements.forEach(el => {
    el.value = null;
  });

  testerField.value = -1;
  distanceField.value = -1;
};

const disabledForm = () => {
  formElements.forEach(el => {
    el.setAttribute("disabled", true);
  });

  testerField.setAttribute("disabled", true);
  distanceField.setAttribute("disabled", true);
};

const abledForm = () => {
  formElements.forEach(el => {
    el.removeAttribute('disabled');
  });

  testerField.removeAttribute('disabled');
  distanceField.removeAttribute('disabled');
};

module.exports = {disabledForm, abledForm, resetForm, setForm};