from rest_framework.decorators import api_view #Decorador 
import requests
from .paypal_config import paypalrestsdk
import paypalrestsdk
from paypalrestsdk import Payment
from .models import Product, Category, Cart, PaymentMethod, Order
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, PaymentMethodSerializer, OrderSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.response import Response

@api_view(['POST'])
def process_payment(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    payment_method_id = request.data.get('payment_method_id')

    product = get_object_or_404(Product, id=product_id)
    payment_method = get_object_or_404(PaymentMethod, id=payment_method_id)

    pyg_price = int(product.price) * quantity

    try:
        # Fetch exchange rate for PYG to USD
        response = requests.get('https://v6.exchangerate-api.com/v6/7bf9fe8c252ed9adee0ae732/latest/PYG')
        exchange_rates = response.json()
        usd_rate = exchange_rates['rates']['USD']

        # Convert the amount from Guaraníes to USD
        amount_in_usd = round(float(pyg_price) / usd_rate, 2)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    # Credit Card Processing (Stripe)
    if payment_method.method_type == 'credit_card':
        payment = Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "type": "visa",  # or "mastercard", "amex", etc.
                        "number": payment_method.details['cardNumber'],
                        "expire_month": payment_method.details['expiry'].split('/')[0],
                        "expire_year": payment_method.details['expiry'].split('/')[1],
                        "cvv2": payment_method.details['cvv'],
                        "first_name": payment_method.details['cardHolder'].split()[0],
                        "last_name": payment_method.details['cardHolder'].split()[-1]
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": str(amount_in_usd),
                    "currency": "USD"
                },
                "description": f"Payment for {quantity} of {product.name}"
            }]
        })

        # Create the payment
        if payment.create():
            print("Payment created successfully")
            # Process the order and save it in the database, reducing the stock
            product.reduceStock(quantity)
            product.save()

            return JsonResponse({
                "message": "Payment successful",
                "paymentID": payment.id
            })
        else:
            print(payment.error)
            return JsonResponse({"error": "Payment creation failed"}, status=500)

    # PayPal Processing
    elif payment_method.method_type == 'paypal':
        try:
            # Create a PayPal order
            paypal_order = paypalrestsdk.Order({
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "USD",
                        "value": str(amount_in_usd)
                    }
                }]
            })

            if paypal_order.create():
                return JsonResponse({"paypalOrderID": paypal_order.id})
            else:
                return JsonResponse({"error": "PayPal order creation failed"}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    # Bank Transfer Processing
    elif payment_method.method_type == 'bank_transfer':
        # Simulate Bank Transfer logic
        # Here, you can save the order as pending and return instructions
        
        # Create the order with pending status
        order = Order.objects.create(
            product=product,
            quantity=quantity,
            payment_method=payment_method,
            total_price=pyg_price,
            bank_transfer_status=False  # Mark as pending
        )
        
        # Provide bank transfer instructions (You can customize this message)
        instructions = "Please transfer the amount to the following bank account:\n" \
                    "Bank Name: Example Bank\n" \
                    "Account Number: 1234567890\n" \
                    "Account Holder: Your Company Name\n" \
                    "Once the transfer is completed, please notify us."

        return JsonResponse({
            "message": "Bank Transfer initiated. Payment pending confirmation.",
            "instructions": instructions,
            "order_id": order.id  # Return the order ID for reference
        })

    # Reduce stock and complete order
    product.reduceStock(quantity)
    product.save()

    # Save the order record (uncomment this once ready)
    # Order.objects.create(user=request.user, product=product, quantity=quantity, payment_method=payment_method, total_price=pyg_price)

    return Response({'message': 'Payment successful'}, status=200)