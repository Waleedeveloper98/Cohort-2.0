import React, { useEffect } from "react";
import { Plus, Minus, DeleteIcon } from "lucide-react";
import { useCart } from "../hook/useCart";
import { useSelector } from "react-redux";

const Cart = () => {
  const {
    handleGetCart,
    handleIncrementQuantityInCart,
    handleDecrementQuantityInCart,
    handleDeleteCartItem,
  } = useCart();
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    handleGetCart();
  }, []);

  const handleDecrement = (item) => {
    if (item?.quantity <= 1) {
      handleDeleteCartItem({
        productId: item.product._id,
        variantId:
          typeof item.variant === "string" ? item.variant : item.variant?._id,
      });
      return;
    } else {
      handleDecrementQuantityInCart({
        productId: item.product._id,
        variantId:
          typeof item.variant === "string" ? item.variant : item.variant?._id,
      });
    }
  };

  // Calculate totals
  const subtotalAmount = (items || []).reduce((acc, item) => {
    return acc + Number(item?.price?.amount || 0) * (item?.quantity || 1);
  }, 0);

  const currencySymbol = items?.[0]?.price?.currency || "$";
  const formattedSubtotal = `${currencySymbol}${subtotalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 font-sans text-[#161d1e]">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-[#161d1e] mb-2">
            Vogue Noir
          </h1>
          <p className="font-sans text-[#57423a] tracking-widest uppercase text-[10px]">
            Your Selection
          </p>
        </header>

        <div className="lg:flex lg:gap-16 items-start">
          {/* Cart Items List */}
          <div className="flex-1 space-y-12 mb-20 lg:mb-0">
            {!items || items.length === 0 ? (
              <div className="text-center py-12 bg-white/50 rounded-2xl border border-[#dec0b5]/10">
                <h2 className="font-sans text-xl font-medium tracking-tight text-[#57423a]">
                  Your cart is completely empty.
                </h2>
              </div>
            ) : (
              items.map((item, idx) => {
                const product = item?.product;
                if (!product) return null;

                // Find the specific variant
                const variantId =
                  typeof item.variant === "string"
                    ? item.variant
                    : item.variant?._id;
                const isBaseProduct = product._id === variantId;

                let selectedVariant = null;
                if (!isBaseProduct && product.variants?.length > 0) {
                  selectedVariant = product.variants.find(
                    (v) => v._id === variantId,
                  );
                }

                const title = product.title || "Unknown Product";
                const image =
                  selectedVariant?.images?.[0]?.url ||
                  product.images?.[0]?.url ||
                  "https://placehold.co/400x500/e8eff0/161d1e?text=No+Image";
                const price = item.price ||
                  product.price || { currency: "$", amount: 0 };

                // Format attributes
                let attributesString = "";
                if (selectedVariant?.attributes) {
                  const attrs = selectedVariant.attributes;
                  if (typeof attrs === "object") {
                    attributesString = Object.values(attrs).join(" | ");
                  }
                }

                return (
                  <div
                    key={item._id || idx}
                    className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 pb-8 group border-b border-[#dec0b5]/10 last:border-0 last:pb-0"
                  >
                    <div className="w-24 h-32 md:w-32 md:h-40 overflow-hidden bg-[#e8eff0] flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={image}
                        alt={title}
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="font-sans text-lg md:text-xl font-medium tracking-tight text-[#161d1e]">
                        {title}
                      </h2>
                      {attributesString && (
                        <p className="font-sans text-sm text-[#57423a] mt-1">
                          {attributesString}
                        </p>
                      )}
                      <p className="font-sans text-[#c05621] font-semibold mt-4 tracking-wider">
                        {price.currency}
                        {Number(price.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 bg-[#eef5f6] px-4 py-2 rounded-xl mt-4 sm:mt-0">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="text-[#c05621] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-sans font-bold text-[#161d1e] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrementQuantityInCart({
                            productId: item.product._id,
                            variantId:
                              typeof item.variant === "string"
                                ? item.variant
                                : item.variant?._id,
                          })
                        }
                        className="text-[#c05621] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
                      >
                        <Plus size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCartItem({
                            productId: item.product._id,
                            variantId:
                              typeof item.variant === "string"
                                ? item.variant
                                : item.variant?._id,
                          })
                        }
                        className="absolute top-1 right-1 cursor-pointer bg-red-500 px-2 py-1 rounded"
                      >
                        <DeleteIcon size={18} className="text-white"/>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Total Section */}
          {items && items.length > 0 && (
            <section className="lg:w-[400px] xl:w-[450px] lg:sticky lg:top-32 lg:mt-0 pt-12 lg:pt-0 border-t lg:border-t-0 border-[#dec0b5]/10 mt-12 lg:bg-white/50 lg:p-8 lg:rounded-3xl lg:border lg:shadow-[0_8px_30px_rgb(22,29,30,0.04)]">
              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[#57423a]">Subtotal</span>
                  <span className="font-sans font-medium text-[#161d1e]">
                    {formattedSubtotal}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[#57423a]">Shipping</span>
                  <span className="font-sans font-medium text-[#161d1e]">
                    Complimentary
                  </span>
                </div>
                <div className="pt-6 mt-4 flex justify-between items-end">
                  <span className="font-sans text-2xl font-bold tracking-tight">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="font-sans text-3xl font-extrabold text-[#c05621] tracking-wider">
                      {formattedSubtotal}
                    </p>
                    <p className="font-sans text-[10px] text-[#57423a] uppercase tracking-widest mt-1">
                      Includes duties & taxes
                    </p>
                  </div>
                </div>
                <div className="pt-10">
                  <button className="w-full py-5 bg-[#c05621] text-[#ffffff] font-sans font-bold uppercase tracking-[0.2em] text-sm rounded-xl transition-all hover:bg-[#c05621]/90 hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#c05621]/20">
                    Checkout
                  </button>
                </div>
                <div className="flex justify-center gap-6 pt-8 grayscale opacity-40">
                  <span className="material-symbols-outlined">credit_card</span>
                  <span className="material-symbols-outlined">
                    account_balance_wallet
                  </span>
                  <span className="material-symbols-outlined">
                    shield_with_heart
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
