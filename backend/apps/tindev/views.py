import requests
from django.utils.translation import gettext_lazy as _
from rest_framework import viewsets

from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Dev
from .serializers import DevSerializer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def send_message_to_client(channel_layer, user_id, message_text):
    '''Envia mensagem em tempo real para cliente'''
    async_to_sync(channel_layer.group_send)(
        f'room_{ user_id }',
        {
            'type': 'send_message',
            'detail': message_text,
        }
    )


class DevsViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Dev to be viewed or edited.'''
    queryset = Dev.objects.all()
    serializer_class = DevSerializer

    def list(self, request):
        queryset = self.queryset
        user_id = self.request.headers.get('userid')

        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     'room_1', {'type': 'send_message', 'teste': 'teste'}
        # )

        if user_id:
            logged_dev = queryset.get(pk=user_id)
            queryset = queryset.exclude(pk=user_id)
            queryset = queryset.exclude(pk__in=logged_dev.likes.all())
            queryset = queryset.exclude(pk__in=logged_dev.dislikes.all())
        serializer = DevSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, serializer):
        '''Create Dev'''
        data = serializer.data
        dev = self.queryset.filter(user=data['user'])
        if dev.exists():
            dev = dev.first()
        else:
            response = requests.get(f'https://api.github.com/users/{ data["user"] }')
            user_data = response.json()

            dev = Dev.objects.create(
                user=user_data['login'],
                name=user_data.get('name') or user_data['login'],
                avatar=user_data['avatar_url'],
                bio=user_data['bio'],
            )
        serializer = DevSerializer(dev)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None, *args, **kwargs):
        '''Like de um usuário em outro'''
        dev = self.get_object()
        data = request.data
        target_dev_id = data['user_id']
        target_dev = get_object_or_404(Dev, pk=target_dev_id)
        dev.likes.add(target_dev)
        dev.save()

        dev_serializer = DevSerializer(dev)

        channel_layer = get_channel_layer()
        channel_group_list = channel_layer.groups
        if dev in target_dev.likes.all():
            target_dev_serializer = DevSerializer(target_dev)
            if f'room_{ target_dev_id }' in channel_group_list:
                send_message_to_client(channel_layer, target_dev_id, dev_serializer.data)
                send_message_to_client(channel_layer, pk, target_dev_serializer.data)

        return Response(dev_serializer.data)

    @action(detail=True, methods=['post'])
    def dislike(self, request, pk=None, *args, **kwargs):
        '''Dislike de um usuário em outro'''
        dev = self.get_object()
        data = request.data
        target_dev = get_object_or_404(Dev, pk=data['user_id'])
        dev.dislikes.remove(target_dev)
        dev.save()
        serializer = DevSerializer(dev)
        return Response(serializer.data)