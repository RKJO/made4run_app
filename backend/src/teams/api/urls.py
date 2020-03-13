from django.urls import path, include
from django.conf.urls import url
from rest_framework_nested import routers

from teams.api.views import (
    TeamViewSet,
    TeamMembershipViewSet,
)

router = routers.SimpleRouter()
router.register('', TeamViewSet)

team_router = routers.NestedSimpleRouter(router, '', lookup='team')
team_router.register(r'members', TeamMembershipViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(team_router.urls)),
    ]
