import { ArrowUpRight } from 'lucide-react';

function ArrowButton({ href, children }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-3 text-sm font-medium hover:bg-violet transition-colors duration-300"
    >
      {children}
      <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
    </a>
  );
}

export default ArrowButton;
