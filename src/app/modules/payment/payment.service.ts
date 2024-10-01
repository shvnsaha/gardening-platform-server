
import { User } from "../user/user.model";
import { verifyPayment } from "./payment.utils";




const confirmationService = async (tranId: string) => {


    try {
        const verifyResponse = await verifyPayment(tranId);

        let result;
        // let message = "";

        if (verifyResponse && verifyResponse.pay_status === "Successful") {
            const userId = "ooo";
            result = await User.findByIdAndUpdate(
                userId,
                { status: 'premium' },
                { new: true }
            );

            if (!result) {
                throw new Error("User not found");
            }

            // message = "User verified and payment successful!";
        } else {
            // message = "Payment Failed!";
        }

    } catch (error) {
        console.error("Error in confirmationService:", error);
        return "An error occurred during payment confirmation";
    }
}

export const paymentServices = {
    confirmationService
}