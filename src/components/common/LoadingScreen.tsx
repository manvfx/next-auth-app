import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-center">
                {/* <img src="/path-to-your-logo.png" alt="Logo" className="mx-auto mb-4 h-16 w-16" /> */}
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
