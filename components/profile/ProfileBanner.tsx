import React from 'react';

function ProfileBanner() {
    return (
        <div><div className="absolute inset-0 bg-linear-to-br from-violet-900/60 via-[#0d0b1f] to-cyan-900/40" />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%),
                                          radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 40%)`,
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            /></div>
    );
}

export default ProfileBanner;