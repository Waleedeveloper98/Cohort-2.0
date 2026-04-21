import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../service/product.api";
import { setSingleProduct } from "../state/product.slice";
import { useProduct } from "../hook/useProduct";
import { useCart } from "../../cart/hook/useCart";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleProduct = useSelector((state) => state.product.singleProduct);
  const loading = useSelector((state) => state.product.loading);
  const user = useSelector((state) => state.auth.user);
  const [activeImage, setActiveImage] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const { handleGetSingleProduct } = useProduct();
  const { handleAddToCart } = useCart();

  useEffect(() => {
    if (!singleProduct || singleProduct._id !== id) {
      handleGetSingleProduct({ id });
    }
  }, [dispatch, id, singleProduct]);

  useEffect(() => {
    if (singleProduct?.variants?.length > 0) {
      const initialVariant = singleProduct.variants[0];
      setSelectedVariant(initialVariant);
      setSelectedAttributes(initialVariant.attributes || {});
    }

    if (singleProduct?.images?.length) {
      setActiveImage(singleProduct.images[0].url || singleProduct.images[0]);
      setActiveImageIndex(0);
    }
  }, [singleProduct]);

  useEffect(() => {
    if (selectedVariant?.images?.length > 0) {
      setActiveImage(
        selectedVariant.images[0].url || selectedVariant.images[0],
      );
      setActiveImageIndex(0);
    }
  }, [selectedVariant]);

  // Extract all available attributes from variants (must be called before early returns)
  const variants = singleProduct?.variants || [];
  const availableAttributes = React.useMemo(() => {
    const attrs = {};
    variants.forEach((variant) => {
      Object.entries(variant.attributes || {}).forEach(([key, value]) => {
        if (!attrs[key]) attrs[key] = new Set();
        attrs[key].add(value);
      });
    });
    // Convert sets to arrays
    const result = {};
    for (const key in attrs) {
      result[key] = Array.from(attrs[key]);
    }
    return result;
  }, [variants]);

  const handleAttributeSelect = (key, value) => {
    const newSelectedAttributes = { ...selectedAttributes, [key]: value };

    // Find a variant that matches all newly selected attributes
    let matchingVariant = variants.find((v) => {
      return Object.entries(newSelectedAttributes).every(
        ([k, vValue]) => v.attributes?.[k] === vValue,
      );
    });

    // If the exact combination doesn't exist, fall back to the first variant
    // that at least matches the attribute the user just clicked
    if (!matchingVariant) {
      matchingVariant = variants.find((v) => v.attributes?.[key] === value);
    }

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      setSelectedAttributes(matchingVariant.attributes || {});
    } else {
      setSelectedAttributes(newSelectedAttributes);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
        <h2 className="text-2xl font-semibold">Loading product details...</h2>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
        <h2 className="text-2xl font-semibold">Product not found.</h2>
      </div>
    );
  }

  const { title = "", description = "" } = singleProduct;

  const basePrice = singleProduct.price || { currency: "", amount: 0 };
  const baseImages = singleProduct.images || [];

  const displayPrice = selectedVariant?.price || basePrice;
  const displayImages =
    selectedVariant?.images?.length > 0 ? selectedVariant.images : baseImages;

  const handleThumbnailClick = (imageUrl, index) => {
    setActiveImage(imageUrl.url || imageUrl);
    setActiveImageIndex(index);
  };

  const handlePreviousImage = () => {
    const newIndex =
      (activeImageIndex - 1 + displayImages.length) % displayImages.length;
    setActiveImage(displayImages[newIndex].url || displayImages[newIndex]);
    setActiveImageIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (activeImageIndex + 1) % displayImages.length;
    setActiveImage(displayImages[newIndex].url || displayImages[newIndex]);
    setActiveImageIndex(newIndex);
  };

  const handleBuyNow = async (variant) => {
    if (!user) {
      navigate("/login");
    }
    await handleAddToCart({
      productId: singleProduct._id,
      variantId: variant._id,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
              <img
                src={
                  activeImage ||
                  displayImages[0]?.url ||
                  displayImages[0] ||
                  "/api/placeholder/400/500"
                }
                alt={title}
                className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Navigation Arrows */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-800 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-800 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {displayImages.map((img, index) => {
                const imgUrl = img.url || img;
                return (
                  <button
                    key={img._id || index}
                    className={`flex-shrink-0 border-2 rounded-lg transition-all duration-300 ${
                      activeImage === imgUrl
                        ? "border-slate-900 shadow-lg scale-105"
                        : "border-slate-300 hover:border-slate-500 hover:shadow-md"
                    }`}
                    onClick={() => handleThumbnailClick(img, index)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${title} view ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3 leading-tight">
                    {title}
                  </h1>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-slate-600">
                      {displayPrice.currency}
                    </span>
                    <span className="text-4xl font-bold text-slate-900">
                      {Number(displayPrice.amount).toLocaleString()}
                    </span>
                  </div>
                  {/* Stock Info */}
                  {selectedVariant?.stock && (
                    <div className="text-sm font-medium text-slate-500 mt-2">
                      Stock available: {selectedVariant.stock}
                    </div>
                  )}
                </div>

                {/* Attributes Section */}
                {Object.keys(availableAttributes).length > 0 && (
                  <div className="space-y-4 py-4 border-t border-slate-200">
                    {Object.entries(availableAttributes).map(
                      ([key, values]) => (
                        <div key={key} className="space-y-2">
                          <span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            {key}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {values.map((value) => (
                              <button
                                key={value}
                                onClick={() =>
                                  handleAttributeSelect(key, value)
                                }
                                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                                  selectedAttributes[key] === value
                                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-900 hover:bg-slate-50"
                                }`}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleBuyNow(selectedVariant || singleProduct)}
                  className="w-full cursor-pointer bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4 px-6 rounded-xl text-base font-semibold uppercase tracking-wider hover:from-slate-800 hover:to-slate-700 transition-all duration-300 active:scale-[0.98] shadow-xl hover:shadow-2xl"
                >
                  Buy It Now
                </button>

                {/* Description */}
                {description && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    {description.split("\r\n\r\n").map((section, index) => {
                      const parts = section.split("\r\n");
                      const header = parts[0];
                      const bodyLines = parts.slice(1);

                      return (
                        <div key={index} className="space-y-2">
                          <h4 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                            {header}
                          </h4>
                          {bodyLines.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="text-slate-600 leading-relaxed text-sm"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
