from rest_framework import serializers
from competition_calendar.models import (
    Competition,
    Distance,
)


class DistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distance
        fields = [
            "name",
            "distance_km",
            "ascent",
            "descent",
            "ITRA_points",
            "mountain_level"
        ]

'''
{
    "no": null,
    "name": "łemkowyna ultra trail",
    "location": "Krynica Zdrój, deptak przy Pijalni Głównej, ul. Nowotarskiego 9",
    "start_date": "2020-10-24",
    "end_date": null,
    "description": "",
    "url": "http://www.ultralemkowyna.pl",
    "text": "",
    "slug": "",
    "distances": [
        {"name": "łut-150", "distance_km": "150", "ascent": null, "descent": null, "ITRA_points": null, "mountain_level": null}
    ]
}
'''


class CompetitionModelSerializer(serializers.ModelSerializer):
    distances = serializers.StringRelatedField(many=True)

    class Meta:
        model = Competition
        fields = (
            'no',
            'name',
            'location',
            'start_date',
            'end_date',
            'description',
            'url',
            'text',
            'slug',
            'distances',
        )


class CompetitionModelDetailSerializer(serializers.ModelSerializer):
    distances = DistanceSerializer(many=True)

    class Meta:
        model = Competition
        fields = (
            'no',
            'name',
            'location',
            'start_date',
            'end_date',
            'description',
            'url',
            'text',
            'slug',
            'distances',
        )
        lookup_field = 'slug'

    def create(self, validated_data):
        distances_data = validated_data.pop('distances')
        competition = Competition.objects.create(**validated_data)
        for distance in distances_data:
            Distance.objects.create(competition=competition, **distance)
        return competition
