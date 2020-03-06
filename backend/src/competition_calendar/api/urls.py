from django.urls import path, include
from rest_framework.routers import DefaultRouter

from competition_calendar.api.views import (
    CompetitionViewSet,
)

router = DefaultRouter()
router.register('', CompetitionViewSet)

urlpatterns = router.urls
