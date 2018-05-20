function dateTimePickerSetup () {
  $(function () {

    $('#timepickerStart').datetimepicker({
        format: 'HH:mm',
        stepping: 15,
    });

    $('#timepickerEnd').datetimepicker({
      format: 'HH:mm',
      stepping: 15,
    });

    $('#datepickerEnd').datetimepicker({
      format: 'L',
      minDate: moment(),
      defaultDate: moment(),
    });


  });
};
module.exports = {dateTimePickerSetup};