# Generated by Django 3.1.4 on 2021-04-24 17:24

from django.db import migrations, models
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('blog', '0007_auto_20210215_2316'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='built_on',
            new_name='completed_on',
        ),
        migrations.RemoveField(
            model_name='project',
            name='image_url',
        ),
        migrations.AddField(
            model_name='project',
            name='github_link',
            field=models.CharField(blank=True, default=None, max_length=600, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='image_url1',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='image_url2',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='image_url3',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='image_url4',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='image_url5',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='image_url6',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='live_link',
            field=models.CharField(blank=True, default=None, max_length=600, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='other_link',
            field=models.CharField(blank=True, default=None, max_length=600, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='other_link_title',
            field=models.CharField(blank=True, default=None, max_length=600, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='preview',
            field=models.CharField(blank=True, default=None, max_length=600, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='video_url1',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='video_url2',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='video_url3',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='video_url4',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='book_format',
            field=models.IntegerField(choices=[(1, 'Ebook'), (0, 'Print'), (2, 'Audiobook')], default=0),
        ),
        migrations.AlterField(
            model_name='project',
            name='content',
            field=models.TextField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
