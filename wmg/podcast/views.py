from django.shortcuts import render
from django.http import HttpResponse

def podcast(request):
    return render(request, 'podcast/podcast.html')