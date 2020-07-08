from rest_framework import viewsets, serializers
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from django_filters import rest_framework as filters

from competition_calendar.models import (
    Competition,
)
from core.permissions import ActionBasedPermission

from .serializers import (
    CompetitionModelSerializer,
    CompetitionModelDetailSerializer,
)


class CompetitionFilter(filters.FilterSet):

    name = filters.CharFilter(field_name="name", lookup_expr='icontains')
    min_date = filters.DateFilter(field_name="start_date", lookup_expr='gte')
    max_date = filters.DateFilter(field_name="start_date", lookup_expr='lte')

    class Meta:
        model = Competition
        fields = ['name', 'min_date', 'max_date']


class CompetitionViewSet(viewsets.ModelViewSet):
    """Manage Competition in the database"""
    serializer_class = CompetitionModelSerializer
    queryset = Competition.objects.all().order_by('start_date')
    # permission_classes = (ActionBasedPermission,)
    # action_permissions = {
    #     IsAuthenticatedOrReadOnly: ['list', 'retrieve'],
    #     IsAuthenticated: ['create', 'update', 'partial_update'],
    #     IsAdminUser: ['destroy']
    # }
    lookup_field = 'slug'
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = CompetitionFilter

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return CompetitionModelDetailSerializer

        return self.serializer_class
