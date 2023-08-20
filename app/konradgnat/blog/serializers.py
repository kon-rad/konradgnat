from rest_framework import serializers
from .models import Post
from .models import Room
from .models import Book
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Post 
        fields = ('title', 'slug', 'author', 'tags', 'updated_on', 'content', 'created_on', 'status')

class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room 
        fields = ('room_name', 'get_messages', 'get_users')

class BookSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Book 
        fields = (
            'title',
            'slug',
            'image_url',
            'author',
            'tags',
            'updated_on',
            'read_on',
            'content',
            'preview',
            'created_on',
            'book_status',
            'status',
            'book_format',
        )

    def get_tags(self, obj):
        return obj.tags.names()