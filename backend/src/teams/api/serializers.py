from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer

from account.api.serializers import UserProfileSerializer
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
        fields = ('id', 'name', 'description', 'members', 'team_image', 'slug',)


class TeamDetailSerializer(serializers.ModelSerializer):
    members = TeamMembershipSerializer(source='team_memberships', many=True)
    team_image = VersatileImageFieldSerializer(
        sizes='team_background_images'
    )

    class Meta:
        model = Team
        fields = ('id', 'name', 'description', 'members', 'team_image', 'slug',)

