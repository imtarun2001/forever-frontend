import { useSearchParams } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext"
import { verifyStripeHandler } from "../services/OrderApis";
import toast from "react-hot-toast";
import { useEffect } from "react";

const VerifyStripe = () => {

    const { navigate, setCartProducts } = useShopContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyStripe = async () => {
        try {
            const response = await verifyStripeHandler({ success, orderId });
            if (response.data.success) {
                setCartProducts([]);
                toast.success(response.data.message);
                navigate(`/orders/${response.data.data}`);
            } else {
                navigate(`/cart`);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyStripe();
    }, []);

    return (
        <div>VerifyStripe</div>
    )
}

export default VerifyStripe