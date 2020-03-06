from rest_framework import serializers
from events.models import (
    TeamCompetitionEvent,
)


class TeamCompetitionEventSerializer(serializers.ModelSerializer):
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = TeamCompetitionEvent
        fields = ('name', 'description', 'slug', 'competition', 'team', 'participants',)


class TeamCompetitionEventDetailSerializer(TeamCompetitionEventSerializer):
    class Meta:
        lookup_field = 'slug'
