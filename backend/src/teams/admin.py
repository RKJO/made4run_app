from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import Team, TeamMembership


team_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': (
            ('name', 'team_image', ),
            'description', 'slug'
            ),
    }),
)


team_membership_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': (
            ('user', 'accepted',),
        ),
    }),
)


class TeamMembershipAdmin(admin.TabularInline):
    model = TeamMembership
    fieldsets = team_membership_fieldsets


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("name", "active_members")
    list_filter = ("name",)
    search_fields = ("name",)
    inlines = [TeamMembershipAdmin]
    fieldsets = team_fieldsets

    def active_members(self, obj):
        return obj.get_active_members.count()
