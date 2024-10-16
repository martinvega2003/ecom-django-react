from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

productsRouter = DefaultRouter()
categoriesRouter = DefaultRouter()
paymentMethodsRouter = DefaultRouter()
productsRouter.register(r'products', views.ProductViewSet)
categoriesRouter.register(r'categories', views.CategoryViewSet)
paymentMethodsRouter.register(r'payment-methods', views.PaymentMethodViewSet)

urlpatterns = [

    #urls de productos:
    path('products/', include(productsRouter.urls)),
    path('products/<int:category_id>/', views.ProductsByCategoryView.as_view(), name='products-by-category'),
    path('products/new/<int:category_id>/', views.RecentProductsByCategoryView.as_view(), name='recent-products-by-category'),
    path("products/<slug:category_slug>/<slug:product_slug>/", views.ProductDetail.as_view(), name="product_detail"), #slug es un tipo de dato.

    #urls de categorias
    path('categories/', include(categoriesRouter.urls)),
    path("categories/<slug:category_slug>/", views.CategoryView.as_view(), name="category_view"),

    #urls para pagos:
    path("payment-methods/", include(paymentMethodsRouter.urls)),
    path("payment-methods/delete/<int:method_id>/", views.delete_payment_method, name="delete_payment_method"),
    path("process-payment/", views.process_payment, name="process_payment"),

    #urls para la busqueda:
    path("products/search/", views.search, name="Busqueda"),

    #urls para el carrito:
    path('cart/', views.CartListView.as_view(), name='cart-list'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/delete/<int:product_id>/', views.delete_from_cart, name='delete-from-cart'),

    #urls para las ordenes:
    path('orders/', views.get_orders, name='get-orders'),
    path('create-order/', views.create_order, name='create-order'),
]
