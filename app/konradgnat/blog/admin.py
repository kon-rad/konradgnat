from django.contrib import admin
from .models import Post
from .models import Room
from .models import ChatUser
from .models import Message
from .models import Book
from .models import Project

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_name', 'get_users', 'get_messages')

class ChatUserAdmin(admin.ModelAdmin):
    list_display = ['user_name']
    
    
class MessageUserAdmin(admin.ModelAdmin):
    list_display = ['message']

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','read_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','completed_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
  
admin.site.register(Post, PostAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(ChatUser, ChatUserAdmin)
admin.site.register(Message, MessageUserAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Project, ProjectAdmin)