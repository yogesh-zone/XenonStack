import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import ItemsLoading from '../Loading/ItemsLoading';

function Filter() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [Course, setCourse] = useState("");
    const [Semester, setSemester] = useState("");
    const [queryLoading, setQueryLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setQueryLoading(true);
        console.log(name, Course, Semester, category);
        setName("");
        setCategory("All");
        setCourse("");
        setSemester("");
        setTimeout(() => {
            setQueryLoading(false);
        }, 3000)
        console.log("handling submit form");

    }
    return (
        <>
            <div className=' sticky top-0 lg:top-[15vh] overflow-hidden'>

                <form className='bg-gray-900 flex -mt-0.5 flex-row flex-wrap justify-between lg:justify-around items-center p-3'
                    onSubmit={handleSubmit}>
                    <input
                        value={name}
                        type="text"
                        placeholder="Search by Name.."
                        onChange={(e) => setName(e.target.value)}
                        className=" focus:ring-primary-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700    my-1 w-[32%] lg:w-[20%] lg:ml-3 border outline-none focus:bg-gray-600 text-sm rounded-lg  p-2" />


                    <select className="focus:ring-primary-500 placeholder-gray-400 border-gray-600 bg-gray-700  w-[32%] lg:w-[20%] lg:ml-3 md:w-[22%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg p-2 "
                        value={Course && Course}>
                        <option> Company</option>
                        <option value="B.Tech" >Honda</option>
                        <option value="BBA">Marui & suziki</option>
                        <option value="MBA">Nexa</option>
                        <option value="MBA">TATA</option>
                        <option value="MBA">Mahindra</option>
                        <option value="MBA">Many more...</option>
                    </select>
                    <select
                        className="focus:ring-primary-500 placeholder-gray-400 border-gray-600 bg-gray-700 w-[32%] lg:w-[20%] lg:ml-3 md:w-[22%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg p-2 "
                        value={Semester && Semester}
                        onChange={(e) => { setSemester(e.target.value) }}>
                        <option >Model</option>
                        <option value="first">2021</option>
                        <option value="second">2020</option>
                        <option value="third">2019</option>
                        <option value="fourth">2018</option>
                        <option value="fifth">2017</option>
                        <option value="r" >2016</option>
                        <option value="q" >2014</option>
                        <option value="p" >2015</option>
                        <option value="o" >2014</option>
                        <option value="l" >2013</option>
                        <option value="m" >2012</option>
                    </select>
                    <select
                        placeholder='category'
                        className="focus:ring-primary-500 placeholder-gray-400 border-gray-600 bg-gray-700 w-[32%] lg:w-[20%] lg:ml-3 md:w-[20%] border outline-none text-white focus:bg-gray-600 text-sm rounded-lg p-2 "
                        value={category && category}
                        onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="All">State</option>
                        <option value="Akash">Delhi</option>
                        <option value="Books">Uttar Pardesh</option>
                        <option value="ED">Haryana</option>
                        <option value="Electornics">Punjab</option>
                        <option value="Electornic">Many More</option>
                    </select>
                    <div className='mr-auto ml-2 lg:mr-0 md:ml-0 py-2 lg:py-0'>
                        <Button type='submit' isLoading={queryLoading} variant={"solid"} background="green.600" textColor={"white"} _hover={{ background: "green.700" }} _active={{ background: "green.900" }} rightIcon={<AiOutlineSearch />}>
                            Search Car
                        </Button>
                    </div>
                </form>
                {queryLoading &&
                    <div className='h-[15vh] sm:h-[25vh] lg:h-[30vh]  -mt-1 overflow-hidden'>
                        <ItemsLoading />
                    </div>}
            </div>

        </>
    )
}

export default Filter