# Generated by Django 4.1.3 on 2025-01-05 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medecins', '0024_alter_bilan_rapport'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordonnance',
            name='Date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='Valid',
            field=models.BooleanField(default=False),
        ),
    ]
