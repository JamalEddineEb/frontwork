import { useParams } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/feedback";
import { useFeedbackStore } from "~/services/usefeedbackstore";
import { FeedbackContent } from "~/components/FeedbackContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Feedback - Entervio" },
    { name: "description", content: "Résumé de votre entretien d'embauche" },
  ];
}

export default function Feedback() {
  const { interviewId } = useParams();

  // Get state and actions from store
  const { summary, loading, error, fetchSummary } = useFeedbackStore();

  useEffect(() => {
    if (interviewId) {
      fetchSummary(interviewId);
    }
  }, [interviewId, fetchSummary]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Résumé de l'entretien</h1>
        <p className="text-muted-foreground text-lg">
          Voici l'analyse détaillée de votre performance
        </p>
      </div>

      <FeedbackContent summary={summary} loading={loading} error={error} />
    </div>
  );
}