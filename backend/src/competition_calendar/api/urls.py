from django.urls import path

from .views import (
    CompetitionLinkModelListView,
    CompetitionLinkModelListViewDetailView,
)

urlpatterns = [
    path('', CompetitionLinkModelListView.as_view()),
    path('<pk>', CompetitionLinkModelListViewDetailView.as_view()),
]
