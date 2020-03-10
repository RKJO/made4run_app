from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny

from competition_calendar.models import (
    Competition,
)

from .serializers import (
    CompetitionModelSerializer,
)


class CompetitionViewSet(viewsets.ModelViewSet):
    """Manage Competition in the database"""
    serializer_class = CompetitionModelSerializer
    queryset = Competition.objects.all()
    permission_classes = (AllowAny,)
    lookup_field = 'slug'

    # def get_serializer_class(self):
    #     """Return appropriate serializer class"""
    #     if self.action == 'retrieve':
    #         return serializers.CompetitionModelDetailSerializer
    #
    #     return self.serializer_class
