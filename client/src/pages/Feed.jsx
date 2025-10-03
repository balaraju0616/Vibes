import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'

const Feed = () => {
  const [feeds, setfeeds]=useState([])
  const [loading, setLoading]=useState(true)
  const fetchFeeds=async () => {
    setfeeds(dummyPostsData)
    setLoading(false);
  }

  useEffect(()=>{
    fetchFeeds()
  },[])
  return !loading ? (
  <div className="flex h-screen w-full bg-[#F7F8FA]">
    {/* Sidebar is rendered separately and is fixed width */}

    <div className="flex-1 ml-60 py-10 flex items-start justify-center xl:gap-8 h-screen overflow-y-auto">
      {/* Stories and Post list */}
      <div>
        <StoriesBar/>
        <div className='p-4 space-y-6'>
          List of post
        </div>
      </div>
      {/* Right Sidebar */}
      <div>
        <div>
          <h1>Sponsored</h1>
        </div>
        <h1>Recent messages</h1>
      </div>
    </div>
  </div>
) : <Loading />;

}

export default Feed
