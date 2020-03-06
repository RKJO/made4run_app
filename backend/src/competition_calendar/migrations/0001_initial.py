# Generated by Django 3.0.3 on 2020-03-06 15:22

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompetitionModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_time', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Create time')),
                ('last_update_time', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Time of the last change.')),
                ('no', models.PositiveIntegerField(blank=True, help_text='Sequential number of the event', null=True, verbose_name='No.')),
                ('name', models.CharField(help_text='Name of the event', max_length=255, verbose_name='Name')),
                ('location', models.CharField(help_text='Location of the event', max_length=255, verbose_name='Location')),
                ('start_date', models.DateField(help_text='Start date of the Event', verbose_name='start date')),
                ('end_date', models.DateField(blank=True, help_text='End date of the Event', null=True, verbose_name='end date')),
                ('description', models.TextField(blank=True, help_text='Description date of the run', null=True, verbose_name='description')),
                ('url', models.URLField(help_text='Link URL', verbose_name='url')),
                ('text', models.CharField(blank=True, help_text='Link text (leave empty to generate it from url)', max_length=127, null=True, verbose_name='text url')),
                ('slug', models.SlugField(blank=True, unique=True, verbose_name='slug')),
            ],
            options={
                'verbose_name': 'Competition',
                'verbose_name_plural': 'Competition',
                'ordering': ('-start_date', '-pk'),
            },
        ),
        migrations.CreateModel(
            name='DistanceModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of the distance', max_length=255, verbose_name='Name')),
                ('distance_km', models.DecimalField(decimal_places=4, help_text='The ideal track length in kilometer.', max_digits=7, unique=True, verbose_name='distance')),
                ('ascent', models.SmallIntegerField(blank=True, max_length=5, null=True, verbose_name='Ascent')),
                ('descent', models.SmallIntegerField(blank=True, max_length=5, null=True, verbose_name='Descent')),
                ('ITRA_points', models.SmallIntegerField(blank=True, max_length=1, null=True, verbose_name='ITRA points')),
                ('mountain_level', models.SmallIntegerField(blank=True, max_length=1, null=True, verbose_name='Mountain level')),
                ('competition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='distances', to='competition_calendar.CompetitionModel')),
            ],
            options={
                'verbose_name': 'Distance',
                'verbose_name_plural': 'Distances',
                'ordering': ('-distance_km',),
            },
        ),
    ]
