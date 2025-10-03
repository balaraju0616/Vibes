import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModal from './StoryModal'

const StoriesBar = () => {
  const [stories, setStories] = useState([])
  const [showModal, setShowModal] = useState(false) // Changed from ShowModal to showModal
  const [viewStory, setViewStory] = useState(null)
    

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  } 

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className='w-full no-scrollbar overflow-x-auto px-4 mb-6'>
      <div className="flex gap-4 pb-5">
        {/* Add Story Card */}
        <div onClick={() => setShowModal(true)} className="flex-shrink-0 rounded-lg shadow-sm w-24 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center">
          <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-2">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-slate-700 text-center px-1">Create Story</p>
        </div>
        
        {/* Story Cards - Limited to viewport width */}
        {stories.map((story) => (
          <div 
            key={story._id} 
            className="flex-shrink-0 rounded-lg shadow w-24 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 relative overflow-hidden"
          >
            {/* Media Content (Image/Video) - Behind everything */}
            {story.media_type !== 'text' && story.media_url && (
              <div className='absolute inset-0 z-0 rounded-lg bg-black overflow-hidden'>
                {story.media_type === "image" && (
                  <img 
                    src={story.media_url} 
                    alt="" 
                    className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80'
                  />
                )}
              </div>
            )}
            
            {/* Profile Picture - Top Left Small Size */}
            <div className="absolute top-2 left-2 z-10">
              <img 
                src={story.user.profile_picture} 
                alt={story.user.username}
                className="size-8 rounded-full border-2 border-white shadow"
              />
            </div>
            
            {/* Timestamp Only - Bottom Right */}
            <div className="absolute bottom-2 right-2 z-10">
              <div className="text-white/80 text-xs">
                {moment(story.createdAt).fromNow()}
              </div>
            </div>

            {/* Story Content Text (if any) */}
            {story.content && (
              <div className="absolute bottom-10 left-2 right-2 z-10">
                <p className='text-white text-xs truncate'>
                  {story.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

       {/* Add Story Modal */}
       {showModal && <StoryModal setShowModal={setShowModal} />} {/* Fixed to use showModal */}

    </div>
  )
}

export default StoriesBar