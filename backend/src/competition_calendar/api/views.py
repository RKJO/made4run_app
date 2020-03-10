from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser

from competition_calendar.models import (
    Competition,
)
from core.permissions import ActionBasedPermission

from .serializers import (
    CompetitionModelSerializer,
)


class CompetitionViewSet(viewsets.ModelViewSet):
    """Manage Competition in the database"""
    serializer_class = CompetitionModelSerializer
    queryset = Competition.objects.all()
    permission_classes = (ActionBasedPermission,)
    action_permissions = {
        IsAuthenticatedOrReadOnly: ['list', 'retrieve'],
        IsAuthenticated: ['create', 'update', 'partial_update'],
        IsAdminUser: ['destroy']
    }
    lookup_field = 'slug'

    # def get_serializer_class(self):
    #     """Return appropriate serializer class"""
    #     if self.action == 'retrieve':
    #         return serializers.CompetitionModelDetailSerializer
    #
    #     return self.serializer_class
