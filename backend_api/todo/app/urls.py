from django.urls import path

from app import views


urlpatterns = [
  path('', views.todoList, name="todolist"),
]