from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]

# app_name = 'user'
#
# urlpatterns = [
#     path('create/', views.CreateUserView.as_view(), name='create'),
#     path('token/', views.CreateTokenView.as_view(), name='token'),
#     path('me/', views.ManageUserView.as_view(), name='me'),
# ]
