from django.urls import path

from competition_calendar.api.views import (
    CompetitionListView,
    CompetitionDetailView,
)

urlpatterns = [
    path('', CompetitionListView.as_view()),
    path('<slug>', CompetitionDetailView.as_view()),
]
