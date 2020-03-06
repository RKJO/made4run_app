from django.urls import path, include
from rest_framework.routers import DefaultRouter

from teams.api.views import (
    TeamViewSet,
)

router = DefaultRouter()
router.register('api/Teams', TeamViewSet)

urlpatterns = router.urls
