# Generated by Django 5.1.1 on 2024-10-09 13:41

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField()),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_number', models.PositiveIntegerField(unique=True)),
                ('product_name', models.CharField(max_length=255)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('shipping_option', models.CharField(max_length=10)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('bank_transfer_status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method_type', models.CharField(choices=[('credit_card', 'Credit Card'), ('paypal', 'PayPal'), ('bank_transfer', 'Bank Transfer')], max_length=20)),
                ('details', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('inventory', models.PositiveIntegerField(default=0)),
                ('price', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(10000000)])),
                ('gender', models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer'), ('Unisex', 'Unisex')], default='Unisex', max_length=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('isDiscounted', models.BooleanField(default=False)),
                ('discountPrice', models.PositiveIntegerField(null=True, validators=[django.core.validators.MaxValueValidator(10000000)])),
                ('size', models.JSONField(blank=True, default=list, verbose_name=models.FloatField())),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('addedDate', models.DateField(auto_now_add=True)),
                ('freeShipping', models.BooleanField(default=False)),
                ('slug', models.SlugField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='store.category')),
            ],
            options={
                'ordering': ('-addedDate',),
            },
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.product')),
            ],
            options={
                'unique_together': {('product',)},
            },
        ),
    ]
