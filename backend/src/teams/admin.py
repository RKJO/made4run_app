from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import Team, TeamMembership


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    pass


@admin.register(TeamMembership)
class TeamMembershipAdmin(admin.ModelAdmin):
    list_display = ("team", "user")
