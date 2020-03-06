from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('', include('account.api.urls')),
    path('api/competitions', include('competition_calendar.api.urls')),
    path('api/teams/', include('teams.api.urls')),
    path('api/events/', include('events.api.urls')),
]
