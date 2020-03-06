from django.contrib import admin

# Register your models here.
from events.models import TeamCompetitionEvent, TeamCompetitionParticipants


@admin.register(TeamCompetitionEvent)
class TeamEventAdmin(admin.ModelAdmin):
    pass


@admin.register(TeamCompetitionParticipants)
class TeamEventParticipantsAdmin(admin.ModelAdmin):
    pass
