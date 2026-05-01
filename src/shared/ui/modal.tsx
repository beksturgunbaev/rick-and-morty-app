import React, { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isRendered, setIsRendered] = useState(false);

    // Логика для запуска анимации после того, как компонент попал в DOM
    useEffect(() => {
        if (isOpen) {
            // Небольшая задержка, чтобы браузер успел применить начальные стили
            const timer = setTimeout(() => setIsRendered(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsRendered(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Оверлей (плавное появление фона) */}
            <div
                className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${isRendered ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Контент (плавное увеличение и появление) */}
            <div className={`relative bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition-all duration-300 transform ${isRendered
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-90 translate-y-4'
                }`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-slate-500 hover:text-white bg-slate-950/20 rounded-full p-1 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {children}
            </div>
        </div>
    );
};