import { useNavigate } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/setup";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { InterviewerType } from "~/types/interview";
import { cn } from "~/lib/utils";
import { useSetupStore } from "~/services/usesetupstore";
import { Loader2, ArrowRight, X, Upload, FileText, CheckCircle } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Configuration - Entervio" },
    {
      name: "description",
      content: "Configurez votre entretien avec un recruteur IA",
    },
  ];
}

const INTERVIEWER_CONFIGS = [
  {
    type: "nice" as InterviewerType,
    label: "Bienveillant",
    icon: "😊",
    description: "Un recruteur encourageant qui vous met en confiance",
  },
  {
    type: "neutral" as InterviewerType,
    label: "Professionnel",
    icon: "😐",
    description: "Un recruteur objectif et factuel dans ses évaluations",
  },
  {
    type: "mean" as InterviewerType,
    label: "Exigeant",
    icon: "😤",
    description: "Un recruteur direct qui teste votre gestion du stress",
  },
];

export default function Setup() {
  const navigate = useNavigate();

  const {
    selectedInterviewer,
    candidateId,
    error,
    isStarting,
    isUploading,
    setSelectedInterviewer,
    uploadResume,
    startInterview,
    checkResumeStatus,
  } = useSetupStore();

  // Check for existing resume on mount
  useEffect(() => {
    checkResumeStatus();
  }, [checkResumeStatus]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        await uploadResume(file);
      }
    }
  };

  const handleStart = async () => {
    const sessionId = await startInterview();
    if (sessionId) {
      navigate(`/interview/${sessionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Configuration de l'entretien
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Personnalisez votre expérience pour un entraînement optimal.
          </p>
        </div>

        {/* Main Setup Section */}
        <div className="grid gap-8 md:grid-cols-[1fr_350px]">
          <div className="space-y-8">
            {/* Job Description */}
            <div className="space-y-4">
              <Label
                htmlFor="jobDescription"
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2"
              >
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-foreground">1</span>
                Description du poste (Optionnel)
              </Label>
              <div className="relative group">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <textarea
                  id="jobDescription"
                  value={useSetupStore((state) => state.jobDescription)}
                  onChange={(e) => useSetupStore.getState().setJobDescription(e.target.value)}
                  placeholder="Collez ici la description du poste..."
                  className="flex min-h-[140px] w-full rounded-2xl border border-input bg-card px-4 py-4 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 pl-12 resize-none transition-all duration-200 hover:border-primary/30"
                  disabled={isStarting}
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-foreground">2</span>
                CV (Optionnel)
              </Label>
              <div className="group relative">
                {candidateId ? (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-medium block">CV analysé avec succès</span>
                      <span className="text-sm opacity-80">Votre profil a été pris en compte.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isUploading || isStarting}
                    />
                    <label
                      htmlFor="resume"
                      className={cn(
                        "flex flex-col items-center justify-center gap-3 p-8 cursor-pointer rounded-2xl border-2 border-dashed border-input bg-card/50 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-[0.99] active:scale-95",
                        (isUploading || isStarting) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isUploading ? (
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      ) : (
                        <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                      <div className="text-center">
                        <span className="font-medium text-foreground block mb-1">
                          {isUploading ? "Analyse en cours..." : "Télécharger votre CV"}
                        </span>
                        <span className="text-sm text-muted-foreground">Format PDF uniquement</span>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Interviewer Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs text-foreground">3</span>
                Recruteur
              </Label>
              <div className="grid gap-4 sm:grid-cols-3">
                {INTERVIEWER_CONFIGS.map((config) => (
                  <button
                    key={config.type}
                    onClick={() => setSelectedInterviewer(config.type)}
                    disabled={isStarting}
                    className={cn(
                      "group relative p-5 text-left rounded-2xl border transition-all duration-300 outline-none",
                      selectedInterviewer === config.type
                        ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg shadow-primary/10"
                        : "border-input bg-card hover:border-primary/50 hover:bg-accent/50 hover:scale-[1.02]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{config.icon}</div>
                    <h3 className={cn(
                      "font-semibold mb-2 transition-colors",
                      selectedInterviewer === config.type ? "text-primary" : "text-foreground"
                    )}>
                      {config.label}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {config.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg flex items-center gap-2">
                <X className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Start Button */}
            <div className="pt-4">
              <Button
                onClick={handleStart}
                disabled={!selectedInterviewer || isStarting}
                className="w-full md:w-auto text-base h-12 px-8"
                size="lg"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Initialisation...
                  </>
                ) : (
                  <>
                    Commencer l'entretien
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="hidden md:block border-l border-border pl-8 space-y-8">
            {[
              {
                title: "Durée",
                desc: "10-15 min",
              },
              {
                title: "Audio",
                desc: "Micro requis",
              },
              {
                title: "Sauvegarde",
                desc: "Automatique",
              },
              {
                title: "Feedback",
                desc: "Détaillé",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  {item.title}
                </h4>
                <p className="text-lg font-light text-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}