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
    <div className="h-full overflow-y-auto">
      {/* Stories Bar - At the top */}
      <StoriesBar/>
      
      {/* Main Content */}
      <div className="flex justify-center py-10 xl:pr-5 xl:gap-8">
        {/* Posts Section */}
        <div className="flex-1 max-w-2xl">
          <div className='p-4 space-y-6'>
            List of post
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden xl:block w-80 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
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