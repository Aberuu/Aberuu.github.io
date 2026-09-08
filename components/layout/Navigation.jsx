import NAV_ITEMS from '../../data/navigation';

function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAV_ITEMS.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-sm font-body font-medium text-ink/70 hover:text-ink hover-line transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;
