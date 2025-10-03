import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'

const Feed = () => {
  const [feeds, setfeeds] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchFeeds = async () => {
    setfeeds(dummyPostsData)
    setLoading(false);
  }

  useEffect(() => {
    fetchFeeds()
  }, [])
  
  return !loading ? (
    <div className="h-full overflow-hidden py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      <div className="flex-1 ml-56 xl:ml-64 py-10 flex items-start justify-center xl:gap-8 h-screen overflow-hidden">
        {/* Main content with width for exactly 4 stories + Create Story button */}
        <div className="w-full max-w-[28rem] overflow-hidden">
          {/* StoriesBar - will show exactly 4 stories + Create Story button visible */}
          <StoriesBar/>
          
          {/* List of post directly below */}
          <div className='p-4'>
            <h2 className="text-xl font-semibold">List of post</h2>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="hidden xl:block w-80">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h1 className="font-semibold">Sponsored</h1>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h1 className="font-semibold">Recent messages</h1>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
}

export default Feed