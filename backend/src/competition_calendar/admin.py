from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import (
    CompetitionModel,
    DistanceModel,
)


competition_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': (
            ('no', 'url'),
            'name',
            ('start_date', 'end_date',),
        ),
    }),
    (_("Other"), {
        'description': '',
        'classes': ('collapse',),
        'fields': (
            'description',
            ('text', 'slug'),
        ),
    }),
)


distance_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': (
            ("name", 'distance_km',),
        ),
    }),
    (_("Additional information's"), {
        'classes': ('collapse',),
        'fields': (
            ('ascent', 'descent', 'ITRA_points', 'mountain_level',),
        ),
    }),
)


class DistanceModelAdmin(admin.StackedInline):
    model = DistanceModel
    fieldsets = distance_fieldsets


@admin.register(CompetitionModel)
class CompetitionModelAdmin(admin.ModelAdmin):
    list_display = ("name", "link_html")
    list_filter = ("name",)
    date_hierarchy = "start_date"
    search_fields = ("url", "text", "title", "name")
    inlines = [DistanceModelAdmin]
    fieldsets = competition_fieldsets

# TODO:
#   look ad this:
#   - https://github.com/daniyalzade/django_reverse_admin
#   - https://stackoverflow.com/questions/52066617/foreignkey-fields-in-add-change-forms-django-admin
