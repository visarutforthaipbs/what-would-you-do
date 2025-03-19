import React, { useRef } from "react";
import Navigation from "../components/Navigation";
import IdeaForm from "../components/IdeaForm";
import IdeaGallery from "../components/IdeaGallery";
import { useIdeas } from "../hooks/useIdeas";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const {
    ideas,
    loading,
    error,
    sortOption,
    setSortOption,
    phaseFilter,
    setPhaseFilter,
    phaseStatistics,
    refreshIdeas,
    randomIdea,
    fetchRandomIdea,
  } = useIdeas();

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="home-page">
      <Navigation />

      <section className="welcome-section">
        <div className="welcome-content">
          <img
            src="/1000-logo-2.gif"
            alt="10,000 บาท"
            className="welcome-logo"
          />
          <button className="cta-button" onClick={scrollToForm}>
            ร่วมแชร์ไอเดีย
          </button>
        </div>
      </section>
      <div className="container">
        <div ref={formRef}>
          <IdeaForm onIdeaAdded={refreshIdeas} />
        </div>

        <IdeaGallery
          ideas={ideas}
          loading={loading}
          error={error}
          sortOption={sortOption}
          onSortChange={setSortOption}
          phaseFilter={phaseFilter}
          onPhaseFilterChange={setPhaseFilter}
          phaseStatistics={phaseStatistics}
          onRefresh={refreshIdeas}
          randomIdea={randomIdea}
          onRandomClick={fetchRandomIdea}
        />
      </div>
    </div>
  );
};

export default HomePage;
