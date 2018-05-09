const {changeFormStateToUpdate, formState} = require('./form');

const btnDelete = document.getElementsByName('btnDelete')[0];
const btnUpdate = document.getElementsByName('btnUpdate')[0];
const btnCreate = document.getElementsByName('btnCreate')[0];
const btnApplyUpdates = document.getElementsByName('btnApplyUpdates')[0];

// рудимент?
const btnCancel = document.getElementsByName('btnCancel')[0];

const subscribeOnDelete = () => {
  btnDelete.addEventListener('click', () => {
    console.log('btnDelete', btnDelete);
  });
};

const subscribeOnUpdate = (func) => {
  btnUpdate.addEventListener('click', () => {
    console.log('btnUpdate', btnUpdate);
    func();
  });
};

const subscribeOnCreate = () => {
  btnCreate.addEventListener('click', () => {
    console.log('btnCreate', btnCreate);
  });
};

const subscribeOnApplyUpdates = () => {
  btnApplyUpdates.addEventListener('click', () => {
    console.log('btnApplyUpdates', btnApplyUpdates);
  });
};

const subscriptions = [
  subscribeOnDelete, subscribeOnUpdate,
  subscribeOnCreate, subscribeOnApplyUpdates,
]

module.exports = {
  subscribeOnDelete, 
  subscribeOnUpdate,
  subscribeOnCreate,
  subscribeOnApplyUpdates,
  btnUpdate,
  btnApplyUpdates,
};