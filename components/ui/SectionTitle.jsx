function SectionTitle({ number, title }) {
  return (
    <div className="text-xs md:text-sm uppercase tracking-widest text-ink/60">
      {number} — {title}
    </div>
  );
}

export default SectionTitle;
