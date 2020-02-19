from django.contrib import admin

from .models import (
    CompetitionModel,
    DistanceModel,
)


@admin.register(CompetitionModel)
class CompetitionModelAdmin(admin.ModelAdmin):
    list_display = ("name", "link_html")
    list_filter = ("name",)
    date_hierarchy = "start_date"
    search_fields = ("url", "text", "title", "name")


@admin.register(DistanceModel)
class DistanceModelAdmin(admin.ModelAdmin):
    pass
