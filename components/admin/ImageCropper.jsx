"use client";

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

export default function ImageCropper({ 
  imageSrc, 
  onCropComplete, 
  onCancel,
  aspectRatio = 16 / 9 
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    
    try {
      setIsProcessing(true);
      const croppedImageFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        0 // rotation
      );
      
      onCropComplete(croppedImageFile);
    } catch (e) {
      console.error("Gagal melakukan crop gambar:", e);
      alert("Terjadi kesalahan saat memotong gambar.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6 animate-in fade-in duration-200">
      
      <div className="flex flex-col w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl bg-gray-900 sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 bg-gray-900 text-white border-b border-gray-800 shrink-0">
          <h3 className="text-lg font-semibold tracking-tight">Sesuaikan Gambar</h3>
          <button 
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative flex-1 sm:h-[50vh] w-full bg-black min-h-[50vh]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            classes={{
              containerClassName: "absolute inset-0",
            }}
          />
        </div>

        {/* Controls Area */}
        <div className="p-4 sm:p-6 bg-gray-900 border-t border-gray-800 space-y-6 shrink-0">
          <div className="flex items-center gap-4 text-white max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light transition-all"
            />
          </div>
          
          <div className="flex gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-gray-800/80 text-white rounded-xl font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors border border-gray-700"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark disabled:opacity-50 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                "Simpan Crop"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
