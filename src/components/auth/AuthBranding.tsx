import Link from "next/link";
import { Car } from "lucide-react";

interface AuthBrandingProps {
    activeT: any;
}

export const AuthBranding = ({ activeT }: AuthBrandingProps) => {
    const stats = [
        { value: "2M+", label: activeT("branding.stats.customers") },
        { value: "1000+", label: activeT("branding.stats.centers") },
        { value: "50+", label: activeT("branding.stats.cities") },
    ];

    return (
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary to-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

            <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
                <Link href="/" className="flex items-center gap-3 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center">
                        <Car className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-3xl font-bold text-primary-foreground">
                        MyMechanika
                    </span>
                </Link>

                <h1 className="text-4xl font-bold text-primary-foreground mb-4">
                    {activeT("branding.title")}
                </h1>
                <p className="text-secondary-foreground/80 text-lg max-w-md">
                    {activeT("branding.description")}
                </p>

                <div className="grid grid-cols-3 gap-8 mt-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-primary-foreground">{stat.value}</div>
                            <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
