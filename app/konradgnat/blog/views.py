from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets
from django.http import HttpResponse
from django.template import loader
from django.views import generic 
from django.shortcuts import render

import os

from .models import Post
from .models import Room
from .models import Message
from .models import Book
from .models import Project
from .serializers import *

from .serializers import PostSerializer

from .now import Now

from django.shortcuts import render

from django.views.generic import TemplateView

catchall = TemplateView.as_view(template_name='index.html')

def index(request):
    print("hello world views.py")
    return render(request, 'build/index.html')

# def home(request):
#     template = loader.get_template('index.html')
#     projects = Project.objects.order_by('priority_order')
#     projectTags = {}
#     for project in projects:
#         allTagSlugs = []
#         for name in project.tags.names():
#             projectTags[name] = name
#             allTagSlugs.append(name)
#         setattr(project, 'allTagSlugs', ','.join(allTagSlugs))

#     context = {}
#     context['projects'] = projects
#     context['projectTags'] = projectTags.keys()
#     return HttpResponse(template.render(context, request))

class PostList(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class BooksList(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()


class PostDetail(generic.DetailView):
    model = Post
    template_name = 'post_detail.html'

class BookDetail(generic.DetailView):
    model = Book
    template_name = 'books/book_detail.html'

class ProjectsList(generic.ListView):
    queryset = Project.objects.filter(status=1).order_by('-completed_on')
    template_name = 'projects/projects.html'

class ProjectDetail(generic.DetailView):
    model = Project
    template_name = 'projects/project_detail.html'

# class Devlog():
def devlog(request):
    template_name = 'devlog.html'
    context = {}
    return render(request, template_name, context=context)

def devlogAzureAiHackathon(request):
    template_name = 'devlogDetail.html'
    markdowntext = open(os.path.join(os.path.dirname(__file__), 'markdown/azure_ai_hackathon_2021.md')).read()

    context = {}
    context['markdowntext'] = markdowntext

    return render(request, template_name, context=context)

def dataviz(request):
    template = request.GET.get('page', None)
    template_name = "dataviz/" + template + ".html"

    return render(request, template_name)

def codebits(request):
    template_name = 'codebits.html'
    context = {}
    return render(request, template_name, context=context)

def now(request):
    template_name = 'now.html'
    data = Now.getData()
    print(data)
    context = {
        "now_list": data
    }
    return render(request, template_name, context=context)

# class NowList(generic.ListView):
#     queryset = Book.objects.filter(status=1).order_by('-read_on')
#     template_name = 'now.html'

# class NowDetail(generic.DetailView):
#     model = Now
#     template_name = 'books/now_detail.html'

