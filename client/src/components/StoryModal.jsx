import { ArrowLeft, Sparkle } from 'lucide-react'
import React, { useState } from 'react'

const StoryModal = ({ setShowModal }) => {
    const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"]

    const [mode, setMode] = useState("text")
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if(file){
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
            setMode('media')
        }
    }

    const handleCreateStory = async () => {
        // Empty function
    }

    return (
        <div className='fixed inset-0 z-50 min-h-screen bg-black/90 backdrop-blur flex items-center justify-center p-4'>
            <div className='w-full max-w-sm bg-gray-900 rounded-2xl p-6 mx-auto'>
                {/* Header with Back Arrow and Create Story text */}
                <div className='text-center mb-4 flex items-center justify-between'>
                    <button 
                        onClick={() => setShowModal(false)} 
                        className='text-white p-2 cursor-pointer hover:bg-white/10 rounded-full transition'
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className='text-lg font-semibold text-white'>Create Story</h2>
                    <div className="w-8"></div> {/* Spacer for balance */}
                </div>

                {/* Story Preview Area */}
                <div 
                    className='rounded-xl h-64 flex items-center justify-center relative mb-4 border border-gray-600' 
                    style={{backgroundColor: background}}
                >
                    {mode === 'text' && (
                        <textarea 
                            className='bg-transparent text-white w-full h-full p-4 text-lg resize-none focus:outline-none text-center placeholder-white/70' 
                            placeholder="What's on your mind?" 
                            onChange={(e) => setText(e.target.value)} 
                            value={text}
                        />
                    )}
                    {mode === 'media' && previewUrl && (
                        media?.type?.startsWith('image') ? (
                            <img 
                                src={previewUrl} 
                                alt="" 
                                className='object-cover w-full h-full rounded-xl' 
                            />
                        ) : (
                            <video 
                                src={previewUrl} 
                                controls 
                                className='object-cover w-full h-full rounded-xl'
                            />
                        )
                    )}
                </div>

                {/* Background Colors - Only show for text mode */}
                {mode === 'text' && (
                    <div className='flex justify-center gap-2 mb-4'>
                        {bgColors.map((color) => (
                            <button 
                                key={color} 
                                className={`w-6 h-6 rounded-full cursor-pointer ring-1 transition-all ${
                                    background === color ? 'ring-white scale-110' : 'ring-transparent hover:scale-105'
                                }`}
                                style={{backgroundColor: color}} 
                                onClick={() => setBackground(color)}
                            />
                        ))}
                    </div>
                )}

                {/* Mode Selection */}
                <div className='flex gap-2 mb-4'>
                    <button 
                        onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null) }} 
                        className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg cursor-pointer font-medium text-sm ${
                            mode === 'text' ? "bg-white text-black" : "bg-zinc-800"
                        }`}
                    >
                        Text
                    </button>
                    
                    <label className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg cursor-pointer font-medium text-sm ${
                        mode === 'media' ? "bg-white text-black" : "bg-zinc-800"
                    }`}>
                        Photo/Video
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Create Story Button */}
                <button
                    onClick={handleCreateStory}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all text-sm"
                >
                    <Sparkle size={16} /> Create Story
                </button>
            </div>
        </div>
    )
}

export default StoryModal