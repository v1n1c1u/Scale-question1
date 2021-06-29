"""
Definition of urls for question1.
"""

from django.urls import path
from app import forms, views


urlpatterns = [
    path('', views.home, name='home')
]
