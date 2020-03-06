from rest_framework import serializers
from teams.models import (
    Team,
)


class TeamSerializer(serializers.ModelSerializer):
    # members = serializers.StringRelatedField(many=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'description', 'members', 'team_image', 'slug',)
# TODO:
#   serialize members
#   proper serialize image


class TeamDetailSerializer(TeamSerializer):
    class Meta:
        lookup_field = 'slug'