import Link from "next/link";
import { Home } from "lucide-react";



export const Header = () => {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center text-indigo-600 font-bold text-lg tracking-tight">
                        <Home  className="me-1" size={22} aria-hidden="true" />
                        Housing Price Predict
                    </Link>
                    <div className="flex gap-6">
                        <Link href="/market-analysis" className=" font-medium text-sm transition-colors">
                            Market Analysis
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}