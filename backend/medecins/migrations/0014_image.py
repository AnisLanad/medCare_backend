# Generated by Django 4.1.3 on 2024-12-19 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medecins', '0013_laborantin_prenom'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Titre', models.TextField()),
                ('Image', models.TextField()),
            ],
        ),
    ]
