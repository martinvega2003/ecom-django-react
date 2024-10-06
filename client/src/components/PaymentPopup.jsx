import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components-styles/PaymentPopup.css"


const PaymentPopup = ({ finalPrice, setFinalPrice, product, quantity, selectedOption, onClose }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/store/payment-methods/payment-methods/');
                setPaymentMethods(response.data);
            } catch (error) {
                console.error('Error fetching payment methods', error);
            }
        };

        fetchPaymentMethods();
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        try {
            if (product.quantity < quantity) {
                alert("No hay suficientes productos en inventario")
                return;
            }
            await axios.post('http://127.0.0.1:8000/api/v1/store/process-payment/', {
                product_id: product.id,
                quantity,
                payment_method_id: selectedMethod,
            });
            await axios.post('http://127.0.0.1:8000/api/v1/store/create-order/', {
                product_id: product.id,
                amount: finalPrice,
                shipping_option: selectedOption,
            });
            alert('Payment successful!');
            setFinalPrice(0)
            onClose();
        } catch (error) {
            console.error('Payment failed', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-popup-overlay">
            <div className="payment-popup">
                <h2>Confirmar Pago</h2>
                <p>Producto: {product.name}</p>
                <p>Cantidad: {quantity}</p>
                <p>Total: Gs {finalPrice}</p>

                <div className="payment-methods">
                    <label>Seleccionar Metodo de Pago:</label>
                    <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)} required>
                        <option value="">-- Seleccionar --</option>
                        {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>{method.method_type}</option>
                        ))}
                    </select>
                </div>

                <div className="payment-buttons">
                    <button onClick={handlePayment} disabled={loading || !selectedMethod}>
                        {loading ? 'Procesando...' : 'Confirmar'}
                    </button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;
