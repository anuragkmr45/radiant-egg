import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ConsultancyProject } from "@/types/content";

interface ConsultancyProjectRailProps {
  title: string;
  projects: readonly ConsultancyProject[];
}

export function ConsultancyProjectRail({
  title,
  projects,
}: ConsultancyProjectRailProps) {
  return (
    <section className="consultancy-projects">
      <h3 className="consultancy-projects__title">{title}</h3>
      <ul className="consultancy-projects__rail" role="list">
        {projects.map((project, index) => (
          <li
            className="consultancy-project-card"
            data-marketing-reveal=""
            key={`${project.client}-${project.title}`}
            style={marketingRevealStyle(index * 70)}
          >
            <div className="consultancy-project-card__head">
              <span className="consultancy-project-card__icon">
                <HomeIcon name={project.icon} size={20} />
              </span>
              <h4 className="consultancy-project-card__title">{project.title}</h4>
            </div>
            <p className="consultancy-project-card__client">{project.client}</p>
            <p className="consultancy-project-card__description">{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
