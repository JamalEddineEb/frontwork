import { useState } from "react";
import { interviewApi } from "~/lib/api";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, MapPin, Briefcase, Sparkles, Building2, ArrowRight } from "lucide-react";
import { Badge } from "~/components/ui/badge";

export default function JobSearchPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [smartLoading, setSmartLoading] = useState(false);
    const [keywords, setKeywords] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);
    const [smartParams, setSmartParams] = useState<any>(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setSearched(true);
        setSmartParams(null);
        try {
            const data = await interviewApi.searchJobs(keywords, location);
            setJobs(data.resultats || []);
        } catch (err) {
            setError("Failed to search jobs. Please check your inputs and try again.");
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSmartSearch = async () => {
        setSmartLoading(true);
        setError(null);
        setSearched(true);
        try {
            const data = await interviewApi.smartSearchJobs();
            if (data.message && !data.resultats) {
                setError(data.message);
                setJobs([]);
            } else {
                setJobs(data.resultats || []);
                if (data.smart_search_params) {
                    setSmartParams(data.smart_search_params);
                    setKeywords(data.smart_search_params.keywords || "");
                    setLocation(data.smart_search_params.location || "");
                }
            }
        } catch (err) {
            setError("Failed to perform smart search. Ensure you have a resume uploaded.");
            setJobs([]);
        } finally {
            setSmartLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto py-8 px-6">
            <div className="space-y-2">
                <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground">
                    Find your next opportunity.
                </h1>
                <p className="text-lg text-muted-foreground font-sans font-light">
                    Curated roles matching your expertise.
                </p>
            </div>

            {/* Search Bar Card */}
            <Card className="bg-white shadow-soft border-none p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Job title, keywords..."
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="pl-10 bg-secondary/30 border-transparent focus:bg-white transition-colors h-12"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Location (e.g. Paris)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-10 bg-secondary/30 border-transparent focus:bg-white transition-colors h-12"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSearch}
                            disabled={loading || smartLoading}
                            className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-none"
                        >
                            {loading ? "Searching..." : "Search"}
                        </Button>
                        <Button
                            onClick={handleSmartSearch}
                            disabled={loading || smartLoading}
                            variant="secondary"
                            className="h-12 px-4 bg-secondary text-primary hover:bg-secondary/80 rounded-lg shadow-none"
                            title="Smart Search via Resume"
                        >
                            <Sparkles className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Card>

            {smartParams && (
                <div className="p-4 rounded-lg bg-[#ECFDF5] border border-primary/10 text-sm text-primary/80 flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-medium text-primary">
                        <Sparkles className="h-4 w-4" />
                        AI Optimized Search
                    </div>
                    <div className="text-xs opacity-90">
                        Based on your resume analysis:
                        <ul className="list-disc list-inside mt-1 ml-2">
                            {smartParams.search_queries?.map((q: any, i: number) => (
                                <li key={i}>
                                    <span className="capitalize">{q.type}</span>: {q.keywords} {q.location && `(${q.location})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive font-sans">
                    {error}
                </div>
            )}

            {/* Job List - Deck of Opportunities */}
            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <Card key={job.id} className="bg-white shadow-soft border-none rounded-lg hover:translate-x-1 transition-transform duration-200 group">
                        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Left: Logo */}
                            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                <Building2 className="w-6 h-6" />
                            </div>

                            {/* Middle: Title & Company */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-serif font-bold text-foreground truncate">
                                    {job.intitule}
                                </h3>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm font-sans">
                                    <span className="font-medium text-foreground/80">{job.entreprise?.nom || "Confidential Company"}</span>
                                    <span>•</span>
                                    <span>{job.lieuTravail?.libelle}</span>
                                    <span>•</span>
                                    <Badge variant="secondary" className="bg-secondary/50 text-muted-foreground hover:bg-secondary font-normal rounded px-2 py-0 h-5">
                                        {job.typeContrat}
                                    </Badge>
                                </div>
                            </div>

                            {/* Right: Salary & Action */}
                            <div className="flex flex-col md:flex-row items-end md:items-center gap-4 shrink-0">
                                <div className="hidden md:block text-right">
                                    <div className="bg-secondary px-3 py-1 rounded text-xs font-medium text-muted-foreground">
                                        Competitive Salary
                                    </div>
                                    {job.dateCreation && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Posted {new Date(job.dateCreation).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                                <Button asChild variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 hover:underline p-0 h-auto font-medium">
                                    <a
                                        href={job.origineOffre?.urlOrigine}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1"
                                    >
                                        View
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {searched && jobs.length === 0 && !loading && !smartLoading && !error && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-1">No jobs found</h3>
                        <p className="text-muted-foreground">Try adjusting your search terms or location.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
