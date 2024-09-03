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

  const handleTranscribe = useCallback(async () => {
      setIsLoading(true);
      setError('');
      setTranscript('');

      try {
          const response = await fetch('/api/transcript', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ videoUrl }),
          });

          const rawResponse = await response.text();
          console.log('Raw API response:', rawResponse);

          let data;
          try {
              data = JSON.parse(rawResponse);
          } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
              throw new Error('Received invalid response from server');
          }

          if (!response.ok) {
              throw new Error(data.error || 'Failed to transcribe the video. Please check the URL and try again.');
          }

          const decodedTranscript = he.decode(data.transcript);
          setTranscript(decodedTranscript);
      } catch (err) {
          setError(err.message || 'An error occurred while transcribing the video.');
      } finally {
          setIsLoading(false);
      }
  }, [videoUrl]);

  const handleCopyTranscript = useCallback(() => {
      navigator.clipboard.writeText(transcript)
          .then(() => alert('Transcript copied to clipboard!'))
          .catch(() => alert('Failed to copy transcript. Please try again.'));
  }, [transcript]);

  return (
      <div className="flex flex-col h-screen bg-[#ECE9D8] font-sans">
          {/* Taskbar */}
          <div className="bg-gradient-to-r from-[#0A246A] to-[#3A6EA5] text-white p-1 flex justify-between items-center">
              <div className="flex items-center">
                  <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                  <span className="font-bold">Start</span>
              </div>
              <span className="text-xs">4:20 PM</span>
          </div>

          {/* Main Window */}
          <div className="flex-grow flex flex-col m-4 border-2 border-[#0A246A] rounded shadow-lg bg-[#ECE9D8]">
              {/* Window Title Bar */}
              <div className="bg-gradient-to-r from-[#0A246A] to-[#3A6EA5] text-white p-1 flex justify-between items-center">
                  <span className="font-bold">YouTube Transcriber</span>
                  <div className="flex space-x-1">
                      <button className="focus:outline-none"><Minimize2 size={16} /></button>
                      <button className="focus:outline-none"><Square size={16} /></button>
                      <button className="focus:outline-none"><X size={16} /></button>
                  </div>
              </div>

              {/* Window Content */}
              <div className="flex-grow p-4 space-y-4 bg-[#ECE9D8] overflow-auto">
                  <div className="flex space-x-2">
                      <input
                          type="url"
                          placeholder="Enter YouTube video URL"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="flex-grow p-1 border border-gray-400 bg-white"
                      />
                      <button
                          onClick={handleTranscribe}
                          disabled={isLoading || !videoUrl}
                          className="px-4 py-1 bg-[#ECE9D8] border-2 border-gray-400 active:border-[#0A246A] disabled:opacity-50"
                      >
                          {isLoading ? <Loader2 className="animate-spin" /> : 'Transcribe'}
                      </button>
                  </div>

                  {error && <p className="text-red-600">{error}</p>}
                  {transcript && (
                      <div className="space-y-2">
                          <textarea
                              value={transcript}
                              readOnly
                              className="w-full h-64 p-2 resize-none border border-gray-400 bg-white"
                          />
                          <button
                              onClick={handleCopyTranscript}
                              className="w-full px-4 py-1 bg-[#ECE9D8] border-2 border-gray-400 active:border-[#0A246A] flex items-center justify-center"
                          >
                              <ClipboardCopy className="mr-2 h-4 w-4" />
                              Copy Transcript
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
}