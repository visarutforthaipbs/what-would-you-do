import React, { useState } from "react";
import IdeaCard from "./IdeaCard";
import { Idea, DigitalWalletPhase } from "../types";
import "../styles/IdeaGallery.css";

interface IdeaGalleryProps {
  ideas: Idea[];
  loading: boolean;
  error: string | null;
  sortOption: "newest" | "mostLiked";
  onSortChange: (option: "newest" | "mostLiked") => void;
  phaseFilter: number | "all";
  onPhaseFilterChange: (phase: number | "all") => void;
  phaseStatistics: { [key: number]: number };
  onRefresh: () => void;
  randomIdea: Idea | null;
  onRandomClick: () => void;
}

const IdeaGallery: React.FC<IdeaGalleryProps> = ({
  ideas,
  loading,
  error,
  sortOption,
  onSortChange,
  phaseFilter,
  onPhaseFilterChange,
  phaseStatistics,
  onRefresh,
  randomIdea,
  onRandomClick,
}) => {
  const [showRandomIdea, setShowRandomIdea] = useState(false);
  const [showPhaseStats, setShowPhaseStats] = useState(false);

  const handleRandomIdeaClick = () => {
    onRandomClick();
    setShowRandomIdea(true);
  };

  const handleCloseRandomIdea = () => {
    setShowRandomIdea(false);
  };

  const togglePhaseStats = () => {
    setShowPhaseStats(!showPhaseStats);
  };

  // Get the phase name for display
  const getPhaseDisplayName = (phase: number) => {
    switch (phase) {
      case DigitalWalletPhase.Phase1:
        return "เฟส 1: กลุ่มเปราะบาง";
      case DigitalWalletPhase.Phase2:
        return "เฟส 2: ผู้สูงอายุ";
      case DigitalWalletPhase.Phase3:
        return "เฟส 3: ประชาชนทั่วไป";
      case DigitalWalletPhase.Phase4:
        return "เฟส 4: ขยายผล";
      default:
        return "ไม่ระบุเฟส";
    }
  };

  // Calculate total ideas with phase information
  const totalIdeasWithPhase = Object.values(phaseStatistics).reduce(
    (a, b) => a + b,
    0
  );

  // Fun facts about 10,000 Baht in Thai
  const funFacts = [
    "10,000 บาท สามารถซื้อข้าวเหนียวมะม่วงได้ถึง 500 ชุด!",
    "10,000 บาท เที่ยวเกาะทะเลไทยได้สบายๆ แบบวีคเอนด์",
    "10,000 บาท กินอาหารริมทางได้ 100 มื้อ อร่อยจนน้ำหนักขึ้น",
    "10,000 บาท ดูหนังพร้อมป๊อปคอร์นและเครื่องดื่มได้ 40 รอบ",
    "10,000 บาท จ่ายค่าเช่าคอนโดหรือหอพักในกรุงเทพฯ ได้ประมาณ 1 เดือน",
    "10,000 บาท นั่งตุ๊กๆ เที่ยวทั่วกรุงเทพฯ ได้ถึง 200 เที่ยว",
    "10,000 บาท นวดสปาได้ถึง 50 ครั้ง ผ่อนคลายสุดๆ!",
    "10,000 บาท ซื้อผ้าไหมไทยคุณภาพดีได้ 25 ผืน สวยเว่อร์!",
  ];

  // Get a random fun fact
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div className="idea-gallery-container">
      <div className="gallery-header">
        <h2>ไอเดียทั้งหมด</h2>

        <div className="filter-options">
          <div className="sort-options">
            <span>เรียงตาม:</span>
            <button
              className={sortOption === "newest" ? "active" : ""}
              onClick={() => onSortChange("newest")}
            >
              ล่าสุด
            </button>
            <button
              className={sortOption === "mostLiked" ? "active" : ""}
              onClick={() => onSortChange("mostLiked")}
            >
              ยอดนิยม
            </button>
          </div>

          <div className="phase-filter">
            <span>เฟส:</span>
            <button
              className={phaseFilter === "all" ? "active" : ""}
              onClick={() => onPhaseFilterChange("all")}
            >
              ทั้งหมด
            </button>
            <button
              className={
                phaseFilter === DigitalWalletPhase.Phase1 ? "active" : ""
              }
              onClick={() => onPhaseFilterChange(DigitalWalletPhase.Phase1)}
            >
              เฟส 1
            </button>
            <button
              className={
                phaseFilter === DigitalWalletPhase.Phase2 ? "active" : ""
              }
              onClick={() => onPhaseFilterChange(DigitalWalletPhase.Phase2)}
            >
              เฟส 2
            </button>
            <button
              className={
                phaseFilter === DigitalWalletPhase.Phase3 ? "active" : ""
              }
              onClick={() => onPhaseFilterChange(DigitalWalletPhase.Phase3)}
            >
              เฟส 3
            </button>
            <button
              className={
                phaseFilter === DigitalWalletPhase.Phase4 ? "active" : ""
              }
              onClick={() => onPhaseFilterChange(DigitalWalletPhase.Phase4)}
            >
              เฟส 4
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="stats-button" onClick={togglePhaseStats}>
            ดูสถิติเฟส {showPhaseStats ? "▲" : "▼"}
          </button>
          <button
            className="random-idea-button"
            onClick={handleRandomIdeaClick}
          >
            สุ่มไอเดีย 🎲
          </button>
        </div>
      </div>

      {showPhaseStats && (
        <div className="phase-stats-container">
          <h3>สถิติไอเดียตามเฟส</h3>
          <div className="phase-stats-grid">
            {Object.entries(phaseStatistics).map(([phase, count]) => {
              const phaseNum = parseInt(phase);
              if (phaseNum === 0 && count === 0) return null; // Skip empty "no phase" category

              const percentage =
                totalIdeasWithPhase > 0
                  ? Math.round((count / totalIdeasWithPhase) * 100)
                  : 0;

              return (
                <div key={phase} className="phase-stat-item">
                  <div className="phase-stat-header">
                    <span className="phase-name">
                      {getPhaseDisplayName(phaseNum)}
                    </span>
                    <span className="phase-count">{count} ไอเดีย</span>
                  </div>
                  <div className="phase-stat-bar-container">
                    <div
                      className="phase-stat-bar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <span className="phase-percentage">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="fun-fact-box">
        <span className="fun-fact-title">รู้หรือไม่?</span>
        <p className="fun-fact-text">{randomFact}</p>
      </div>

      {showRandomIdea && randomIdea && (
        <div className="random-idea-container">
          <div className="random-idea-header">
            <h3>ไอเดียสุ่ม</h3>
            <button className="close-button" onClick={handleCloseRandomIdea}>
              ✕
            </button>
          </div>
          <IdeaCard idea={randomIdea} onLiked={onRefresh} />
        </div>
      )}

      {loading ? (
        <div className="loading-indicator">กำลังโหลดไอเดีย...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : ideas.length === 0 ? (
        <div className="no-ideas-message">
          <p>
            {phaseFilter === "all"
              ? "ยังไม่มีไอเดีย! เป็นคนแรกที่แชร์ไอเดียเจ๋งๆ กันเถอะ"
              : `ยังไม่มีไอเดียในเฟส ${phaseFilter}! แชร์ไอเดียแรกกันเถอะ`}
          </p>
        </div>
      ) : (
        <div className="ideas-grid">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} onLiked={onRefresh} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaGallery;
