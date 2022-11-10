import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router";

const Signup = ({ setUser }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    // const history = useHistory();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            setPicLoading(false);
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        console.log(name, email, password, phone);
        const obj = {
            name, email, password, phone
        }
        try {
            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/user/register`,
                { name, email, password, phone },
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
                setPicLoading(false);
                return
            }
            setUser(data.user);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            navigate("/");
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
            setPicLoading(false);
        }
    };



    return (
        <VStack spacing="5px" color={"gray.300"}>
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    value={name}
                    placeholder="Enter Your Name"
                    bg={"gray.700"}
                    color="white"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    bg={"gray.700"}
                    color="white"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                    value={phone}
                    type="number"
                    bg={"gray.700"}
                    color="white"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setPhone(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        type={show ? "text" : "password"}
                        bg={"gray.700"}
                        color="white"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button colorScheme={"black"} h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={confirmpassword}
                        type={show ? "text" : "password"}
                        bg={"gray.700"}
                        color="white"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button colorScheme={"black"} h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl> */}
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={picLoading}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;