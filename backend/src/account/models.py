from typing import Set

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    Permission,
    PermissionsMixin,
)

from django.db import models
from django.db.models import Q, Value
from django.core.mail import send_mail
from django.utils.translation import ugettext_lazy as _

from versatileimagefield.fields import VersatileImageField


class UserManager(BaseUserManager):
    def create_user(
        self, email, password=None, is_staff=False, is_active=True, **extra_fields
    ):
        """Create a user instance with the given email and password."""
        email = UserManager.normalize_email(email)
        # Google OAuth2 backend send unnecessary username field
        extra_fields.pop("username", None)

        user = self.model(
            email=email, is_active=is_active, is_staff=is_staff, **extra_fields
        )
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(
            email, password, is_staff=True, is_superuser=True, **extra_fields
        )

    # def customers(self):
    #     return self.get_queryset().filter(
    #         Q(is_staff=False) | (Q(is_staff=True) & Q(orders__isnull=False))
    #     )

    def staff(self):
        return self.get_queryset().filter(is_staff=True)


class User(PermissionsMixin, AbstractBaseUser):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_active = models.BooleanField(_('active'), default=True)
    note = models.TextField(_('note'), null=True, blank=True)
    avatar = VersatileImageField(_('avatar'), upload_to="user-avatars", blank=True, null=True)
    # TODO:
    #   - https://django-versatileimagefield.readthedocs.io/en/latest/drf_integration.html#serialization

    USERNAME_FIELD = "email"

    objects = UserManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        if self.first_name or self.last_name:
            return ("%s %s" % (self.first_name, self.last_name)).strip()
        if self.default_billing_address:
            first_name = self.default_billing_address.first_name
            last_name = self.default_billing_address.last_name
            if first_name or last_name:
                return ("%s %s" % (first_name, last_name)).strip()
        return self.email

    def get_short_name(self):
        return self.email

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Sends an email to this User. """
        send_mail(subject, message, from_email, [self.email], **kwargs)
