from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.members, name='members'),
    path('index/', views.index, name='index'),
    path('members/details/<int:id>', views.details, name='details'),
    path('', views.main, name='main'),
    path('testing/', views.testing, name='testing'),
    path('test/', views.test, name='test')
]