import React from "react";
import Navigation from "../components/Navigation";
import IdeaCard from "../components/IdeaCard";
import { useTopIdeas } from "../hooks/useIdeas";
import "../styles/LeaderboardPage.css";

const LeaderboardPage: React.FC = () => {
  const { topIdeas, loading, error, refreshTopIdeas } = useTopIdeas(10);

  return (
    <div className="leaderboard-page">
      <Navigation />

      <div className="container">
        <div className="leaderboard-header">
          <h1>10 ไอเดียฮิตสุดๆ</h1>
          <p>ไอเดียสุดปังในการใช้เงิน 10,000 บาท</p>
        </div>

        {loading ? (
          <div className="loading-indicator">กำลังโหลดไอเดียยอดนิยม...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : topIdeas.length === 0 ? (
          <div className="no-ideas-message">
            <p>ยังไม่มีไอเดีย! เป็นคนแรกที่แชร์ไอเดียเจ๋งๆ กันเถอะ</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {topIdeas.map((idea, index) => (
              <div key={idea.id} className="leaderboard-item">
                <div className="rank">#{index + 1}</div>
                <div className="idea-card-container">
                  <IdeaCard idea={idea} onLiked={refreshTopIdeas} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
