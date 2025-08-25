import { useShopContext } from "../../contexts/ShopContext";
import Button from "../common/Button";
import Title from "../common/Title";

const CartTotal = ({ button, width }) => {

    const { delivery_fee, currency, loading, subTotal } = useShopContext();
    console.log(subTotal);
    console.log(loading)


    return (
        <div className={`p-5 w-full sm:w-1/2 ${width && `md:w-1/3`} rounded-xl bg-pink-100 sm:drop-shadow-sm sm:drop-shadow-black flex flex-col justify-center items-start gap-5`}>
            <Title text1={'CART'} text2={'TOTALS'} />
            <div className="w-full flex flex-col">
                <div className="w-full flex justify-between items-center py-1.5">
                    <div>Subtotal :</div>
                    <div>{`${currency} ${loading ? 0 : subTotal}.00`}</div>
                </div>
                <div className="w-full flex justify-between items-center py-1.5">
                    <div>Shipping Fee :</div>
                    <div>{currency + '' + delivery_fee + '.00'}</div>
                </div>
                <div className={`w-full flex justify-between items-center ${button && `border-b-2`} py-1.5`}>
                    <div className="font-bold">Total :</div>
                    <div className="font-bold">{`${currency} ${delivery_fee + subTotal}.00`}</div>
                </div>
            </div>
            {
                button && <Button navigateTo={'/place-order'} text={'checkout'} />
            }
        </div>
    )
}

export default CartTotal