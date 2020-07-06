from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/competitions/', include('competition_calendar.api.urls')),
    path('api/teams/', include('teams.api.urls')),
    path('api/events/', include('events.api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
