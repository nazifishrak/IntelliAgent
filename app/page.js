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
        <div className="flex flex-col h-screen bg-[#ECE9D8] font-sans">
            {/* Taskbar */}
        </div>
    );
}
