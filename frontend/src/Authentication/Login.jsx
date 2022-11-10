import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const history = useHistory();

    const submitHandler = async () => {
        setLoading(false);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        console.log(email, password);
        try {
            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                `/api/user/login`,
                { email, password },
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
            setUser(data.user);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
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
            setLoading(false);
        }
    };

    return (
        <VStack spacing="10px" color={"gray.300"}>
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
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        bg={"gray.700"}
                        color="white"
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button colorScheme={"black"} h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <div>
                or
            </div>
            <div>Forgot password ? <a href="/forgot" className="text-blue-600">Click Here</a></div>
        </VStack>
    );
};

export default Login;