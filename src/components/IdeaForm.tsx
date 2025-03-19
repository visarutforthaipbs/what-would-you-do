import React, { useState } from "react";
import { addIdea } from "../firebase/ideaService";
import { DigitalWalletPhase } from "../types";
import "../styles/IdeaForm.css";

interface IdeaFormProps {
  onIdeaAdded: () => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onIdeaAdded }) => {
  const [ideaText, setIdeaText] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<number | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPhaseInfo, setShowPhaseInfo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!ideaText.trim()) {
      setError("กรุณาใส่ไอเดียก่อนกดส่งนะ");
      return;
    }

    if (ideaText.trim().length < 5) {
      setError("ไอเดียสั้นไปอ่ะ เพิ่มรายละเอียดอีกหน่อยสิ!");
      return;
    }

    if (selectedPhase === undefined) {
      setError("กรุณาเลือกเฟสของคุณด้วยนะ");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addIdea(ideaText.trim(), selectedPhase);
      setIdeaText("");
      setSelectedPhase(undefined);
      setShowConfirmation(true);
      onIdeaAdded();

      // Hide confirmation message after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting idea:", err);
      setError("แย่จัง ส่งไอเดียไม่สำเร็จ ลองอีกครั้งนะ!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePhaseInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPhaseInfo(!showPhaseInfo);
  };

  return (
    <div className="idea-form-container">
      <h2>คุณจะเอา 10,000 บาทไปทำอะไร?</h2>

      <form className="idea-form" onSubmit={handleSubmit}>
        <textarea
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value)}
          placeholder="ถ้ามี 10,000 บาท คุณจะเอาไปทำอะไรที่คูลสุดๆ?"
          rows={4}
          maxLength={280}
          disabled={isSubmitting}
        />

        <div className="phase-selection">
          <div className="phase-selection-header">
            <label htmlFor="phase-select">
              คุณอยู่เฟสไหนของการได้รับเงินดิจิตอล
            </label>
            <button
              type="button"
              className="info-button"
              onClick={togglePhaseInfo}
              aria-label="ข้อมูลเพิ่มเติมเกี่ยวกับเฟสดิจิทัลวอลเล็ต"
            >
              ?
            </button>
          </div>
          <select
            id="phase-select"
            value={selectedPhase || ""}
            onChange={(e) =>
              setSelectedPhase(Number(e.target.value) || undefined)
            }
            disabled={isSubmitting}
          >
            <option value="">-- เลือกเฟสของคุณ --</option>
            <option value={DigitalWalletPhase.Phase1}>
              เฟส 1: กลุ่มเปราะบาง (ผู้ถือบัตรสวัสดิการแห่งรัฐและผู้พิการ)
            </option>
            <option value={DigitalWalletPhase.Phase2}>
              เฟส 2: ผู้สูงอายุ (60 ปีขึ้นไป)
            </option>
            <option value={DigitalWalletPhase.Phase3}>
              เฟส 3: ประชาชนทั่วไป (ผ่านระบบดิจิทัลเต็มรูปแบบ)
            </option>
            <option value={DigitalWalletPhase.Phase4}>
              เฟส 4: การขยายผลและปรับปรุงระบบ
            </option>
          </select>
        </div>

        {showPhaseInfo && (
          <div className="phase-info-modal">
            <div className="phase-info-content">
              <button
                type="button"
                className="close-button"
                onClick={togglePhaseInfo}
                aria-label="ปิด"
              >
                ×
              </button>
              <h3>โครงการ "ดิจิทัลวอลเล็ต 10,000 บาท"</h3>
              <p>โครงการนี้มีการแบ่งออกเป็น 4 เฟสตามข้อมูลล่าสุด ดังนี้:</p>

              <div className="phase-info-box">
                <h4>
                  เฟส 1: กลุ่มเปราะบาง (ผู้ถือบัตรสวัสดิการแห่งรัฐและผู้พิการ)
                </h4>
                <ul>
                  <li>
                    <strong>กลุ่มเป้าหมาย:</strong>{" "}
                    ผู้ถือบัตรสวัสดิการแห่งรัฐและผู้พิการ รวมประมาณ 14.5 ล้านคน
                  </li>
                  <li>
                    <strong>เริ่มแจกเงิน:</strong> 25 กันยายน 2567
                  </li>
                  <li>
                    <strong>รายละเอียด:</strong> จ่ายเงินสดให้กลุ่มเปราะบาง
                    เพื่อให้เข้าถึงได้ง่าย ใช้จ่ายได้ในร้านค้าที่เข้าร่วมโครงการ
                    ภายในเขตอำเภอตามทะเบียนบ้าน
                  </li>
                </ul>
              </div>

              <div className="phase-info-box">
                <h4>เฟส 2: ผู้สูงอายุ (60 ปีขึ้นไป)</h4>
                <ul>
                  <li>
                    <strong>กลุ่มเป้าหมาย:</strong> ผู้สูงอายุที่มีอายุ 60
                    ปีขึ้นไป ที่ลงทะเบียนสำเร็จผ่านแอป "ทางรัฐ"
                    (ไม่ซ้ำกับกลุ่มเฟส 1) ประมาณ 3.2-4 ล้านคน
                  </li>
                  <li>
                    <strong>เริ่มจ่ายเงิน:</strong> มกราคม 2568 (ก่อนตรุษจีน 29
                    มกราคม 2568)
                  </li>
                  <li>
                    <strong>รายละเอียด:</strong>{" "}
                    จ่ายผ่านบัญชีพร้อมเพย์ที่ผูกกับเลขประจำตัวประชาชน
                    เพื่อบรรเทาค่าครองชีพและกระตุ้นเศรษฐกิจ
                  </li>
                </ul>
              </div>

              <div className="phase-info-box">
                <h4>เฟส 3: ประชาชนทั่วไป (ผ่านระบบดิจิทัลเต็มรูปแบบ)</h4>
                <ul>
                  <li>
                    <strong>กลุ่มเป้าหมาย:</strong>{" "}
                    ประชาชนทั่วไปที่ลงทะเบียนผ่านแอป "ทางรัฐ" (อายุ 16 ปีขึ้นไป
                    รายได้ไม่เกิน 840,000 บาทต่อปี เงินฝากไม่เกิน 500,000 บาท)
                    ประมาณ 27-32 ล้านคน
                  </li>
                  <li>
                    <strong>เริ่มใช้จ่าย:</strong> ไตรมาส 2-3 ของปี 2568
                    (เมษายน-กันยายน 2568)
                  </li>
                  <li>
                    <strong>รายละเอียด:</strong>{" "}
                    ใช้ระบบดิจิทัลวอลเล็ตเต็มรูปแบบผ่านแอป "ทางรัฐ"
                    เน้นสร้างโครงสร้างพื้นฐานดิจิทัลสำหรับอนาคต
                  </li>
                </ul>
              </div>

              <div className="phase-info-box">
                <h4>เฟส 4: การขยายผลและปรับปรุงระบบ</h4>
                <ul>
                  <li>
                    <strong>เป้าหมาย:</strong>{" "}
                    ขยายการใช้งานให้ครอบคลุมร้านค้าและประชาชนเพิ่มเติม
                    ปรับปรุงระบบให้สมบูรณ์
                  </li>
                  <li>
                    <strong>รายละเอียด:</strong>{" "}
                    เป็นเฟสที่มุ่งเน้นการทำให้ระบบดิจิทัลวอลเล็ตกลายเป็นเครื่องมือถาวรของรัฐบาลในการกระตุ้นเศรษฐกิจ
                  </li>
                  <li>
                    <strong>เริ่มดำเนินการ:</strong> คาดว่าจะต่อเนื่องจากเฟส 3
                    ในช่วงปลายปี 2568
                  </li>
                </ul>
              </div>

              <div className="phase-info-footer">
                <p>
                  ข้อมูลจาก:{" "}
                  <a
                    href="https://policywatch.thaipbs.or.th/policy/economy-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policywatch.thaipbs.or.th
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="form-footer">
          <span className="char-count">{ideaText.length}/280</span>
          <button
            type="submit"
            className={`submit-button ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังส่ง..." : "แชร์ไอเดีย"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showConfirmation && (
          <div className="confirmation-message">
            <span>เยี่ยมมาก! ไอเดียของคุณอยู่บนหน้าเว็บแล้ว!</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default IdeaForm;
