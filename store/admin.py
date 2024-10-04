from django.contrib import admin
from .models import Product, Category, Cart, PaymentMethod, Order
from django import forms

# Step 3: Create a custom form for Product in the admin panel
class ProductAdminForm(forms.ModelForm):
    SIZE_CHOICES = [(i/2, f'{i/2}') for i in range(8, 33)]  # 4 to 16 including .5 increments

    size = forms.MultipleChoiceField(
        choices=SIZE_CHOICES,
        widget=forms.CheckboxSelectMultiple,  # To allow multiple selections in the admin panel
        required=False
    )

    class Meta:
        model = Product
        fields = '__all__'

    def clean_size(self):
        sizes = self.cleaned_data['size']
        return [float(size) for size in sizes]  # Convert the sizes back to float before saving

# Step 4: Attach the custom form to the ProductAdmin
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm

admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(Category)
admin.site.register(PaymentMethod)
admin.site.register(Order)
