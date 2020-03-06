from django.contrib import admin

# Register your models here.
from events.models import TeamCompetitionEvent, TeamCompetitionParticipants, TeamWorkoutEvent, TeamWorkoutParticipants


class TeamCompetitionParticipantsAdmin(admin.TabularInline):
    model = TeamCompetitionParticipants


@admin.register(TeamCompetitionEvent)
class TeamCompetitionEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'competition', 'team', 'get_distances')
    inlines = [TeamCompetitionParticipantsAdmin]


class TeamWorkoutParticipantsAdmin(admin.TabularInline):
    model = TeamWorkoutParticipants


@admin.register(TeamWorkoutEvent)
class TeamWorkoutEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'start_time')
    inlines = [TeamWorkoutParticipantsAdmin]



'''
name
description
slug
start_date
start_time
ascent
descent
peace
'''