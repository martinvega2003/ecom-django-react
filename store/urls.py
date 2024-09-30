from django.urls import path, re_path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from . import views

productsRouter = DefaultRouter()
categoriesRouter = DefaultRouter()
paymentMethodsRouter = DefaultRouter()
productsRouter.register(r'products', views.ProductViewSet)
categoriesRouter.register(r'categories', views.CategoryViewSet)
paymentMethodsRouter.register(r'payment-methods', views.PaymentMethodViewSet)

urlpatterns = [
    #path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('user/', views.UserView.as_view(), name='user'),  # Endpoint to get user data
    #re_path('login/', views.login, name='login'),
    #re_path('logout/', views.logout, name='logout'),
    #re_path('register/', views.register, name='register'),
    #re_path('profile/', views.profile, name='profile'),
    #path('signup/', views.SignupView.as_view(), name='signup'),
    #path('login/', views.LoginView.as_view(), name='login'),
    path('products/', include(productsRouter.urls)),
    path('categories/', include(categoriesRouter.urls)),
    path("payment-methods/", include(paymentMethodsRouter.urls)),
    path("products/search/", views.search, name="Busqueda"),
    path('cart/', views.CartListView.as_view(), name='cart-list'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('products/<int:category_id>/', views.ProductsByCategoryView.as_view(), name='products-by-category'),
    path('products/new/<int:category_id>/', views.RecentProductsByCategoryView.as_view(), name='recent-products-by-category'),
    path("products/<slug:category_slug>/<slug:product_slug>/", views.ProductDetail.as_view(), name="product_detail"), #slug es un tipo de dato.
    path("categories/<slug:category_slug>/", views.CategoryView.as_view(), name="category_view"),
]
