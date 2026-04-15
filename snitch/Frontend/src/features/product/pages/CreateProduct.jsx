import React, { useState } from 'react';
import { useProduct } from '../hook/useProduct';

const CreateProduct = () => {
  const MAX_FILES = 5;
  const { handleCreateProduct } = useProduct();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    currency: 'PKR'
  });
  const [assets, setAssets] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (files) => {
    const allowedFiles = Array.from(files).slice(0, MAX_FILES - assets.length);
    const nextAssets = allowedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      file,
      url: URL.createObjectURL(file)
    }));
    setAssets((prev) => [...prev, ...nextAssets]);
  };

  const handleInputFiles = (event) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const removeAsset = (id) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = new FormData();
    payload.append('title', formData.productName);
    payload.append('description', formData.description);
    payload.append('amount', formData.price);
    payload.append('currency', formData.currency);

    assets.forEach((asset) => {
      if (asset.file) {
        payload.append('images', asset.file);
      }
    });

    try {
      await handleCreateProduct(payload);
      setFormData({ productName: '', description: '', price: '', currency: 'PKR' });
      setAssets([]);
    } catch (error) {
      console.error('Failed to submit product', error);
    }
  };

  const handleDiscard = () => {
    setFormData({ productName: '', description: '', price: '', currency: 'EUR' });
    setAssets([]);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('productDraft', JSON.stringify(formData));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <section className="flex-1 border-r border-rose-100/80 bg-white px-8 py-10 md:px-14 md:py-16 lg:px-20 lg:py-24">
          <div className="max-w-xl">
            <header className="mb-14">
              <h1 className="font-sans text-5xl font-black uppercase tracking-tight text-slate-950">
                Vogue Noir
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">
                Curating the digital atelier
              </p>
            </header>

            <form className="space-y-12" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs uppercase tracking-[0.35em] text-rose-600">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="e.g. THE NOIR OVERCOAT"
                  className="mt-4 w-full border-0 border-b border-rose-200 bg-transparent py-4 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.35em] text-rose-600">
                  Concept Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the silhouette, materiality, and soul of the piece..."
                  className="mt-4 w-full border-0 border-b border-rose-200 bg-transparent py-4 text-base text-slate-900 outline-none placeholder:text-slate-300 resize-none"
                />
              </div>

              <div className="flex flex-col gap-8 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-[0.35em] text-rose-600">
                    Valuation
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="mt-4 w-full border-0 border-b border-rose-200 bg-transparent py-4 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                  />
                </div>
                <div className="w-full max-w-[180px]">
                  <label className="block text-xs uppercase tracking-[0.35em] text-rose-600">
                    Currency
                  </label>
                  <div className="relative mt-4">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full appearance-none border-0 border-b border-rose-200 bg-transparent py-4 pr-8 text-lg font-semibold text-slate-900 outline-none"
                    >
                      <option>PKR</option>
                      <option>USD</option>
                      <option>GBP</option>
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-none bg-[#C05621] px-6 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:opacity-90"
                >
                  Create Product
                </button>

                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500 opacity-70">
                  <button type="button" onClick={handleSaveDraft} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                    <span>💾</span>
                    Save Draft
                  </button>
                  <button type="button" onClick={handleDiscard} className="flex items-center gap-2 text-rose-600 hover:text-rose-800">
                    <span>🗑</span>
                    Discard
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="flex-1 bg-[#FDFBF7] px-8 py-10 md:px-14 md:py-16 lg:px-20 lg:py-24">
          <div className="space-y-12">
            <div
              className={`group flex h-[320px] flex-col items-center justify-center gap-6 rounded-[20px] border-2 border-dashed transition ${
                dragActive ? 'border-rose-300 bg-rose-50/50' : 'border-rose-200 bg-white'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C05621]/10 text-2xl text-[#C05621]">
                ⬆
              </div>
              <div className="space-y-2 text-center">
                <p className="font-semibold uppercase tracking-[0.3em] text-slate-900">Editorial Media</p>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Drag and drop high-resolution assets</p>
              </div>
              <label className="inline-flex cursor-pointer rounded border border-[#C05621] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#C05621] transition hover:bg-[#C05621] hover:text-white">
                Select Files
                <input type="file" multiple accept="image/*" onChange={handleInputFiles} className="hidden" />
              </label>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#C05621] font-semibold">Uploaded Assets</p>
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400">{assets.length} items</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {assets.length > 0 ? (
                  assets.map((asset) => (
                    <div key={asset.id} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                      <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeAsset(asset.id)}
                        className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs text-rose-600 shadow-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-400">
                    Upload your first asset to preview it here.
                  </div>
                )}
                {assets.length < 5 && (
                  <div className="flex items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-8 text-3xl text-slate-300">
                    +
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pointer-events-none hidden xl:block">
            <p className="text-7xl font-black uppercase tracking-[0.5em] text-slate-200 opacity-20">
              Vogue Noir
            </p>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-200 bg-[#FDFBF7] px-8 py-7 text-sm text-slate-500">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2024 The Digital Atelier. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-slate-400">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateProduct;
