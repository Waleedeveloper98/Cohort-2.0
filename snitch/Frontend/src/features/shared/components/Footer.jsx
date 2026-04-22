import React from "react";

const Footer = () => {
  return (
    <footer className="border-t h-fit border-slate-200 bg-[#FDFBF7] px-8 py-7 text-sm text-slate-500">
      <div className="mx-auto flex max-w-360 flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© 2026 The Digital Atelier. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-slate-400">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
