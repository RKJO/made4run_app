from rest_framework.generics import ListAPIView, RetrieveAPIView
from made4run_app.competition_calendar.models import (
    CompetitionModel,
)

from .serializers import CompetitionModelSerializer


class CompetitionListView(ListAPIView):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionModelSerializer


class CompetitionDetailView(RetrieveAPIView):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionModelSerializer
