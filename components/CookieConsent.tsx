"use client"
import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 animate-in fade-in duration-300"
        onClick={handleDecline}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md border border-border bg-background p-6 shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-300 sm:m-6">
        <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          🍪 Cookies
        </div>
        <h3 className="mb-2 text-base font-semibold">We value your privacy</h3>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          We use cookies to enhance your browsing experience, serve personalised content, and analyse
          our traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 border border-border py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-accent"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-foreground py-3 text-sm font-medium uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-80"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;