const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[420px] rounded-xl border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/30">
        <button
          onClick={onClose}
          className="float-right rounded-md px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950"
        >
          Close
        </button>

        <div className="mt-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
