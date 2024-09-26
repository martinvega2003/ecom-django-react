from django.contrib import admin
from .models import Product, Category, Size
from django import forms

class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set the sizes queryset to all sizes initially
        self.fields['sizes'].queryset = Size.objects.all()

class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ('name', 'price', 'product_type')

    class Media:
        js = ('js/toggle_sizes.js',)  # Include your JavaScript file

admin.site.register(Product, ProductAdmin)
admin.site.register(Size)
admin.site.register(Category)
