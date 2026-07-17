"use client";

import { useState, useCallback, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import getCroppedImg from '@/lib/cropImage';

// Helper to center crop initially
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropper({ 
  imageSrc, 
  onCropComplete, 
  onCancel
}) {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(undefined); // Default ke Bebas (Custom)
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      // Free aspect, cover 100% of the image initially
      setCrop({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0
      });
    }
  }, [aspect]);

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return;
    
    // Check if the crop has width and height, else we can't crop
    if (completedCrop.width === 0 || completedCrop.height === 0) return;

    try {
      setIsProcessing(true);
      
      // react-image-crop provides crop values based on the *displayed* image size.
      // We need to scale these to the *original* image resolution for the canvas.
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      const pixelCrop = {
        x: completedCrop.x * scaleX,
        y: completedCrop.y * scaleY,
        width: completedCrop.width * scaleX,
        height: completedCrop.height * scaleY,
      };

      const croppedImageFile = await getCroppedImg(
        imageSrc,
        pixelCrop,
        0
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-6 animate-in fade-in duration-200">
      
      <div className="flex flex-col w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-4xl bg-gray-900 sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 bg-gray-900 text-white border-b border-gray-800 shrink-0">
          <h3 className="text-lg font-semibold tracking-tight">Potong & Sesuaikan Gambar</h3>
          <button 
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative flex-1 sm:h-[60vh] w-full bg-black min-h-[50vh] flex items-center justify-center overflow-auto p-4">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="flex items-center justify-center max-w-full"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop area"
              onLoad={onImageLoad}
              className="max-w-full w-auto h-auto block"
              style={{ maxHeight: 'min(60vh, 500px)' }}
            />
          </ReactCrop>
        </div>

        {/* Controls Area */}
        <div className="p-4 sm:p-6 bg-gray-900 border-t border-gray-800 space-y-4 shrink-0">
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="text-xs text-gray-400 font-medium mr-2">Bentuk Potongan:</span>
            <button 
              type="button"
              onClick={() => { setAspect(16/9); if(imgRef.current) setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, 16/9)); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${aspect === 16/9 ? 'bg-primary border-primary text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}
            >
              Lanskap (16:9)
            </button>
            <button 
              type="button"
              onClick={() => { setAspect(4/3); if(imgRef.current) setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, 4/3)); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${aspect === 4/3 ? 'bg-primary border-primary text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}
            >
              Standar (4:3)
            </button>
            <button 
              type="button"
              onClick={() => { setAspect(1/1); if(imgRef.current) setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, 1/1)); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${aspect === 1/1 ? 'bg-primary border-primary text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}
            >
              Kotak (1:1)
            </button>
            <button 
              type="button"
              onClick={() => setAspect(undefined)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${!aspect ? 'bg-primary border-primary text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'}`}
            >
              Bebas (Custom)
            </button>
          </div>
          
          <div className="flex gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-gray-800/80 text-white rounded-xl font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors border border-gray-700"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing || !completedCrop?.width || !completedCrop?.height}
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
