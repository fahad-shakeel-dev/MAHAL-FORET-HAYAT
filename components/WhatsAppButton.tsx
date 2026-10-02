export function WhatsAppButton() {
  // Set WHATSAPP_NUMBER to the business number, including its country code.
  const number = (process.env.WHATSAPP_NUMBER || "+923635518352").replace(/\D/g, "");
  const href = number
    ? `https://wa.me/${number}`
    : "/contact#quote";

  return (
    <a
      href={href}
      target={number ? "_blank" : undefined}
      rel={number ? "noopener noreferrer" : undefined}
      aria-label={number ? "Chat with us on WhatsApp (opens in a new tab)" : "Contact us — WhatsApp number coming soon"}
      title={number ? "Chat with us on WhatsApp" : "Contact us — WhatsApp number coming soon"}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128C7E] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] sm:h-16 sm:w-16"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.47 0 .11 5.35.11 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.58 0 11.94-5.35 11.94-11.93 0-3.19-1.24-6.18-3.48-8.43ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.46 4.45-9.91 9.88-9.91a9.83 9.83 0 0 1 7.02 2.91 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.88-9.92 9.88Zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.48.72.31 1.28.49 1.72.63.72.23 1.37.2 1.88.12.57-.09 1.77-.73 2.02-1.44.25-.71.25-1.32.18-1.44-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}
