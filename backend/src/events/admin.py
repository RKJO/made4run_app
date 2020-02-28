from django.contrib import admin

# Register your models here.
from events.models import TeamCompetitionEvent, TeamEventParticipants


@admin.register(TeamCompetitionEvent)
class TeamEventAdmin(admin.ModelAdmin):
    pass


@admin.register(TeamEventParticipants)
class TeamEventParticipantsAdmin(admin.ModelAdmin):
    pass
