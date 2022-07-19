from django.urls import path

from .views import *

urlpatterns = [
    path('', index),
    path('podcast/', podcast),
    path('music_map/', music_map),
    path('about', about),
    path('contacts/', contacts)
]