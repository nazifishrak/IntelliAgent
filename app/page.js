'use client';

import { useState, useCallback } from 'react';
import he from 'he';
import { ClipboardCopy, Loader2, Minimize2, Square, X } from "lucide-react";

// Initializing the main component
export default function Component() {
    const [videoUrl, setVideoUrl] = useState('');
    const [transcript, setTranscript] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        // Add this inside the return statement, replacing the previous content

<div className="bg-gradient-to-r from-[#0A246A] to-[#3A6EA5] text-white p-1 flex justify-between items-center">
    <div className="flex items-center">
        <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
        <span className="font-bold">Start</span>
    </div>
    <span className="text-xs">4:20 PM</span>
</div>

    );
}
