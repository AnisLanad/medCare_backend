# Generated by Django 4.1.3 on 2024-12-18 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('DPI_ID', models.AutoField(primary_key=True, serialize=False)),
                ('Nom', models.CharField(max_length=100)),
                ('Prenom', models.CharField(max_length=100)),
                ('MotDePasse', models.CharField(max_length=100)),
                ('DateNaissance', models.DateField()),
                ('Adresse', models.CharField(max_length=100)),
                ('Telephone', models.CharField(max_length=15)),
                ('NSS', models.CharField(max_length=20)),
                ('Mutuelle', models.CharField(choices=[('CNAS', 'Cnas'), ('MTPS', 'Mtps'), ('MACE', 'Mace')], default='CNAS', max_length=5)),
                ('NumPerCont', models.CharField(max_length=15)),
                ('DateMaj', models.DateField(auto_now=True)),
            ],
        ),
    ]
