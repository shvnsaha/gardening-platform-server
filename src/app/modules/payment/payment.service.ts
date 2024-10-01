
import { verifyPayment } from "./payment.utils";




const confirmationService = async (tranId: string) => {

  
    const verifyResponse = await verifyPayment(tranId);
  

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
      
        
      

        // return `http://localhost:5173/payment-success/tranId=${tranId}`
        return `https://meeting-room-booking-system-client-steel.vercel.app/payment-success/tranId=${tranId}`
    }

}

export const paymentServices = {
    confirmationService
}