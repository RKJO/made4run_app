from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny

from events.models import (
    TeamCompetitionEvent,
    TeamWorkoutEvent,
    UserWorkoutEvent,
)

from .serializers import (
    TeamCompetitionEventSerializer,
    TeamWorkoutEventSerializer,
    UserWorkoutEventSerializer,
)


class TeamCompetitionEventViewSet(viewsets.ModelViewSet):
    serializer_class = TeamCompetitionEventSerializer
    queryset = TeamCompetitionEvent.objects.all()

    def get_queryset(self):
        # return TeamCompetitionEvent.objects.filter(team__slug=self.kwargs['team_slug'])
        return TeamCompetitionEvent.objects.all()


class TeamWorkoutEventViewSet(viewsets.ModelViewSet):
    serializer_class = TeamWorkoutEventSerializer
    queryset = TeamWorkoutEvent.objects.all()

    def get_queryset(self):
        # return TeamWorkoutEvent.objects.filter(team__slug=self.kwargs['team_slug'])
        return TeamWorkoutEvent.objects.all()


class UserWorkoutEventViewSet(viewsets.ModelViewSet):
    serializer_class = UserWorkoutEventSerializer
    queryset = UserWorkoutEvent.objects.all()

    def get_queryset(self):
        # return TeamWorkoutEvent.objects.filter(team__slug=self.kwargs['team_slug'])
        return UserWorkoutEvent.objects.all()


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
