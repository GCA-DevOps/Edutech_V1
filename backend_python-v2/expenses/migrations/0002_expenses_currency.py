# Generated by Django 4.2.13 on 2024-06-18 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expenses',
            name='currency',
            field=models.CharField(default='KES', max_length=10, verbose_name='Currency'),
        ),
    ]