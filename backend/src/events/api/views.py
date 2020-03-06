from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny

from events.models import (
    TeamCompetitionEvent,
)

from .serializers import (
    TeamCompetitionEventSerializer,
)


class TeamCompetitionEventViewSet(viewsets.ModelViewSet):
    """Manage Team in the database"""
    serializer_class = TeamCompetitionEventSerializer
    queryset = TeamCompetitionEvent.objects.all()
    permission_classes = (AllowAny,)
    lookup_field = 'slug'

    # def get_serializer_class(self):
    #     """Return appropriate serializer class"""
    #     if self.action == 'retrieve':
    #         return serializers.CompetitionModelDetailSerializer
    #
    #     return self.serializer_class
