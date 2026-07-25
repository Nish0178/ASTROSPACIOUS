import SpaceBg from "./Extra/Space-bg";
import "./css/base.css";
import "./css/Articles.css";

import { magazines } from "./data/magazines";
import MagazineCard from "./components/MagazineCard/MagazineCard";

export default function Magazine() {
  return (
    <main className="articles-page">
      <SpaceBg />

      <section className="articles-hero">
        <h1 className="gradient-text">MAGAZINES</h1>

        <p>
          Browse all Astrospacious digital magazines.
        </p>
      </section>

      <section className="articles-grid">
        {magazines.map((magazine) => (
          <MagazineCard
            key={magazine.id}
            magazine={magazine}
          />
        ))}
      </section>
    </main>
  );
}