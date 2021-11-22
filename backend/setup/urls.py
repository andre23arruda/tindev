from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static # para servir mídia
from rest_framework import routers
from tindev.views import DevsViewSet

# router
router = routers.DefaultRouter()
router.register('tindev/devs', DevsViewSet, basename='Developers')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # servindo mídia
