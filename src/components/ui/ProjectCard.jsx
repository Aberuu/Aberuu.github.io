import { ArrowUpRight } from 'lucide-react';

function ProjectCard({ project }) {
  return (
    <a href={`#${project.id}`} className="work-card group block">
      <div className="relative overflow-hidden bg-ink/5 aspect-[4/3]">
        <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500"></div>
        <div className="absolute top-4 left-4 text-xs uppercase tracking-widest text-paper bg-ink/70 backdrop-blur-sm px-2.5 py-1">{project.cat}</div>
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-paper text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-12 gap-4 items-start">
        <div className="col-span-8">
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-ink group-hover:text-violet transition-colors duration-300">{project.title}</h3>
          <p className="mt-2 text-sm text-ink/60 leading-relaxed">{project.desc}</p>
        </div>
        <div className="col-span-4 text-right">
          <div className="text-xs uppercase tracking-widest text-ink/60">{project.type}</div>
          <div className="text-xs uppercase tracking-widest text-ink/40 mt-1">{project.year}</div>
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
