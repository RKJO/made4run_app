from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny

from events.models import (
    TeamCompetitionEvent,
    TeamWorkoutEvent,
)

from .serializers import (
    TeamCompetitionEventSerializer,
    TeamWorkoutEventSerializer,
)


class TeamCompetitionEventViewSet(viewsets.ModelViewSet):
    serializer_class = TeamCompetitionEventSerializer
    queryset = TeamCompetitionEvent.objects.all()

    def get_queryset(self):
        return TeamCompetitionEvent.objects.filter(team__slug=self.kwargs['team_slug'])


class TeamWorkoutEventViewSet(viewsets.ModelViewSet):
    serializer_class = TeamWorkoutEventSerializer
    queryset = TeamWorkoutEvent.objects.all()

    def get_queryset(self):
        return TeamWorkoutEvent.objects.filter(team__slug=self.kwargs['team_slug'])

# class TeamCompetitionEventViewSet(viewsets.ModelViewSet):
#     """Manage Team in the database"""
#     serializer_class = TeamCompetitionEventSerializer
#     queryset = TeamCompetitionEvent.objects.all()
#     permission_classes = (AllowAny,)
#     lookup_field = 'slug'
#
#     # def get_serializer_class(self):
#     #     """Return appropriate serializer class"""
#     #     if self.action == 'retrieve':
#     #         return serializers.CompetitionModelDetailSerializer
#     #
#     #     return self.serializer_class
