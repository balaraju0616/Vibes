import React, { useEffect, useState } from 'react'
import { X, BadgeCheck } from 'lucide-react'


const StoryViewer = ({viewStory, setViewStory}) => {

  const[progress,setProgress]=useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timer, progressInterval;

    if (viewStory && viewStory.media_type !== 'video') {
        setProgress(0)

        const duration = 10000;
        const setTime = 100;
        let elapsed = 0;

        progressInterval = setInterval(() => {
            elapsed += setTime;
            setProgress((elapsed / duration) * 100);
        }, setTime);

        // Close story after duration(10sec)
timer = setTimeout(() => {
    setViewStory(null)
}, duration)
    }
    return () => {
    clearTimeout(timer);
    clearInterval(progressInterval)
}
}, [viewStory, setViewStory])

  const handleClose=()=> {
    setViewStory(null)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const rendorContent=()=>{
    switch(viewStory.media_type){
      case 'image':
        return (
          <img src={viewStory.media_url} alt="" className='max-w-full max-h-screen object-contain' onClick={handlePause}/>
        );

      case 'video':
        return (
          <video 
            onEnded={handleClose} 
            src={viewStory.media_url} 
            className='max-w-full max-h-screen object-contain' 
            controls 
            autoPlay 
            muted
            onClick={handlePause}
          />
        );

      case 'text':
        return (
          <div className='w-full h-full flex items-center justify-center p-8' onClick={handlePause}>
            <div className='text-white text-3xl text-center font-bold break-words whitespace-pre-line leading-relaxed max-w-4xl px-8'>
              {viewStory.content}
            </div>
          </div>
        );

      default:
        return null;
    }
  }
  
  return (
    <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-50 flex items-center justify-center' style={{backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000'}} onClick={handlePause}>
      
      <div className='absolute top-4 left-4 right-4 h-1 bg-gray-700 rounded-full'>
        <div 
          className='h-full bg-white rounded-full transition-all duration-100 ease-linear' 
          style={{width: `${progress}%`}}
        >
        </div>
      </div>

      <div className='absolute top-12 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50'>  
        <img src={viewStory.user?.profile_picture} alt="" className='size-7 sm:size-8 rounded-full object-cover border border-white'/>  
        <div className='text-white font-medium flex items-center gap-1.5'>  
          <span>{viewStory.user?.full_name}</span>  
          <BadgeCheck size={18}/>  
        </div>  
      </div>  

      <button onClick={handleClose} className='absolute top-12 right-4 text-white text-3xl font-bold focus:outline-none'>  
        <X className='w-8 h-8 hover:scale-110 transition cursor-pointer'/>  
      </button>

      <div className='w-full h-full flex items-center justify-center pt-16'>
        {rendorContent()}
      </div>
    </div>
  )
}

export default StoryViewer