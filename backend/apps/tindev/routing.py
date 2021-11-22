from django.urls import path

from .consumers import TindevConsumer

websocket_urlpatterns = [
    path('ws/users/<user_id>', TindevConsumer.as_asgi()),
]