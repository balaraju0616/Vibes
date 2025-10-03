import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'

const StoriesBar = () => {
  const [stories, setStories] = useState([])

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  } 

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
      <div className="flex gap-4 pb-5" style={{ width: 'max-content' }}>
        {/* Add Story Card */}
        <div className="flex-shrink-0 rounded-lg shadow-sm min-w-24 max-w-24 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center">
          <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-2">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-slate-700 text-center px-1">Create Story</p>
        </div>
        
        {/* Story Cards with Profile Pictures in Top Left */}
        {stories.map((story, index) => (
          <div 
            key={story._id} 
            className="flex-shrink-0 rounded-lg shadow min-w-24 max-w-24 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 relative"
          >
            {/* Profile Picture - Top Left Small Size */}
            <div className="absolute top-2 left-2">
              <img 
                src={story.user.profile_picture} 
                alt={story.user.username}
                className="size-8 rounded-full border-2 border-white shadow"
              />
            </div>
            
            {/* Timestamp Only - Bottom Right */}
            <div className="absolute bottom-2 right-2">
              <div className="text-white/80 text-xs">
                {moment(story.createdAt).fromNow()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoriesBar