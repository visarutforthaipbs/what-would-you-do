import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  increment,
  limit,
} from "firebase/firestore";
import { db } from "./config";
import { Idea } from "../types";

// Collection references
const ideasCollection = collection(db, "ideas");
const reportsCollection = collection(db, "reports");

// Add a new idea
export const addIdea = async (
  text: string,
  phase?: number
): Promise<string> => {
  try {
    const docRef = await addDoc(ideasCollection, {
      text,
      timestamp: serverTimestamp(),
      likes: 0,
      phase,
    });
    return docRef.id;
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มไอเดีย:", err);
    throw new Error("ไม่สามารถเพิ่มไอเดียได้ กรุณาลองใหม่อีกครั้ง");
  }
};

// Get all ideas ordered by timestamp (newest first)
export const getIdeasByNewest = async (): Promise<Idea[]> => {
  try {
    const q = query(ideasCollection, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        } as Idea)
    );
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลไอเดียล่าสุด:", err);
    throw new Error("ไม่สามารถโหลดไอเดียได้ กรุณาลองใหม่อีกครั้ง");
  }
};

// Get all ideas ordered by likes (most liked first)
export const getIdeasByLikes = async (): Promise<Idea[]> => {
  try {
    const q = query(ideasCollection, orderBy("likes", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        } as Idea)
    );
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลไอเดียยอดนิยม:", err);
    throw new Error("ไม่สามารถโหลดไอเดียได้ กรุณาลองใหม่อีกครั้ง");
  }
};

// Get top ideas by likes with a limit
export const getTopIdeas = async (topCount: number = 10): Promise<Idea[]> => {
  try {
    const q = query(ideasCollection, orderBy("likes", "desc"), limit(topCount));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        } as Idea)
    );
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลไอเดียยอดนิยม:", err);
    throw new Error("ไม่สามารถโหลดไอเดียยอดนิยมได้ กรุณาลองใหม่อีกครั้ง");
  }
};

// Like an idea
export const likeIdea = async (ideaId: string): Promise<void> => {
  try {
    const ideaRef = doc(db, "ideas", ideaId);
    await updateDoc(ideaRef, {
      likes: increment(1),
    });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการกดไลค์:", err);
    throw new Error("ไม่สามารถกดไลค์ได้ กรุณาลองใหม่อีกครั้ง");
  }
};

// Get a random idea
export const getRandomIdea = async (): Promise<Idea | null> => {
  try {
    const ideasSnapshot = await getDocs(ideasCollection);
    const ideas = ideasSnapshot.docs;

    if (ideas.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * ideas.length);
    const randomDoc = ideas[randomIndex];

    return {
      id: randomDoc.id,
      ...randomDoc.data(),
      timestamp: randomDoc.data().timestamp?.toDate() || new Date(),
    } as Idea;
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการดึงไอเดียแบบสุ่ม:", err);
    throw new Error("ไม่สามารถโหลดไอเดียแบบสุ่มได้ กรุณาลองใหม่อีกครั้ง");
  }
};

// Report an idea
export const reportIdea = async (
  ideaId: string,
  reason: string
): Promise<void> => {
  try {
    await addDoc(reportsCollection, {
      ideaId,
      reason,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการรายงาน:", err);
    throw new Error("ไม่สามารถส่งรายงานได้ กรุณาลองใหม่อีกครั้ง");
  }
};
