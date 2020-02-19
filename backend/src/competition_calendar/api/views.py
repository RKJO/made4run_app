from rest_framework.generics import ListAPIView, RetrieveAPIView
from ..models import (
    CompetitionModel,
    DistanceModel,
)

from .serializers import CompetitionModelSerializer


class CompetitionLinkModelListView(ListAPIView):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionModelSerializer


class CompetitionLinkModelListViewDetailView(RetrieveAPIView):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionModelSerializer
