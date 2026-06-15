const Card = ({ title, value, accent = "teal" }) => {
  const accentClass = {
    teal: "bg-teal-500",
    indigo: "bg-indigo-500",
    coral: "bg-rose-500",
  }[accent];

  return (
    <div className="group rounded-xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/70">
      <div className={`mb-5 h-1.5 w-12 rounded-full ${accentClass}`} />

      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </h3>

      <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
};

export default Card;
