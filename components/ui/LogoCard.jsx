function LogoCard({ label, handle }) {
  return (
    <div className="flex items-center gap-3 text-sm text-paper/50 group-hover:text-paper/80 transition-colors">
      <span>{label}</span>
      <span>{handle}</span>
    </div>
  );
}

export default LogoCard;
