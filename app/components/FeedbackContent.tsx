import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle2, MessageSquare, Star } from "lucide-react";

interface QuestionAnswer {
  question: string;
  answer: string;
  grade: number;
  feedback: string;
  metrics?: string; // JSON string
  analysis?: string; // JSON string
}

interface Metrics {
  clarity: number;
  relevance: number;
  confidence: number;
}

interface Analysis {
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

interface InterviewSummary {
  feedback: string;
  questions: QuestionAnswer[];
}

interface FeedbackContentProps {
  summary: InterviewSummary | null;
  loading: boolean;
  error: string | null;
}

export function FeedbackContent({ summary, loading, error }: FeedbackContentProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-xl text-muted-foreground">Analyse de votre entretien...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div className="text-xl text-destructive">Erreur: {error}</div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div className="text-xl text-muted-foreground">Aucun feedback disponible</div>
      </div>
    );
  }

  const parseJson = <T,>(jsonString?: string): T | null => {
    if (!jsonString) return null;
    try {
      return JSON.parse(jsonString) as T;
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="space-y-10">
      {/* Global Feedback */}
      <Card className="border-border shadow-sm bg-card">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Feedback Général</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {(() => {
            const globalFeedback = parseJson<{
              strengths: string[];
              weaknesses: string[];
              analysis: string;
            }>(summary.feedback);

            if (globalFeedback) {
              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-green-600 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" /> Points Forts
                      </h4>
                      <ul className="space-y-2">
                        {globalFeedback.strengths.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-foreground/90 bg-green-50/50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/20">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-red-500 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" /> Axes d'Amélioration
                      </h4>
                      <ul className="space-y-2">
                        {globalFeedback.weaknesses.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-foreground/90 bg-red-50/50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-blue-500" /> Analyse Globale
                    </h4>
                    <p className="text-foreground/90 leading-relaxed text-lg bg-muted/30 p-6 rounded-xl border border-border/50">
                      {globalFeedback.analysis}
                    </p>
                  </div>
                </div>
              );
            }

            // Fallback for old text format
            return (
              <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-lg prose dark:prose-invert max-w-none">
                {summary.feedback}
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Question & Answer Pairs */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Détails par question
        </h2>

        {summary.questions.map((qa, index) => {
          const metrics = parseJson<Metrics>(qa.metrics);
          const analysis = parseJson<Analysis>(qa.analysis);

          return (
            <Card key={index} className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Badge variant="outline" className="mb-2 bg-background font-normal">
                      Question {index + 1}
                    </Badge>
                    <h3 className="text-lg font-medium text-foreground leading-snug">
                      {qa.question}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1 bg-background px-3 py-1 rounded-full border border-border shadow-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-foreground">{qa.grade}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Votre réponse
                  </h4>
                  <div className="p-4 bg-muted/20 rounded-lg border border-border/50 italic text-muted-foreground">
                    "{qa.answer}"
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Feedback
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {qa.feedback}
                  </p>
                </div>

                {metrics && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Clarté</span>
                        <span className="font-medium">{metrics.clarity}/10</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${metrics.clarity * 10}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pertinence</span>
                        <span className="font-medium">{metrics.relevance}/10</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${metrics.relevance * 10}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Confiance</span>
                        <span className="font-medium">{metrics.confidence}/10</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${metrics.confidence * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {analysis && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-green-600 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Points Forts
                      </h5>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        {analysis.strengths.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-red-500 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Points Faibles
                      </h5>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        {analysis.weaknesses.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-blue-500 flex items-center gap-2">
                        <Star className="h-4 w-4" /> Améliorations
                      </h5>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        {analysis.improvements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}