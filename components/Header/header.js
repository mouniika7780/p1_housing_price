import Link from "next/link";



export const Header = () => {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-indigo-600 font-bold text-lg tracking-tight">
                        <Link href="/" className="">
                            Housing Price Predict
                        </Link>
                    </h1>
                    <div className="flex gap-6">
                        <Link href="/market-analysis" className="text-indigo-600 font-medium text-sm transition-colors">
                            Market Analysis
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}