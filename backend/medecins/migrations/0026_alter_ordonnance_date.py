# Generated by Django 4.1.3 on 2025-01-29 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medecins', '0025_ordonnance_date_ordonnance_valid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordonnance',
            name='Date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
