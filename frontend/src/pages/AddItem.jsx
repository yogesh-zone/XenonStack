import { Box, Button, Container, FormControl, FormLabel, Input, Text, Textarea, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
// import { Link } from 'react-router-dom';
import { MetaData } from '../components/Utility'
// import ItemsLoading from '../Loading/ItemsLoading';
// import { useHistory } from 'react-router-dom';

function AddItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [model, setModel] = useState("");
    const [fuel, setFuel] = useState("");
    const [price, setPrice] = useState();
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [allImg, setAllImg] = useState([]);

    const toast = useToast();
    const navigate = "useHistory();"
    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const fileUpload = useRef(null);
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }
    const removeImg = () => {
        if (files.length) {
            setAllImg(allImg.filter((i) => (i !== allImg[allImg.length - 1])));
            setFiles(files.filter((i) => (i !== files[files.length])));
        }
    }
    const handleSubmit = async () => {
        setButtonLoading(true);
        console.log("files ", files);
        if (!name || !description || !company || !model || !fuel || !price || !files.length || !state || !city) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setButtonLoading(false);
            return;
        }
        try {
            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/adCard/new`,
                { name, description, company, model, fuel, price, files, state, city, allImg },
                config
            );
            console.log(data);
            if (data.error) {
                toast({
                    title: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
                return
            }
            toast({
                title: "Add Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // localStorage.setItem("userInfo", JSON.stringify(data));
            setButtonLoading(false);
            navigate('/')
            // history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setButtonLoading(false);
        }

        setButtonLoading(false);
        toast({
            title: "Item Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setAllImg(allImg.concat(result));
                    setFiles(files.concat(file));
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);
    const handleUpload = () => {
        fileUpload.current.click();
    }

    const TextH1 = ({ heading }) => {
        return <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"> {heading}</h1>
    }
    const TextH2 = ({ heading }) => {
        return <h1 className="my-3 text-xl font-semibold text-gray-100"> {heading}</h1>
    }
    return (
        <>
            <MetaData title={"Add Item"} />
            <div className="bg-gray-900 h-auto overflow-auto">
                <Container maxW="4xl" centerContent>
                    <Box
                        d="flex"
                        justifyContent="center"
                        p={3}
                        // bg="blackAlpha.400"
                        color="white"
                        w="100%"
                        m="40px 0 15px 0"
                    // borderRadius="lg"
                    // borderWidth="1px"
                    >
                        <TextH1 heading={"POST YOUR AD"} />
                    </Box>
                    <Box
                        d="flex"
                        justifyContent="center"
                        p={4}
                        // bg=
                        color="gray.300"
                        w="100%"
                        mb={10}
                    // borderRadius="lg"
                    // borderWidth="1px"
                    >
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            // bg="white"
                            // borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"INCLUDE SOME DETAILS"} />
                            <VStack spacing="10px" onSubmit={handleSubmit} color="whiteAlpha.800">
                                <FormControl id="name" isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        bg={"gray.700"}
                                        color="white"
                                        type="text"
                                    />
                                    <Text fontSize="xs" className='font-thin'>Mention the key features of your item (e.g. book name, brand, type)  </Text>
                                </FormControl>
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        bg={"gray.700"}
                                        color="white"
                                        type="text"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    // type={show ? "text" : "password"}
                                    // placeholder="Enter password"
                                    />
                                    <Text fontSize="xs" className='font-thin'>Include condition, features and reason for selling</Text>
                                </FormControl>
                                <FormControl id="company">
                                    <FormLabel>Company</FormLabel>
                                    <select id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Choose Company</option>
                                        <option value="Books">Book</option>
                                        <option value="ED">Engineering Drawing</option>
                                        <option value="Electornics">Electornics</option>
                                    </select>
                                </FormControl>
                            </VStack>
                        </Box>
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            // bg="white"
                            // borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"Engine Details"} />
                            <VStack spacing="10px">
                                <FormControl id="model" isRequired >
                                    <FormLabel>Choose Model</FormLabel>
                                    <select id="model"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Model</option>
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
                                </FormControl>
                                <FormControl id="fuel" isRequired>
                                    <FormLabel>Fuel Type</FormLabel>
                                    <select id="fuel"
                                        value={fuel}
                                        onChange={(e) => setFuel(e.target.value)}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Fuel</option>
                                        <option value="first">diesel</option>
                                        <option value="second">Petrol</option>
                                    </select>
                                </FormControl>
                            </VStack>
                        </Box>
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            // bg="white"
                            // borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"SET A PRICE"} />
                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    bg={"gray.700"}
                                    color="white"
                                    type="number"
                                // onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            // bg="white"
                            // borderRadius="md"
                            w="100%"
                            mb={1}>
                            <TextH2 heading={"UPLOAD UP TO 6 PHOTOS"} />
                            {/* <FormControl id="upload" isRequired> */}
                            {/* <FormLabel>Title</FormLabel> */}
                            <div className='flex flex-wrap space-x-2 p-2 space-y-1'>
                                <Input className='hidden' type="file" id="fileInput" accept='image/*' name="fileInput" ref={fileUpload} onChange={handleChange} />
                                {Array(6).fill('').map((_, i) => (
                                    <button type="button" colorScheme="gray" key={i} onClick={allImg[i] ? "" : handleUpload} className={`border-2 ${allImg[i] ? "opacity-100" : "opacity-40"} focus:opacity-100 border-gray-300 h-24 w-24 flex justify-center items-center `}>
                                        {allImg[i] ? <img src={allImg[i]} className="h-[100%] w-[100%]" /> : <svg width="36px" height="36px" viewBox="0 0 1024 1024" data-aut-id="icon" fill='white' className='text-gray-300'>
                                            <path d="M841.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                                        </svg>}
                                        {console.log(i, allImg[i])}
                                    </button>
                                ))}
                            </div>
                            <Button variant={"solid"} onClick={removeImg} colorScheme="green" size={"sm"}>Remove Image</Button>
                        </Box>
                        <Box
                            d="flex"
                            justifyContent="center"
                            p={3}
                            // bg="white"
                            // borderRadius="md"
                            w="100%"
                            mb={1}
                        >
                            <TextH2 heading={"CONFIRM YOUR LOCATION"} />
                            <FormControl id="state" isRequired>
                                <FormLabel>State</FormLabel>
                                <select id="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value=''>Choose State</option>
                                    <option value="Akash">Delhi</option>
                                    <option value="Books">Uttar Pardesh</option>
                                    <option value="ED">Haryana</option>
                                    <option value="Electornics">Punjab</option>
                                    <option value="Electornic">Many More</option>
                                </select>
                            </FormControl>
                            <FormControl id="city">
                                <FormLabel>City</FormLabel>
                                <Input
                                    id="city"
                                    bg={"gray.700"}
                                    color="white"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}

                                />
                            </FormControl>
                        </Box>
                        <div className='p-2 flex flex-col'>
                            <Button variant="solid" colorScheme="green" isLoading={buttonLoading} onClick={handleSubmit} loadingText="It may take few seconds">Post Now</Button>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default AddItem