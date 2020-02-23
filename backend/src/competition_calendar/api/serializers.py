from rest_framework import serializers
from competition_calendar.models import (
    CompetitionModel,
    DistanceModel,
)


class CompetitionModelSerializer(serializers.ModelSerializer):
    distances = serializers.StringRelatedField(many=True)

    class Meta:
        model = CompetitionModel
        fields = ('no', 'name', 'start_date', 'url', 'description', 'distances', 'text', 'slug', )
