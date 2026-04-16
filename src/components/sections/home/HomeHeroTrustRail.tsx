import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { HomeCredentialItem, HomeStat } from "@/types/content";

interface HomeHeroTrustRailProps {
  credentials: readonly HomeCredentialItem[];
  stat: HomeStat;
  showStat?: boolean;
}

export function HomeHeroTrustRail({
  credentials,
  stat,
  showStat = true,
}: HomeHeroTrustRailProps) {
  const items = credentials.slice(0, 3);

  return (
    <div className="home-hero__trust-layer">
      <aside
        aria-label="RECPL trust indicators"
        className="home-hero__trust-rail motion-sequence"
        data-home-reveal=""
      >
        {showStat ? (
          <div className="home-hero__trust-stat">
            <span className="home-hero__trust-stat-label">Experience</span>
            <span className="home-hero__trust-stat-value">{stat.value}</span>
            <span className="home-hero__trust-stat-text">{stat.label}</span>
          </div>
        ) : null}

        <ul className="home-hero__trust-list" role="list">
          {items.map((item) => (
            <li className="home-hero__trust-item" key={item.label}>
              <span className="home-hero__trust-icon">
                <HomeIcon name={item.icon} size={18} />
              </span>
              <span className="home-hero__trust-copy">{item.label}</span>
            </li>
          ))}
        </ul>

        <p className="home-hero__trust-note">
          Certified inspection and audit support across critical industries.
        </p>
      </aside>
    </div>
  );
}
