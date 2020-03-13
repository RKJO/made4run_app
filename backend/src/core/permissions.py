from rest_framework import permissions
from django.utils.translation import gettext_lazy as _

"""
    Actions
     create, retrieve, update, partial_update, destroy, list
"""


class ActionBasedPermission(permissions.BasePermission):
    """
    Grant or deny access to a view, based on a mapping in view.action_permissions
    """
    def has_permission(self, request, view):
        for klass, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return klass().has_permission(request, view)
        return False


class IsTeamAdmin(permissions.BasePermission):
    message = _("Not a Team Administrator.")

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(request.user and request.user in obj.get_team_admins)
