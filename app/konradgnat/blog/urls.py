from . import views
# from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', views.PostList, 'blog')
router.register(r'books', views.BooksList, 'books')

from django.urls import path, re_path, include

urlpatterns = [
    # path('blog', views.PostList.as_view(), name='blog'),
    # path('dataviz/', views.dataviz, name='dataviz'),
    # path('<slug:slug>/', views.PostDetail.as_view(), name='post_detail'),
    # # path('books', views.BooksList.as_view(), name='books'),
    # path('books/<slug:slug>/', views.BookDetail.as_view(), name='book_detail'),
    # path('projects', views.ProjectsList.as_view(), name='projects'),
    # path('projects/<slug:slug>/', views.ProjectDetail.as_view(), name='project_detail'),
    # path('devlog', views.devlog, name='devlog'),
    # path('devlog/azure_ai/', views.devlogAzureAiHackathon, name='azure_ai'),
    # path('codebits', views.codebits, name='codebits'),
    # path('now', views.now, name='now'),
    # path('now', views.NowList.as_view(), name='now'),
    # path('now/<slug:slug>/', views.BookDetail.as_view(), name='book_detail'),
    # # serialized JSON api routes
    path('api/blog', include(router.urls)),
]
