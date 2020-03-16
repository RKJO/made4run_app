from django.db import models
from urllib.parse import urlparse

from django.db.models.signals import pre_save
from django.utils.text import slugify
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from core.utils import UpdateTimeBaseModel, UpdateInfoBaseModel


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


class Competition(UpdateInfoBaseModel):
    """
    inherit and automatically set from UpdateTimeBaseModel:
     * createtime
     * lastupdatetime
    """
    no = models.PositiveIntegerField(_('No.'), help_text=_("Sequential number of the event"), null=True, blank=True)
    name = models.CharField(_('Name'), max_length=255, help_text=_("Name of the event"))
    location = models.CharField(_('Location'), max_length=255, help_text=_("Location of the event"))
    start_date = models.DateField(_('start date'), help_text=_("Start date of the Event"))
    end_date = models.DateField(_('end date'), help_text=_("End date of the Event"), null=True, blank=True)
    description = models.TextField(_('description'), help_text=_("Description date of the run"), null=True, blank=True)
    url = models.URLField(_('url'), help_text=_("Link URL"))
    text = models.CharField(_('text url'), max_length=127, help_text=_("Link text (leave empty to generate it from url)"),
                            null=True, blank=True)
    slug = models.SlugField(_('slug'), blank=True, unique=True)

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
        instance.slug = slugify(f'{instance.name}-{instance.start_date.strftime("%Y")}',)


pre_save.connect(pre_save_competition_receiver, sender=Competition)


class Distance(models.Model):
    name = models.CharField(_('Name'), max_length=255, help_text=_("Name of the distance"))
    distance_km = models.DecimalField(
        _('distance'),
        help_text=_("The ideal track length in kilometer."),
        # store numbers up to 999 with a resolution of 4 decimal places
        max_digits=7,
        decimal_places=4,
    )
    ascent = models.SmallIntegerField(_('Ascent'), null=True, blank=True)
    descent = models.SmallIntegerField(_('Descent'), null=True, blank=True)
    ITRA_points = models.SmallIntegerField(_('ITRA points'), null=True, blank=True)
    mountain_level = models.SmallIntegerField(_('Mountain level'), null=True, blank=True)
    competition = models.ForeignKey(Competition, related_name='distances', on_delete=models.CASCADE)
    #
    # def model_callable(self):
    #     return self.competition.name

    def get_human_distance(self):
        return human_distance(self.distance_km)

    get_human_distance.short_description = _("Distance")
    get_human_distance.admin_order_field = "distance_km"

    def __str__(self):
        return self.get_human_distance()

    class Meta:
        unique_together = ('distance_km', 'competition')
        verbose_name = _("Distance")
        verbose_name_plural = _("Distances")
        ordering = ("-distance_km",)
