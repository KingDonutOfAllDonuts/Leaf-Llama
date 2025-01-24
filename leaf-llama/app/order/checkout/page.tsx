import CheckoutInfo from "@/components/CheckoutInfo";
import CheckoutNavbar from "@/components/Navbars/CheckoutNavbar";

const Checkout = () => {
  
  return (
    <div className="w-full relative flex flex-col">
      <CheckoutNavbar />
      <h1 className="w-full text-center text-5xl mt-20 p-10 font-kaushan bg-white">
        Checkout
      </h1>
      <CheckoutInfo />
    </div>
  );
};

export default Checkout;
