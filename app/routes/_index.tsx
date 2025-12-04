
import { Link } from "react-router";
import type { Route } from "./+types/_index";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ArrowRight,
  Mic,
  History,
  TrendingUp,
  Play,
  Sparkles,
} from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard - Entervio" },
    {
      name: "description",
      content: "Votre centre d'entraînement aux entretiens",
    },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col space-y-2 mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Bonjour, Candidat
        </h1>
        <p className="text-lg text-muted-foreground font-light">
          Prêt à exceller dans votre prochain entretien ?
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

        {/* Hero Card - Start Session (Span 8) */}
        <Card className="md:col-span-8 row-span-2 relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 hover:border-primary/30 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-10 flex flex-col justify-between h-full relative z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Nouvelle Session
              </h2>
              <p className="text-lg text-muted-foreground max-w-md font-light leading-relaxed">
                Lancez une simulation d'entretien personnalisée avec notre recruteur IA.
                Choisissez votre style et recevez un feedback immédiat.
              </p>
            </div>
            <div className="pt-8">
              <Button asChild size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-[0.98] active:scale-95">
                <Link to="/setup">
                  Commencer l'entraînement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
          {/* Decorative background element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
        </Card>

        {/* Stats Card - Progress (Span 4) */}
        <Card className="md:col-span-4 row-span-2 border-border/50 bg-card/50 hover:bg-card/80 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Progression
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-foreground">Top 15%</span>
                <span className="text-sm text-green-500 font-medium mb-1">+12% cette semaine</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%] rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground pt-1">
                Votre score moyen de confiance est en hausse.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sessions</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="text-2xl font-bold text-foreground">8.5</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity (Span 6) */}
        <Card className="md:col-span-6 border-border/50 bg-card/50 hover:border-primary/20 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <History className="w-5 h-5 text-blue-500" />
              Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Aujourd'hui", type: "Bienveillant", score: 9.2 },
                { date: "Hier", type: "Neutre", score: 8.5 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.type}</div>
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-foreground">{item.score}/10</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground mt-2" asChild>
                <Link to="/interviews">Voir tout l'historique</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips / Quick Actions (Span 6) */}
        <Card className="md:col-span-6 border-border/50 bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:border-blue-500/20 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Conseil du jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg font-light italic text-muted-foreground border-l-2 border-primary/30 pl-4 py-2 my-2">
              "Prenez le temps de structurer vos réponses avec la méthode STAR : Situation, Tâche, Action, Résultat."
            </blockquote>
            <div className="mt-6 flex gap-3">
              <div className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground border border-border/50">Communication</div>
              <div className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground border border-border/50">Soft Skills</div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}