import { Outlet, NavLink } from "react-router";
import { cn } from "~/lib/utils";

export default function JobsLayout() {
    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                        Offres d'emploi
                    </h1>
                    <p className="text-muted-foreground">
                        Trouvez votre prochaine opportunité professionnelle.
                    </p>
                </div>

                <div className="flex space-x-4 border-b border-border pb-2">
                    <NavLink
                        to="/jobs"
                        end
                        className={({ isActive }) =>
                            cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive ? "text-primary border-b-2 border-primary pb-2 -mb-2.5" : "text-muted-foreground"
                            )
                        }
                    >
                        Recherche
                    </NavLink>
                </div>

                <Outlet />
            </div>
        </div>
    );
}
