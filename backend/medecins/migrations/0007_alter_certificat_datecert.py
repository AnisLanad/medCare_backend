# Generated by Django 4.1.3 on 2024-12-19 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medecins', '0006_rename_datecert_certificat_datecert_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certificat',
            name='Datecert',
            field=models.DateField(blank=True),
        ),
    ]
