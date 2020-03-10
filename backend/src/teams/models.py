from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Subquery
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from versatileimagefield.fields import VersatileImageField

from core.middleware import ThreadLocal
from core.utils import UpdateInfoBaseModel


class Team(UpdateInfoBaseModel):

    name = models.CharField(_('Team name'), max_length=255, help_text=_("Name of the Team"))
    description = models.TextField(_('description'), help_text=_("Description date of the Team"), null=True, blank=True)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        verbose_name=_('Team members'),
        related_name="teams", through='TeamMembership', through_fields=('team', 'user')
    )
    team_image = VersatileImageField(_('Team image'), upload_to="teams-images", blank=True, null=True)
    slug = models.SlugField(_('slug'), blank=True, unique=True)

    @property
    def get_active_members(self):
        return get_user_model().objects.filter(
            id__in=Subquery(self.team_memberships.filter(accepted=True).values('user__id'))
        )

    @property
    def get_team_admins(self):
        return get_user_model().objects.filter(
            id__in=Subquery(self.team_memberships.filter(is_admin=True).values('user__id'))
        )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Team')
        verbose_name_plural = _('Teams')


@receiver(pre_save, sender=Team)
def pre_save_team_receiver(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)


@receiver(post_save, sender=Team)
def create_team_membership(sender, instance, created, **kwargs):
    if created:
        TeamMembership.objects.create(team=instance, user=instance.create_by, accepted=True, is_admin=True)


class TeamMembership(models.Model):

    team = models.ForeignKey(
        Team,
        verbose_name=_('Team'),
        on_delete=models.CASCADE,
        related_name="team_memberships",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_('Member'),
        on_delete=models.CASCADE,
        related_name="team_memberships",
    )
    accepted = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    __original_accepted = None

    def __init__(self, *args, **kwargs):
        super(TeamMembership, self).__init__(*args, **kwargs)
        self.__original_accepted = self.accepted

    def clean(self):
        team_active_members = Team.objects.get(pk=self.team.pk).get_active_members
        current_user = ThreadLocal.get_current_user()

        if self.accepted != self.__original_accepted:
            if current_user not in team_active_members or not current_user.staff:
                raise ValidationError(_(f'To accept a new member of {self.team.name} you must be a member of it.'))

    class Meta:
        unique_together = ('team', 'user')
        verbose_name = _('Team Membership')
        verbose_name_plural = _('Team Memberships')
        ordering = ('team',)
