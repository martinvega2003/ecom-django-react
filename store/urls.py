from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

productsRouter = DefaultRouter()
categoriesRouter = DefaultRouter()
productsRouter.register(r'products', views.ProductViewSet)
categoriesRouter.register(r'categories', views.CategoryViewSet)

urlpatterns = [
    path('products/', include(productsRouter.urls)),
    path('categories/', include(categoriesRouter.urls)),
    path('productos/nuevo/<int:category_id>/', views.RecentProductsByCategoryView.as_view(), name='recent-products-by-category'),
    path("products/<slug:category_slug>/<slug:product_slug>/", views.ProductDetail.as_view()), #slug es un tipo de dato.
]
