import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import tindev.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')

# application = get_asgi_application()
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            tindev.routing.websocket_urlpatterns
        )
    ),
})