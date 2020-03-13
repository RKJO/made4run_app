from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer

from account.models import Result

User = get_user_model()


class ResultSerializer(serializers.ModelSerializer):
    competition = serializers.StringRelatedField()
    distance = serializers.StringRelatedField()

    class Meta:
        model = Result
        fields = [
            'competition',
            'distance',
            'duration',
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    avatar = VersatileImageFieldSerializer(sizes='user_avatars')
    result = ResultSerializer(source='results', many=True)

    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'note',
            'avatar',
            'result',
        ]
