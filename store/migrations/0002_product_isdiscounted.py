# Generated by Django 5.1.1 on 2024-09-23 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='isDiscounted',
            field=models.BooleanField(default=False),
        ),
    ]
