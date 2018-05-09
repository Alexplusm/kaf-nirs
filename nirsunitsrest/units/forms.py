# -*- coding: utf-8 -*-
from django import forms

from django.forms.widgets import DateTimeInput, HiddenInput, RadioSelect

from .models import UnitSchedule, UnitUserProfile

from django.contrib.auth.models import User

from django.utils import timezone
from datetime import timedelta

from django.db.models import Q


LIST_OF_USERS = User.objects.filter(units_profile__tester=True).order_by('last_name')

def check_time(my_unit, start_time, stop_time):
    queryset = UnitSchedule.objects.filter(unit=my_unit).filter(
        Q(start_work__startswith=start_time.date())|
        Q(end_work__startswith=start_time.date())
        ).order_by('start_work').values_list('start_work','end_work')
    if len(queryset) == 0:
        return False
    t1, t2 = queryset[0]
    if start_time < t1 and stop_time <= t1:
        return False 
    for time_range in queryset:
        t1, t2 = time_range
        if start_time >= t1 and start_time < t2:
           return True
        if stop_time > t1 and stop_time <= t2:
           return True
        if start_time < t1 and stop_time > t2:
           return True
    return False


class MyModelChoiceField(forms.ModelChoiceField):
    def __init__(self, *args, **kwargs):
        super(MyModelChoiceField, self).__init__(*args, **kwargs)
    
    def label_from_instance(self, obj):
        return "%s %s (%s)" % (obj.last_name, obj.first_name, obj.username)


class MyAccountForm(forms.ModelForm):
    class Meta:
        model = UnitUserProfile
        fields = [
            'notice_me',
            ]


class RecordForm (forms.ModelForm):
    tester = MyModelChoiceField(required = True, label='Выбор испытателя', queryset=LIST_OF_USERS, empty_label="Не выбран")

    # my addition
    owner = MyModelChoiceField(required = True, label='Выбор испытателя', queryset=LIST_OF_USERS, empty_label="Не выбран")


    class Meta:
        model = UnitSchedule
        fields = [
            'unit',
            'start_work',
            'end_work',
            'tester',
            # 'contract',
            
            # my addition
            'owner',

            'test_object',
            'distance',
            'note_text',
            ]
        widgets = {
            'start_work': DateTimeInput(attrs={'class':'datetimepicker'}),
            'end_work': DateTimeInput(attrs={'class':'datetimepicker'}),
            'distance': RadioSelect(),
            }



    def clean_start_work(self):
        start_work = self.cleaned_data.get('start_work')
        if start_work < timezone.now():
            raise forms.ValidationError("Вы указали прошедшее время. Пожалуйста, укажите правильное время для записи!")
        return start_work

    def clean_end_work(self):
        end_work = self.cleaned_data.get('end_work')
        if end_work < timezone.now():
            raise forms.ValidationError("Вы указали прошедшее время. Пожалуйста, укажите правильное время для записи!")
        return end_work



    def clean(self):
        cleaned_data = super(RecordForm, self).clean()
        start_work = self.cleaned_data.get('start_work')
        end_work = self.cleaned_data.get('end_work')
        if start_work and end_work:
            if start_work > end_work:
                msg = u"Время окончания работы раньше начала. Пожалуйста, укажите правильное время для записи!"
                self.add_error('start_work', msg)
                self.add_error('end_work', msg)
            if end_work - start_work > timedelta(hours = 36):
                msg = u"Нельзя записываться больше чем на 2 дня!"
                self.add_error('end_work', msg)
            unit = self.cleaned_data.get('unit')
            start_time = self.cleaned_data.get('start_work')
            stop_time = self.cleaned_data.get('end_work')
            if unit.unit_name in (u'АРСА-1', u'АРСА-2', u'Ускоритель') and check_time(unit, start_time, stop_time):
                msg = u"К сожалению, данное время занято. Пожалуйста, укажите свободное время!"
                self.add_error('start_work', msg)
                self.add_error('end_work', msg)

                