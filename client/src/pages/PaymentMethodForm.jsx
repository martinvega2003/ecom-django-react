import React, { useState } from 'react'
import "../pages-styles/PaymentMethodForm.css"
import AddCardPaymentMethod from '../components/CardPaymentMethodForm'
import {AddPayPalMethod} from '../components/AddPayPalMethod'
import {AddBankTransferMethod} from '../components/AddBankTransferMethod'

export const AddPaymentMethod = () => {

  const [selectedMethod, setSelectedMethod] = useState(0)

  return (
    <div className='section payment-method-form-cont'>
      <div className="btns-cont">
        <button className={selectedMethod === 0 ? "active" : ""} onClick={() => setSelectedMethod(0)}>
          Tarjeta
        </button>
        <button className={selectedMethod === 1 ? "active" : ""} onClick={() => setSelectedMethod(1)}>
          PayPal
        </button>
        <button className={selectedMethod === 2 ? "active" : ""} onClick={() => setSelectedMethod(2)}>
          Transferencia
        </button>
      </div>
      <div className="form-cont">
        {
          selectedMethod === 0 ? (
            <AddCardPaymentMethod />
          ) : selectedMethod === 1 ? (
            <AddPayPalMethod />
          ) : <AddBankTransferMethod />
        } 
      </div>
    </div>
  )
}

export default AddPaymentMethod
