
from django import views
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url

from blog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
    re_path(r'', views.catchall),
]