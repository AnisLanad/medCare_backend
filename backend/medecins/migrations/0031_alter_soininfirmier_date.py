# Generated by Django 4.1.3 on 2025-01-30 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medecins', '0030_merge_20250130_0533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='soininfirmier',
            name='Date',
            field=models.DateField(),
        ),
    ]
