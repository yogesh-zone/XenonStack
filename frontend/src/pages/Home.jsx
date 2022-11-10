import React from 'react'
import AllItems from '../components/AllItems';
import Filter from '../components/Filter';
import { MetaData } from "../components/Utility"
function Home() {
    return (
        <>
            <MetaData title={"College Bazaar"} />
            <div className="bg-gray-900 -mt-0.5 text-white flex flex-col items-center space-y-2 py-2">
                <p className="h-[2vh] md:h-[5.5vh]"></p>
                <h1 className='text-2xl sm:text-3xl font-extrabold tracking-light text-gray-900 dark:text-white'>Get Any Car on Car Bazaar</h1>
                <h6 className="text-md text-gray-400">Everything you are looking for!</h6>
            </div>
            <Filter />
            <AllItems />
        </>
    )
}

export default Home;