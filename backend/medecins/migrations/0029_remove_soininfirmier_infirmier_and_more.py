# Generated by Django 4.1.3 on 2025-01-29 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medecins', '0028_pharmacist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='soininfirmier',
            name='Infirmier',
        ),
        migrations.RemoveField(
            model_name='soininfirmier',
            name='Patient',
        ),
        migrations.AddField(
            model_name='soininfirmier',
            name='InfirmierID',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='soininfirmier',
            name='PatientID',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
