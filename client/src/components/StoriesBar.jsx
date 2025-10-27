import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModal from './StoryModal'
import StoryViewer from './StoryViewer';

const StoriesBar = () => {
  const [stories, setStories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [viewStory, setViewStory] = useState(null)
    

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  } 

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <>
      {!viewStory && (
        <div className='w-full overflow-x-auto no-scrollbar mb-6 max-w-xl mx-auto'>
          <div className="flex gap-4 pb-5 px-4 min-w-max">
            {/* Add Story Card */}
            <div onClick={() => setShowModal(true)} className="flex-shrink-0 rounded-lg shadow-sm w-24 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center">
              <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-2">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-slate-700 text-center px-1">Create Story</p>
            </div>
            
            {/* Story Cards */}
            {stories.map((story) => (
              <div 
                key={story._id} 
                onClick={() => setViewStory(story)}
                className="flex-shrink-0 rounded-lg shadow w-24 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 relative overflow-hidden"
              >
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
                
                <div className="absolute top-2 left-2 z-10">
                  <img 
                    src={story.user.profile_picture} 
                    alt={story.user.username}
                    className="size-8 rounded-full border-2 border-white shadow"
                  />
                </div>
                
                <div className="absolute bottom-2 right-2 z-10">
                  <div className="text-white/80 text-xs">
                    {moment(story.createdAt).fromNow()}
                  </div>
                </div>

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

          {showModal && <StoryModal setShowModal={setShowModal} />}
        </div>
      )}

      {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />}
    </>
  )
}

export default StoriesBar