from django.db import models
from django.utils.translation import ugettext_lazy as _

from shortuuid.django_fields import ShortUUIDField


class Dev(models.Model):
    id = ShortUUIDField(length=8, max_length=40, primary_key=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    avatar = models.CharField(max_length=500)
    bio = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField('self', related_name='dev_likes', null=True, blank=True, symmetrical=False)
    dislikes = models.ManyToManyField('self', related_name='dev_dislikes', null=True, blank=True, symmetrical=False)

    def __str__(self):
        return f'{ self.name }'