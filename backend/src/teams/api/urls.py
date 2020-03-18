from django.conf.urls import url
from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from events.api.views import TeamCompetitionEventViewSet, TeamWorkoutEventViewSet
from teams.api.views import (
    TeamViewSet,
    TeamMembershipViewSet)

router = routers.DefaultRouter()
router.register(r'', TeamViewSet)


members_router = routers.NestedSimpleRouter(router, r'', lookup='team')
members_router.register('members', TeamMembershipViewSet)

team_competition_router = routers.NestedSimpleRouter(router, r'', lookup='team')
team_competition_router.register('competitions', TeamCompetitionEventViewSet)

team_workout_router = routers.NestedSimpleRouter(router, r'', lookup='team')
team_workout_router.register('workouts', TeamWorkoutEventViewSet)

urlpatterns = router.urls
urlpatterns = [
    path('', include(router.urls)),
    path('', include(members_router.urls)),
    path('', include(team_competition_router.urls)),
    path('', include(team_workout_router.urls)),
]