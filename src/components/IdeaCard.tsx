import React, { useState } from "react";
import { Idea, DigitalWalletPhase } from "../types";
import { likeIdea, reportIdea } from "../firebase/ideaService";
import "../styles/IdeaCard.css";

interface IdeaCardProps {
  idea: Idea;
  onLiked: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onLiked }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const cardId = `idea-card-${idea.id}`;

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      await likeIdea(idea.id);
      onLiked();
    } catch (err) {
      console.error("Error liking idea:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const toggleReportForm = () => {
    setIsReporting(!isReporting);
    if (!isReporting) {
      setReportReason("");
      setReportSubmitted(false);
    }
  };

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportReason.trim()) return;

    try {
      await reportIdea(idea.id, reportReason.trim());
      setReportSubmitted(true);

      // Close the report form after a delay
      setTimeout(() => {
        setIsReporting(false);
        setReportReason("");
      }, 2000);
    } catch (err) {
      console.error("Error reporting idea:", err);
    }
  };

  const formatDate = (date: Date) => {
    // Thai date format with Buddhist Era (BE) - add 543 to the year
    const thaiOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("th-TH", thaiOptions);
    return formatter.format(new Date(date));
  };

  // Get phase name based on phase number
  const getPhaseDisplayText = (phase?: number) => {
    if (phase === undefined) return null;

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
        return null;
    }
  };

  return (
    <div className="idea-card" id={cardId}>
      <div className="idea-content">
        <p className="idea-text">{idea.text}</p>
        <div className="idea-meta">
          <span className="idea-date">{formatDate(idea.timestamp)}</span>
          {idea.phase && (
            <span className="idea-phase">
              {getPhaseDisplayText(idea.phase)}
            </span>
          )}
        </div>
      </div>

      <div className="idea-actions">
        <button
          className={`like-button ${isLiking ? "liking" : ""}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          <span className="like-icon">❤️</span>
          <span className="like-count">{idea.likes}</span>
        </button>

        {/* Facebook share button temporarily hidden */}

        <button
          className={`report-button ${isReporting ? "reporting" : ""}`}
          onClick={toggleReportForm}
        >
          <span className="report-icon">🚩</span>
          <span>รายงาน</span>
        </button>
      </div>

      {isReporting && (
        <div className="report-form-container">
          {reportSubmitted ? (
            <div className="report-confirmation">ขอบคุณสำหรับการรายงาน!</div>
          ) : (
            <form className="report-form" onSubmit={handleReport}>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="ทำไมคุณถึงรายงานไอเดียนี้?"
                rows={2}
                maxLength={200}
              />
              <div className="report-form-footer">
                <button type="button" onClick={toggleReportForm}>
                  ยกเลิก
                </button>
                <button type="submit" disabled={!reportReason.trim()}>
                  ส่ง
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default IdeaCard;
