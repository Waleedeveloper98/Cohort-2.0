import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Edit3, Trash2, X } from "lucide-react";
import { useProduct } from "../hook/useProduct";

const SellerProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleProduct = useSelector((state) => state.product.singleProduct);
  const { handleGetSingleProduct, handleAddProductVariant } = useProduct();
  const [activeImage, setActiveImage] = useState("");

  // Variant States
  const [variants, setVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [variantForm, setVariantForm] = useState({
    price: "",
    stock: "",
    attributes: [{ key: "", value: "" }],
    images: [],
  });

  useEffect(() => {
    if (!singleProduct || singleProduct._id !== id) {
      handleGetSingleProduct({ id });
    }
  }, [dispatch, id, singleProduct, handleGetSingleProduct]);

  useEffect(() => {
    if (singleProduct?.images?.length) {
      setActiveImage(singleProduct.images[0].url);
    }
    // Also if API had variants, we would set them here, but for now we default to empty.
  }, [singleProduct]);

  const {
    title = "The Kinetic Structure 01",
    description = "A study in form and performance. Constructed from recycled polymers and artisan-grade leather...",
    price = { amount: 285.0, currency: "$" },
    images = [],
    _id = "EA-2024-081",
  } = singleProduct || {};

  const displayImage =
    activeImage ||
    (images.length > 0
      ? images[0].url
      : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80");

  // Variant Form Handlers
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariantForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (index, field, value) => {
    const updated = [...variantForm.attributes];
    updated[index][field] = value;
    setVariantForm((prev) => ({ ...prev, attributes: updated }));
  };

  const addAttribute = () => {
    setVariantForm((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { key: "", value: "" }],
    }));
  };

  const removeAttribute = (index) => {
    const updated = variantForm.attributes.filter((_, i) => i !== index);
    setVariantForm((prev) => ({ ...prev, attributes: updated }));
  };

  const handleVariantImages = (e) => {
    if (e.target.files) {
      const MAX_FILES = 5;
      const files = Array.from(e.target.files);
      const allowed = files.slice(0, MAX_FILES - variantForm.images.length);
      const mapped = allowed.map((file) => ({
        file: file,
        url: URL.createObjectURL(file),
      }));
      setVariantForm((prev) => ({
        ...prev,
        images: [...prev.images, ...mapped],
      }));
    }
  };

  const removeVariantImage = (id) => {
    setVariantForm((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  const saveVariant = async () => {
    // Transform the raw form state (array of objects) into the exact API Object format you requested
    const finalAttributesObject = variantForm.attributes.reduce((acc, curr) => {
      if (curr.key && curr.value) acc[curr.key] = curr.value;
      return acc;
    }, {});

    // This is merged into local state
    const newVar = {
      _id: Math.random().toString(36).substring(7),
      stock: variantForm.stock.toString(),
      price: {
        amount: variantForm.price || "0.00",
        currency: price?.currency || "$",
      },
      attributes: finalAttributesObject,
      images: variantForm.images,
    };

    // This is exclusively to show you the neat API payload
    const variantPayloadForAPI = {
      price: variantForm.price,
      stock: variantForm.stock,
      attributes: finalAttributesObject,
      images: variantForm.images,
    };
    await handleAddProductVariant({
      productId: id,
      variantData: variantPayloadForAPI,
    });

    setVariants((prev) => [...prev, newVar]);
    setIsAddingVariant(false);

    setVariantForm({
      price: "",
      stock: "",
      attributes: [{ key: "", value: "" }],
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F8F9] text-slate-900 font-sans pb-32">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* TOP SECTION: PRODUCT DETAILS */}
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] mb-24 items-start">
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="overflow-hidden bg-white w-full xl:max-w-3xl border border-slate-200">
              <img
                src={displayImage}
                alt={title}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86371c] mb-4">
                Gallery Assets
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <button
                      key={img._id || index}
                      onClick={() => setActiveImage(img.url)}
                      className={`flex-shrink-0 w-24 h-24 border cursor-pointer transition-all ${
                        activeImage === img.url
                          ? "border-slate-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
                          : "border-slate-300 hover:border-slate-500"
                      }`}
                    >
                      <img
                        src={img.url}
                        className="w-full h-full object-cover"
                        alt={`${title} ${index + 1}`}
                      />
                    </button>
                  ))
                ) : (
                  <div className="w-24 h-24 border border-slate-300">
                    <img
                      src={displayImage}
                      className="w-full h-full object-cover"
                      alt="Thumb fallback"
                    />
                  </div>
                )}

                <button className="flex-shrink-0 flex w-24 h-24 items-center justify-center border hover:bg-slate-200/50 border-dashed border-slate-300 bg-slate-100 text-slate-400 transition-colors cursor-pointer">
                  <Plus className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#86371c] mb-3">
              Inventory ID: {_id?.slice(-8).toUpperCase()}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              {title}
            </h1>
            <div className="flex items-baseline gap-1 text-[#C05621] mb-10">
              <span className="text-xl font-medium">
                {price?.currency || "$"}
              </span>
              <span className="text-4xl font-bold tracking-tight">
                {price?.amount || "0.00"}
              </span>
            </div>

            <div className="w-full h-px bg-slate-200 mb-10"></div>

            <p className="text-[14px] leading-relaxed text-slate-500 italic font-light whitespace-pre-wrap">
              "{description}"
            </p>
          </div>
        </section>

        {/* BOTTOM SECTION: VARIANTS */}
        <section>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Product Variants
              </h2>
              <p className="text-sm text-slate-500 font-light">
                Manage colorways, sizing, and stock levels for this SKU.
              </p>
            </div>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="inline-flex items-center gap-2 bg-[#C05621] px-5 py-2.5 text-sm font-semibold text-white rounded cursor-pointer transition-opacity hover:opacity-90 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add New Variant
              </button>
            )}
          </div>

          {/* Add Variant Form */}
          {isAddingVariant && (
            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 border border-[#C05621]/20 mb-8 border-t-4 border-t-[#C05621] animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  Configure New Variant
                </h3>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="p-2 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#86371c] mb-3">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 pb-1">
                      {price?.currency || "$"}
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={variantForm.price}
                      onChange={handleVariantChange}
                      placeholder="0.00"
                      className="w-full bg-transparent border-0 border-b-2 border-slate-200 py-2 pl-6 text-lg font-semibold text-slate-900 outline-none focus:border-[#C05621] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#86371c] mb-3">
                    Inventory Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={variantForm.stock}
                    onChange={handleVariantChange}
                    placeholder="e.g. 100"
                    className="w-full bg-transparent border-0 border-b-2 border-slate-200 py-2 text-lg font-semibold text-slate-900 outline-none focus:border-[#C05621] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#86371c] mb-4">
                  Attributes (Key/Value)
                </label>
                <div className="space-y-4">
                  {variantForm.attributes.map((attr, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <input
                        type="text"
                        value={attr.key}
                        onChange={(e) =>
                          handleAttributeChange(idx, "key", e.target.value)
                        }
                        placeholder="Key (e.g. Size, Color)"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#C05621] focus:ring-1 focus:ring-[#C05621]"
                      />
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) =>
                          handleAttributeChange(idx, "value", e.target.value)
                        }
                        placeholder="Value (e.g. L, Red)"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm outline-none focus:border-[#C05621] focus:ring-1 focus:ring-[#C05621]"
                      />
                      {variantForm.attributes.length > 1 && (
                        <button
                          onClick={() => removeAttribute(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addAttribute}
                  className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#C05621] hover:text-[#86371c] transition-colors cursor-pointer"
                >
                  + Add Another Attribute
                </button>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#86371c]">
                    Variant Images
                  </label>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400">
                    {variantForm.images.length} / 5 LIMIT
                  </span>
                </div>
                <div className="flex gap-4">
                  {variantForm.images.map((img) => (
                    <div
                      key={img._id}
                      className="relative w-24 h-24 border border-slate-200 rounded overflow-hidden"
                    >
                      <img
                        src={img.url}
                        alt="Variant upload"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeVariantImage(img.id)}
                        className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-rose-600 cursor-pointer shadow"
                      >
                        <X className="w-3 h-3" strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                  {variantForm.images.length < 5 && (
                    <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-slate-300 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 hover:text-slate-600 cursor-pointer">
                      <Plus className="w-6 h-6" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleVariantImages}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveVariant}
                  disabled={!variantForm.price || !variantForm.stock}
                  className="bg-[#C05621] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2.5 text-sm font-semibold text-white rounded cursor-pointer transition-opacity hover:opacity-90 shadow-sm"
                >
                  Save Variant Details
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          {!isAddingVariant && (
            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-100">
              {variants.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <span className="text-2xl opacity-50">👟</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    No variants available
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm">
                    This product currently has no specific variants configured.
                    Add a variant to specify pricing, inventory, and rich
                    gallery assets.
                  </p>
                </div>
              ) : (
                <>
                  {/* Table Header */}
                  <div className="grid grid-cols-5 items-center px-8 py-5 bg-[#F6F8F9]/50 border-b border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Media
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Attributes
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Pricing
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      Stock
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">
                      Actions
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-slate-100">
                    {variants.map((v, renderIndex) => (
                      <div
                        key={v._id || renderIndex}
                        className="grid grid-cols-5 items-center px-8 py-6 group hover:bg-slate-50 transition-colors"
                      >
                        {/* Media */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded border border-slate-200 overflow-hidden">
                            {v.images && v.images.length > 0 ? (
                              <img
                                src={v.images[0].url}
                                alt="Variant"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                                No Img
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Attributes */}
                        <div className="flex flex-wrap items-center gap-2">
                          {v.attributes &&
                            Object.entries(v.attributes).map(([key, value]) => (
                              <span
                                key={key}
                                className="bg-[#E4E9EC] text-slate-600 text-[10px] font-bold px-2 py-1 uppercase rounded-sm tracking-wider"
                              >
                                {key}: {value}
                              </span>
                            ))}
                        </div>

                        {/* Pricing */}
                        <div className="font-bold text-[#C05621] text-sm">
                          {v.price?.currency || "$"} {v.price?.amount || "0.00"}
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-4">
                          <div className="bg-[#E4E9EC] px-3 py-1.5 text-center text-xs font-bold text-slate-600 rounded-sm">
                            {v.stock} Unit{parseInt(v.stock) !== 1 && "s"}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 text-slate-400">
                          <button className="p-1 hover:text-slate-800 transition-colors cursor-pointer">
                            <Edit3
                              className="w-[18px] h-[18px]"
                              strokeWidth={2.5}
                            />
                          </button>
                          <button
                            className="p-1 hover:text-rose-600 transition-colors cursor-pointer"
                            onClick={() =>
                              setVariants((prev) =>
                                prev.filter((variant) => variant._id !== v._id),
                              )
                            }
                          >
                            <Trash2
                              className="w-[18px] h-[18px]"
                              strokeWidth={2.5}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-14 flex items-center justify-end gap-8">
            <button className="text-xs font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
              Discard Changes
            </button>
            <button className="bg-[#C05621] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white rounded cursor-pointer transition-opacity hover:opacity-90 shadow-md">
              Save Product Archive
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerProductDetails;
