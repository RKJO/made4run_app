from django.db import models
from urllib.parse import urlparse

from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.db.models.signals import pre_save

from django.utils.timezone import now
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from .middlewares import ThreadLocal


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


def human_distance(km):
    """
    >>> human_distance(km=0.10000001)
    '100 m'
    >>> human_distance(km=0.4)
    '400 m'
    >>> human_distance(km=0.0366) # 40 Yard Dash
    '36.6 m'
    >>> human_distance(km=10.0000)
    '10 km'
    >>> human_distance(km=21.0975)
    '21.0975 km'
    >>> human_distance(km=42.1950)
    '42.195 km'
    """
    if km < 1:
        m = round(km * 1000, 1)
        if m == int(m):
            return "%i m" % m
        return "%.1f m" % m

    if km == int(km):
        return "%.0f km" % km

    # FIXME:
    txt = "%.4f" % km
    txt = txt.rstrip("0")
    return "%s km" % txt


def human_url(url):
    scheme, netloc, url, params, query, fragment = urlparse(url)
    text = netloc + url
    text = text.strip("/")
    if text.startswith("www."):
        text = text[4:]
    return text


class CompetitionModel(UpdateTimeBaseModel):
    """
    inherit and automatically set from UpdateTimeBaseModel:
     * createtime
     * lastupdatetime
    """
    no = models.PositiveIntegerField(help_text=_("Sequential number of the event"), null=True, blank=True)
    name = models.CharField(max_length=255, help_text=_("Name of the event"))
    start_date = models.DateField(help_text=_("Start date of the run"), null=True, blank=True)
    description = models.TextField(help_text=_("Description date of the run"), null=True, blank=True)
    url = models.URLField(help_text=_("Link URL"))
    text = models.CharField(
        max_length=127, help_text=_("Link text (leave empty to generate it from url)"), null=True, blank=True
    )
    slug = models.SlugField(blank=True, unique=True)

    def get_text(self):
        return self.text or human_url(self.url)

    def link_html(self):
        html = f'<a href="{self.url}" title="{self.get_text()}" target="_blank">{self.get_text()}</a>'
        return mark_safe(html)

    link_html.short_description = _("Link")

    def verbose_name(self):
        parts = [self.short_name()]
        if self.start_date:
            year = self.start_date.strftime("%Y")
            if year not in self.name:
                parts.append(year)
        result = " ".join([part for part in parts if part])
        return result

    verbose_name.short_description = _("Event Name")
    verbose_name.admin_order_field = "name"

    def short_name(self):
        parts = []
        if self.no:
            parts.append("%i." % self.no)
        parts.append(self.name)
        result = " ".join([part for part in parts if part])
        return result

    def save(self, *args, **kwargs):
        if self.text is None:
            self.text = human_url(self.url)

        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.verbose_name()

    class Meta:
        verbose_name = _("Competition")
        verbose_name_plural = _("Competition")
        ordering = ("-start_date", "-pk")


def pre_save_competition_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)


pre_save.connect(pre_save_competition_receiver, sender=CompetitionModel)


class DistanceModel(models.Model):
    name = models.CharField(max_length=255, help_text=_("Name of the distance"))
    distance_km = models.DecimalField(
        help_text=_("The ideal track length in kilometer."),
        unique=True,
        # store numbers up to 999 with a resolution of 4 decimal places
        max_digits=7,
        decimal_places=4,
    )
    ascent = models.SmallIntegerField(_('Ascent'), max_length=5, null=True, blank=True)
    descent = models.SmallIntegerField(_('Descent'), max_length=5, null=True, blank=True)
    ITRA_points = models.SmallIntegerField(_('ITRA points'), max_length=1, null=True, blank=True)
    mountain_level = models.SmallIntegerField(_('Mountain level'), max_length=1, null=True, blank=True)
    competition = models.ForeignKey(CompetitionModel, related_name='distances', on_delete=models.CASCADE)

    def model_callable(self):
        return self.competition.name

    def get_human_distance(self):
        return human_distance(self.distance_km)

    get_human_distance.short_description = _("Distance")
    get_human_distance.admin_order_field = "distance_km"

    def __str__(self):
        return self.get_human_distance()

    class Meta:
        verbose_name = _("Distance")
        verbose_name_plural = _("Distances")
        ordering = ("-distance_km",)
