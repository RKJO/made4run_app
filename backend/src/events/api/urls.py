from django.urls import path, include
from rest_framework.routers import DefaultRouter

from events.api.views import (
    TeamCompetitionEventViewSet,
    TeamWorkoutEventViewSet,
    UserWorkoutEventViewSet,
)

router = DefaultRouter()
router.register('team_competitions', TeamCompetitionEventViewSet)
router.register('team_workouts', TeamWorkoutEventViewSet)
router.register('user_workouts', UserWorkoutEventViewSet)

urlpatterns = router.urls
