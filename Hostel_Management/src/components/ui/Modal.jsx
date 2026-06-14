const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white p-6 rounded-lg w-[400px]">
        
        <button
          onClick={onClose}
          className="text-red-500 float-right"
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