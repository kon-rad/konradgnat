from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

STATUS = (
    (0,"Draft"),
    (1,"Publish")
)

BOOK_STATUS = (
    (0, "Want to read"),
    (1, "Reading currently"),
    (2, "Read"),
)

BOOK_FORMAT = {
    (0, "Print"),
    (1, "Ebook"),
    (2, "Audiobook"),
}

class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='blog_posts')
    tags = TaggableManager()
    updated_on = models.DateTimeField(auto_now= True)
    content = models.TextField()
    preview = models.CharField(max_length=200)
    created_on = models.DateTimeField(null=True, blank=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title

class ChatUser(models.Model):
    user_name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.user_name

class Message(models.Model):
    username = models.ForeignKey(ChatUser, on_delete=models.CASCADE)
    message = models.CharField(max_length=250, unique=True)
    pub_date = models.DateField()

    def __str__(self):
        return self.message

    def get_user(self):
        return "\n".join([u.user_name for u in self.username.all()])

class Room(models.Model):
    room_name = models.CharField(max_length=200, unique=True)
    users = models.ManyToManyField(ChatUser)
    messages = models.ManyToManyField(Message)

    def __str__(self):
        return self.room_name

    def get_users(self):
        return "\n".join([u.user_name for u in self.users.all()])

    def get_messages(self):
        return "\n".join([m.message for m in self.messages.all()])

class Book(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    image_url = models.CharField(max_length=200)
    tags = TaggableManager()
    author = models.CharField(max_length=200)
    updated_on = models.DateTimeField(auto_now= True)
    created_on = models.DateTimeField(auto_now= True)
    read_on = models.DateField(null=True, blank=True)
    content = models.TextField()
    preview = models.CharField(max_length=200)
    status = models.IntegerField(choices=STATUS, default=0)
    book_status = models.IntegerField(choices=BOOK_STATUS, default=0)
    book_format = models.IntegerField(choices=BOOK_FORMAT, default=0)

    class Meta:
        ordering = ['-read_on']

    def __str__(self):
        return self.title
class Project(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    status = models.IntegerField(choices=STATUS, default=0)
    image_url1 = models.CharField(max_length=200, default=None, blank=True, null=True)
    image_url2 = models.CharField(max_length=200, default=None, blank=True, null=True)
    image_url3 = models.CharField(max_length=200, default=None, blank=True, null=True)
    image_url4 = models.CharField(max_length=200, default=None, blank=True, null=True)
    image_url5 = models.CharField(max_length=200, default=None, blank=True, null=True)
    image_url6 = models.CharField(max_length=200, default=None, blank=True, null=True)
    video_url1 = models.CharField(max_length=200, default=None, blank=True, null=True)
    video_url2 = models.CharField(max_length=200, default=None, blank=True, null=True)
    video_url3 = models.CharField(max_length=200, default=None, blank=True, null=True)
    video_url4 = models.CharField(max_length=200, default=None, blank=True, null=True)
    tags = TaggableManager(blank=True)
    priority_order = models.IntegerField(default=0)
    updated_on = models.DateTimeField(auto_now=True)
    completed_on = models.DateTimeField(null=True, blank=True)
    preview = models.CharField(max_length=600, default=None, blank=True, null=True)
    content = models.TextField(default=None, blank=True, null=True)
    github_link = models.CharField(max_length=600, default=None, blank=True, null=True)
    live_link = models.CharField(max_length=600, default=None, blank=True, null=True)
    other_link = models.CharField(max_length=600, default=None, blank=True, null=True)
    other_link_title = models.CharField(max_length=600, default=None, blank=True, null=True)
