export default function Modal({ children, close }) {
  return (
    <div
      onClick={close}
      className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow p-6"
      >
        {children}
      </div>
    </div>
  )
}