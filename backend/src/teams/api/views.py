from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny

from competition_calendar.models import (
    CompetitionModel,
)

from .serializers import (
    TeamSerializer,
)


class TeamViewSet(viewsets.ModelViewSet):
    """Manage Team in the database"""
    serializer_class = TeamSerializer
    queryset = CompetitionModel.objects.all()
    permission_classes = (AllowAny,)
    lookup_field = 'slug'

    # def get_serializer_class(self):
    #     """Return appropriate serializer class"""
    #     if self.action == 'retrieve':
    #         return serializers.CompetitionModelDetailSerializer
    #
    #     return self.serializer_class
