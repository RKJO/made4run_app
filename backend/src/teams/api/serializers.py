from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer

from account.api.serializers import UserProfileSerializer
from events.api.serializers import TeamCompetitionEventSerializer, TeamWorkoutEventSerializer
from teams.models import (
    Team,
    TeamMembership,
)


class TeamMembershipSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = TeamMembership
        fields = ('user', 'accepted', 'is_admin',)


class TeamMembersSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()

    class Meta:
        model = TeamMembership
        fields = ('user',)


class TeamSerializer(serializers.ModelSerializer):
    members = serializers.StringRelatedField(many=True)
    team_image = VersatileImageFieldSerializer(
        sizes='team_background_images'
    )

    class Meta:
        model = Team
        fields = ('id', 'name', 'description', 'team_image', 'slug', 'members',)


class TeamDetailSerializer(serializers.ModelSerializer):
    team_image = VersatileImageFieldSerializer(
        sizes='team_background_images'
    )
    members = TeamMembershipSerializer(source='team_memberships', many=True)
    team_competition_events = TeamCompetitionEventSerializer(source='teamcompetitionevent_set', many=True)
    team_workout_events = TeamWorkoutEventSerializer(source='teamworkoutevent_set', many=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'description', 'team_image', 'slug',
                  'members',
                  'team_competition_events',
                  'team_workout_events'
                  )

