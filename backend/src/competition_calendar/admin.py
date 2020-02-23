from django.contrib import admin

from .models import (
    CompetitionModel,
    DistanceModel,
)


class DistanceModelAdmin(admin.StackedInline):
    model = DistanceModel


@admin.register(CompetitionModel)
class CompetitionModelAdmin(admin.ModelAdmin):
    list_display = ("name", "link_html")
    list_filter = ("name",)
    date_hierarchy = "start_date"
    search_fields = ("url", "text", "title", "name")
    inlines = [DistanceModelAdmin]

# TODO:
#   Build Formsets
#   look ad this:
#   - https://github.com/daniyalzade/django_reverse_admin
#   - https://stackoverflow.com/questions/52066617/foreignkey-fields-in-add-change-forms-django-admin
