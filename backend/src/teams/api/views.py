from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated

from core.permissions import IsTeamAdmin
from teams.models import (
    Team,
)

from .serializers import (
    TeamSerializer,
    TeamDetailSerializer)


class TeamViewSet(viewsets.ModelViewSet):
    """Manage Team in the database"""
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    lookup_field = 'slug'

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsTeamAdmin]
        elif self.action in ['create']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = (IsAuthenticatedOrReadOnly,)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action in ['retrieve', 'update', 'partial_update']:
            obj = self.get_object()
            if self.request.user in obj.get_team_admins:
                return TeamDetailSerializer

        return self.serializer_class
