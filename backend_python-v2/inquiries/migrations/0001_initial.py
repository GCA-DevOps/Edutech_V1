# Generated by Django 3.2.25 on 2024-05-26 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inquiries',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('message', models.TextField(help_text='The content of the inquiry message.')),
                ('parentID', models.IntegerField()),
                ('schoolID', models.IntegerField()),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Resolved', 'Resolved'), ('Closed', 'Closed')], default='Pending', help_text='The current status of the inquiry.', max_length=10)),
                ('date', models.DateTimeField(auto_now_add=True, help_text='The date and time when the inquiry was submitted.')),
            ],
        ),
    ]