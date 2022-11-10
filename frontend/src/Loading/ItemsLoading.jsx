import React from 'react'
import animationData from "../Animations/carLoading.json";
import Lottie from 'react-lottie';
function ItemsLoading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <>
            <Lottie
                options={defaultOptions}
                width={"60%"}
                isClickToPauseDisabled={true}
                style={{ cursor: "default" }}
            />
        </>
    )
}

export default ItemsLoading