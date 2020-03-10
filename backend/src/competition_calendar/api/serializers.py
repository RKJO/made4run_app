from rest_framework import serializers
from competition_calendar.models import (
    Competition,
    # Distance,
)


class CompetitionModelSerializer(serializers.ModelSerializer):
    distances = serializers.StringRelatedField(many=True)

    class Meta:
        model = Competition
        fields = ('no', 'name', 'location', 'start_date', 'url', 'description', 'distances', 'text', 'slug', )


class CompetitionModelDetailSerializer(CompetitionModelSerializer):
    class Meta:
        lookup_field = 'slug'
