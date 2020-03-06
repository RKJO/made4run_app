from django.urls import path, include
from rest_framework.routers import DefaultRouter

from events.api.views import (
    TeamCompetitionEventViewSet,
)

router = DefaultRouter()
router.register('', TeamCompetitionEventViewSet)

urlpatterns = router.urls
