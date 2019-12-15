from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^new$',views.new_job,name="new"),
    url(r'^create$',views.create_job,name="create"),
    url(r'^edit/(?P<job_id>\d+)$',views.edit_job,name="edit"),
    url(r'^(?P<job_id>\d+)$',views.job_info,name="info"),
    url(r'^remove/(?P<job_id>\d+)$',views.job_remove,name="remove"),
    url(r'^add/(?P<job_id>\d+)$',views.add_job,name="add"),
    url(r'^quit/(?P<job_id>\d+)$',views.quit_job,name="quit")
]