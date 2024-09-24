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
    path("products/search/", views.search, name="Busqueda"),
    path('products/<int:category_id>/', views.ProductsByCategoryView.as_view(), name='products-by-category'),
    path('products/new/<int:category_id>/', views.RecentProductsByCategoryView.as_view(), name='recent-products-by-category'),
    path("products/<slug:category_slug>/<slug:product_slug>/", views.ProductDetail.as_view(), name="product_detail"), #slug es un tipo de dato.
    path("categories/<slug:category_slug>/", views.CategoryView.as_view(), name="category_view"),
]
