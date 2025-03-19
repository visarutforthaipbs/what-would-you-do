import { useState, useEffect } from "react";
import { Idea, DigitalWalletPhase } from "../types";
import {
  getIdeasByNewest,
  getIdeasByLikes,
  getTopIdeas,
  getRandomIdea,
} from "../firebase/ideaService";

type SortOption = "newest" | "mostLiked";
type PhaseFilter = number | "all"; // "all" or specific phase number

export const useIdeas = (initialSortOption: SortOption = "newest") => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>("all");
  const [randomIdea, setRandomIdea] = useState<Idea | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [phaseStatistics, setPhaseStatistics] = useState<{
    [key: number]: number;
  }>({});

  const refreshIdeas = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Calculate phase statistics
  useEffect(() => {
    if (ideas.length > 0) {
      const stats: { [key: number]: number } = {
        [DigitalWalletPhase.Phase1]: 0,
        [DigitalWalletPhase.Phase2]: 0,
        [DigitalWalletPhase.Phase3]: 0,
        [DigitalWalletPhase.Phase4]: 0,
        0: 0, // For ideas without phase info
      };

      ideas.forEach((idea) => {
        const phase = idea.phase || 0;
        stats[phase] = (stats[phase] || 0) + 1;
      });

      setPhaseStatistics(stats);
    }
  }, [ideas]);

  // Apply phase filtering
  useEffect(() => {
    if (phaseFilter === "all") {
      setFilteredIdeas(ideas);
    } else {
      setFilteredIdeas(ideas.filter((idea) => idea.phase === phaseFilter));
    }
  }, [ideas, phaseFilter]);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        let fetchedIdeas: Idea[];

        if (sortOption === "newest") {
          fetchedIdeas = await getIdeasByNewest();
        } else {
          fetchedIdeas = await getIdeasByLikes();
        }

        setIdeas(fetchedIdeas);
        setError(null);
      } catch (err) {
        console.error("Error fetching ideas:", err);
        setError("เกิดข้อผิดพลาดในการโหลดไอเดีย กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [sortOption, refreshTrigger]);

  const fetchRandomIdea = async () => {
    try {
      const idea = await getRandomIdea();
      setRandomIdea(idea);
    } catch (err) {
      console.error("Error fetching random idea:", err);
    }
  };

  return {
    ideas: filteredIdeas, // Return filtered ideas instead of all ideas
    allIdeas: ideas, // Also provide access to all ideas if needed
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
  };
};

export const useTopIdeas = (count: number = 10) => {
  const [topIdeas, setTopIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshTopIdeas = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchTopIdeas = async () => {
      setLoading(true);
      try {
        const ideas = await getTopIdeas(count);
        setTopIdeas(ideas);
        setError(null);
      } catch (err) {
        console.error("Error fetching top ideas:", err);
        setError("เกิดข้อผิดพลาดในการโหลดไอเดียยอดนิยม กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchTopIdeas();
  }, [count, refreshTrigger]);

  return { topIdeas, loading, error, refreshTopIdeas };
};
