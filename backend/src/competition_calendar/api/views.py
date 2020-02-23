from rest_framework.generics import ListAPIView, RetrieveAPIView
from competition_calendar.models import (
    CompetitionModel,
    DistanceModel,
)

from .serializers import CompetitionModelSerializer


class CompetitionListView(ListAPIView):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionModelSerializer


class CompetitionDetailView(RetrieveAPIView):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionModelSerializer
