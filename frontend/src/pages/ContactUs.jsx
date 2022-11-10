import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
// import { useHistory } from 'react-router-dom';

function ContactUs() {
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const toast = useToast();
    const navigate = "useHistory();"
    const handleSubmit = () => {
        setButtonLoading(true);
        if (!email || !description || !message) {
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
        setButtonLoading(false);
        toast({
            title: "Message Sent",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        navigate('/');
    }
    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <form action="#" class="space-y-8">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter your email.." required />
                    </div>
                    <div>
                        <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <Button isLoading={buttonLoading} variant={"solid"} colorScheme="green" onClick={handleSubmit}>Send Message</Button>
                    {/* <button type="submit" class="py-3 px-5 text-sm font-medium text-center rounded-lg sm:w-fit  hover:bg-gray-600  text-white bg-gray-500 focus:ring-gray-800 active:bg-gray-700">Send message</button> */}
                </form>
            </div>
        </section>
    )
}

export default ContactUs;