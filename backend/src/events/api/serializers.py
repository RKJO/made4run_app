from rest_framework import serializers
from events.models import (
    TeamCompetitionEvent,
    TeamWorkoutEvent,
    UserWorkoutEvent,
)
'''
TeamCompetitionEvent {
 fields : [ create_time last_update_time create_by last_update_by name description slug competition team participants ]
}
 
TeamWorkoutEvent {
 fields : [ create_time last_update_time create_by last_update_by name description slug 
            distance_km ascent descent peace start_date start_time gpx private team participants ]
}

UserWorkoutEvent {
 fields : [ create_time last_update_time create_by last_update_by name description slug 
            distance_km ascent descent peace start_date start_time gpx private participants]
}'''


class TeamCompetitionEventSerializer(serializers.ModelSerializer):
    competition = serializers.StringRelatedField()
    team = serializers.StringRelatedField()
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = TeamCompetitionEvent
        fields = ('name', 'description', 'slug', 'competition', 'team', 'participants',)


class TeamCompetitionEventDetailSerializer(TeamCompetitionEventSerializer):
    class Meta:
        lookup_field = 'slug'


class TeamWorkoutEventSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField()
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = TeamWorkoutEvent
        fields = (
            'description',
            'slug',
            'distance_km',
            'ascent',
            'descent',
            'peace',
            'start_date',
            'start_time',
            'gpx',
            'private',
            'team',
            'participants',
        )


class UserWorkoutEventSerializer(serializers.ModelSerializer):
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = UserWorkoutEvent
        fields = (
            'id',
            'name',
            'description',
            'slug',
            'distance_km',
            'ascent',
            'descent',
            'peace',
            'start_date',
            'start_time',
            'gpx',
            'private',
            'participants',
        )
