from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.timezone import now

from core.middleware import ThreadLocal


class UpdateTimeBaseModel(models.Model):
    """
    Base model to automatically set:
     * createtime
     * lastupdatetime
    We doesn't used auto_now_add and auto_now here, because they have the odd side effect
    see also:
    https://github.com/jezdez/django-dbtemplates/commit/2f27327bebe7f2e7b33e5cfb0db517f53a1b9701#commitcomment-1396126
    """

    create_time = models.DateTimeField(default=now, editable=False, help_text="Create time")
    last_update_time = models.DateTimeField(default=now, editable=False, help_text="Time of the last change.")

    def __str__(self):  # to be overwritten
        return f"model instance ID:{self.pk}"

    def save(self, *args, **kwargs):
        self.last_update_time = now()
        return super().save(*args, **kwargs)

    class Meta:
        abstract = True


class UpdateUserBaseModel(models.Model):
    """
    Base model to automatically set:
     * createby
     * lastupdateby
    Important: "threadlocals middleware" must be used!
    """

    create_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        editable=False,
        related_name="%(class)s_create_by",
        null=True,
        blank=True,  # <- If the model used outside a real request (e.g. unittest, db shell)
        help_text="User how create this entry.",
        on_delete=models.SET_NULL,
    )
    last_update_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        editable=False,
        related_name="%(class)s_last_update_by",
        null=True,
        blank=True,  # <- If the model used outside a real request (e.g. unittest, db shell)
        help_text="User as last edit this entry.",
        on_delete=models.SET_NULL,
    )

    def __str__(self):  # to be overwritten
        return f"model instance ID:{self.pk}"

    def save(self, *args, **kwargs):
        current_user = ThreadLocal.get_current_user()

        if current_user:
            User = get_user_model()
            if isinstance(current_user, User):
                if self.pk is None or kwargs.get("force_insert", False):  # New model entry
                    self.create_by = current_user
                self.last_update_by = current_user

        return super().save(*args, **kwargs)

    class Meta:
        abstract = True


class UpdateInfoBaseModel(UpdateTimeBaseModel, UpdateUserBaseModel):
    """
    Base model to automatically set:
        * create_time
        * last_update_time
    and:
        * create_by
        * last_update_by
    Important: "threadlocals middleware" must be used!
    """

    class Meta:
        abstract = True
