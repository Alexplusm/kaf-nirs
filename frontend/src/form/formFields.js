const form = document.forms['mainForm'];

const subjectField = form['subject'];
const timeStartField = form['timeStart'];
const timeEndField = form['timeEnd'];

const noteTextArea = form['noteText'];

const distanceField = form['distance'];
const testerField = form['tester'];

const formElements = [
  subjectField, timeStartField, timeEndField,
];

const formElementsForValidation = [noteTextArea, distanceField, testerField]
  .concat(formElements);

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

const resetFormValidation = () => {
  formElementsForValidation.forEach(el => {
    el.classList.remove('is-invalid');
    el.classList.remove('is-valid');
  })
}

const disabledForm = () => {
  formElements.forEach(el => {
    el.setAttribute("disabled", true);
  });

  noteTextArea.setAttribute("disabled", true);
  testerField.setAttribute("disabled", true);
  distanceField.setAttribute("disabled", true);
};

const abledForm = () => {
  formElements.forEach(el => {
    el.removeAttribute('disabled');
  });

  noteTextArea.removeAttribute('disabled');
  testerField.removeAttribute('disabled');
  distanceField.removeAttribute('disabled');
};

const retrieveForm = () => {
  const formObj = {
    subjectField: subjectField.value,
    noteTextArea: noteTextArea.value,
    timeStartField: timeStartField.value,
    timeEndField: timeEndField.value,

    testerField: testerField.value,
    distanceField: distanceField.value
  }

  // console.log('-- FORM', formObj);
  // console.log('&&& - formIsValid()', formIsValid());

  formValidation();
}

const formIsValid = () => {
  const b1 = formElements.every((item) => {
    console.log('*** item', item.value);
    return !!item.value;
  });

  const b2 = (distanceField.value !== '-1');
  const b3 = (testerField.value !== '-1');

  return (b1 && b2 && b3);
}

const formValidation = () => {
  
  formElementsForValidation.forEach(el => {
    if (el.value === '' || el.value === '-1') {
      el.classList.add('is-invalid');
      el.classList.remove('is-valid');
    } else {
      el.classList.remove('is-invalid');
      el.classList.add('is-valid');
    }
  });

  

  // if (noteTextArea.value) {
  //   noteTextArea
  //   noteTextArea
  // } else 


}

const initForm = () => {
  formElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.classList.remove('is-invalid');
    });
  });

  noteTextArea.addEventListener('focus', () => {
    noteTextArea.classList.remove('is-invalid');
  });

  distanceField.addEventListener('focus', () => {
    distanceField.classList.remove('is-invalid');
  });

  testerField.addEventListener('focus', () => {
    testerField.classList.remove('is-invalid');
  });
}

module.exports = {
  disabledForm, abledForm, resetForm,
  setForm, retrieveForm, formIsValid,
  formValidation, initForm, resetFormValidation
};