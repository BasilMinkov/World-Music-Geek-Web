from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index/index.html')

def podcast(request):
    return render(request, 'podcast/podcast.html')

def about(request):
    return render(request, 'about/about.html')
    
def music_map(request):
    return render(request, 'music_map/music_map.html')

def contacts(request):
    return render(request, 'contacts/contacts.html')