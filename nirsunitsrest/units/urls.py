# -*- coding: utf-8 -*-

from django.conf.urls import url, include

# REST
from rest_framework.urlpatterns import format_suffix_patterns

from django.views.generic import TemplateView, RedirectView # для разработки
# REST

from .views import (
	home,
	# my_account,
	UnitsListView,
	ScheduleListView,
	UnitScheduleListView,
	MyRecListView,
	# record_add,
	# record_edit,
	# record_print,
	# record_delete,



	# REST
	UnitUserProfileList,
	UnitUserProfileDetail,
	
	# actions with calendar
	schedule_calendar,

	# newREST
	UnitScheduleViewSet,
	)

from rest_framework import routers
router = routers.SimpleRouter()
router.register(r'unit_schedule', UnitScheduleViewSet)

urlpatterns = [

	url(r'^$', RedirectView.as_view(url='units_list/')),
	url(r'^units_list/$', TemplateView.as_view(template_name='units/new_units_list.html'), name='units_list'),
	url(r'^units_list/(?P<unit>.*)/$', schedule_calendar, name='schedule_calendar'),



	# url(r'^record/$', record_add, name='record_add'),
	# url(r'^myaccount/$', my_account, name='my_account'),
	# url(r'^schedule/(?P<pk>\d{1,9})/$', record_edit, name='record_edit'),
	# url(r'^schedule/(?P<pk>\d{1,9})/print/$', record_print, name='record_print'),
	# url(r'^schedule/(?P<pk>\d{1,9})/delete/$', record_delete, name='record_delete'),
	url(r'^schedule/$', ScheduleListView.as_view(), name='schedule_list'),
	url(r'^myrecords/$', MyRecListView.as_view(), name='myrecords_list'),
	url(r'^schedule/(?P<unit>.*)/$', UnitScheduleListView.as_view(), name='unit_schedule_list'),
	# url(r'^record/(?P<unit>.*)/$', record_add, name='record_unit_add'),

]

urlpatterns += router.urls