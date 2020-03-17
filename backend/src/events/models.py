from django.db import models
from django.utils.translation import gettext_lazy as _

from core.utils import UpdateInfoBaseModel
from made4run_app import settings
from competition_calendar.models import Competition, Distance, human_distance
from teams.models import Team


class BaseEvent(UpdateInfoBaseModel):
    """
    Base model to automatically set:
        * create_time
        * last_update_time
    and:
        * create_by
        * last_update_by
    Important: "threadlocals middleware" must be used!
    """

    name = models.CharField(_('Name'), max_length=255, help_text=_("Name of the event"))
    description = models.TextField(_('description'), help_text=_("Description of the run"), null=True, blank=True)
    slug = models.SlugField(_('slug'), blank=True, unique=True)

    class Meta:
        abstract = True


class BaseWorkoutEvent(BaseEvent):
    distance_km = models.DecimalField(
        _('distance'),
        help_text=_("The ideal track length in kilometer."),
        unique=True,
        # store numbers up to 999 with a resolution of 4 decimal places
        max_digits=7,
        decimal_places=4,
    )
    ascent = models.SmallIntegerField(_('Ascent'), null=True, blank=True)
    descent = models.SmallIntegerField(_('Descent'), null=True, blank=True)
    peace = models.SmallIntegerField(_('planned peace'), help_text=_("average pace at which you plan to run."),
                                     blank=True, null=True)
    start_date = models.DateField(_('start date'), help_text=_("Start date of the Workout"))
    start_time = models.TimeField(_('start time'), auto_now=False, auto_now_add=False,)

    gpx = models.FileField(upload_to='uploads/%Y/%m/%d/', blank=True, null=True)
    private = models.BooleanField(_('private'), default=False)

    def get_human_distance(self):
        return human_distance(self.distance_km)

    class Meta:
        abstract = True

########################################################################################################################
#                                              Team Event
########################################################################################################################


class TeamCompetitionEvent(BaseEvent):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, through='TeamCompetitionParticipants')

    def get_distances(self):
        return list(self.competition.distances.all())


class TeamCompetitionParticipants(models.Model):
    team_event = models.ForeignKey(TeamCompetitionEvent, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    distance = models.ForeignKey(Distance, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'distance')
# TODO:
#   distances must be related wit competition


class TeamWorkoutEvent(BaseWorkoutEvent):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, through='TeamWorkoutParticipants')


class TeamWorkoutParticipants(models.Model):
    team_workout = models.ForeignKey(TeamWorkoutEvent, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

########################################################################################################################
#                                              User Event
########################################################################################################################


class UserWorkoutEvent(BaseWorkoutEvent):
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserWorkoutParticipants')


class UserWorkoutParticipants(models.Model):
    user_workout = models.ForeignKey(UserWorkoutEvent, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
