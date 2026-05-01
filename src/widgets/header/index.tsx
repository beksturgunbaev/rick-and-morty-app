import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="w-full bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
                <Link
                    to="/"
                    className="group flex items-center gap-2 no-underline"
                >
                    <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center font-black text-slate-950 transform group-hover:rotate-12 transition-transform duration-300">
                        R
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-100">
                        Rick <span className="text-slate-300 font-light">&</span> Morty
                    </span>
                </Link>
            </div>
        </header>
    );
};
