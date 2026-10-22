function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-[#f8fafc]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 text-center text-xs font-semibold tracking-widest text-slate-500 lg:flex-row">
        <p>© 2026 SHORTLINK. THE DIGITAL ARCHITECT.</p>

        <div className="flex flex-wrap justify-center gap-7">
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
          <span>API DOCUMENTATION</span>
          <span>SUPPORT</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
