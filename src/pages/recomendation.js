
import React from "react";
import { useState } from "react";
import SalesHeader from "../components/salesHeader";
import Plan from "../components/plans";

export default function Recomendation() {
    const [selectedPlan, setSelectedPlan] = useState("mostPopular");

    const details = [
        "180 servings",
        "3 bottles delivered",
        "Strawberry flavor",
        "Pause subscription anytime"
    ];
    const longLastingDetail = [
        "360 servings",
        "6 bottles delivered",
        "Strawberry flavor",
        "Pause subscription anytime"
    ]

    return (
        <>
            <SalesHeader salesInfo={"LABOR DAY SALE UP TO -63% OFF!"} />
            <div className="bg-[url('https://basicren.dk/wp-content/framework/cache-image/top_1@2x-2400x1000.jpg')] w-full h-full pt-5 pb-5">
            <div className="bg-white  shadow-lg rounded-lg overflow-hidden max-w-6xl pt-5 mx-auto my-8">
               
                <div className="w-full flex justify-center items-center">
                    <div className="bg-teal-600 rounded  w-40 h-8 ">
                        <p className="text-white text-xs h-8 flex flex-row justify-center items-center font-semibold">OUR RECOMMENDATION</p>
                    </div>
                </div>

               
                <div className="p-6 w-full md:flex md:justify-between md:items-center">
            
                    <div className=" flex flex-col  items-center w-full">
                        <h1 className="text-4xl w-1/2 text-center font-sans font-bold text-gray-800">
                            Our recommendation for achieving your goals
                        </h1>
                        <p className="-mt-5 w-3/4 text-center  text-lg text-gray-600">
                            Based on your data, we recommend starting with the <strong>3-month subscription plan</strong> to achieve effective results or  <strong>6-month subscription plan</strong> to form a longer-lasting routine.
                        </p>
                    </div>

                    

                </div>
                <div className="flex flex-row justify-evenly ">
                    <div className="flex flex-col w-2/5">
                    <div className=" w-full  h-1/2  flex justify-center relative">
                        <img
                            src="https://colonbroom.com/_next/static/media/cb-sub-3.b779d80a.png"
                            alt="ColonBroom Product"
                            className="w-full h-full"
                        />
                        <div className="absolute top-10 right-10 bg-red-500 text-white px-2 py-1 rounded-full text-sm transform translate-x-1/2 -translate-y-1/2">
                            +SECRET GIFT
                        </div>
                      
                        </div>
                        <img src="https://colonbroom.com/_next/static/media/product_pros.e8fd872c.webp"/>
                    </div>
                    
                    <div className="w-2/5 flex flex-col justify-between item-center  md:flex space-y-6">


                        <Plan header={"MOST POPULAR | EFFECTIVE RESULTS "} supply={3} price={43} detail={details} color={"#1C9E75"} isSelected={selectedPlan === "mostPopular"} onClick={() => setSelectedPlan("mostPopular")} className="cursor-pointer" />
                        <Plan header={"BEST VALUE | LONGER-LASTING ROUTINE "} supply={6} price={29.99} detail={longLastingDetail} color={"#F7B500"} isSelected={selectedPlan === "longerLasting"} onClick={() => setSelectedPlan("longerLasting")} className="cursor-pointer" />
                        <div className="p-6 text-center">
                            <button className="bg-[#2FD7A2] hover:bg-green-500 text-white w-full h-12 -mt-8 rounded-full font-bold py-2 px-6 ">
                                TAKE THIS OFFER
                            </button>
                            <p className="text-gray-500 mt-4">I do not want this offer</p>
                            <img src="https://colonbroom.com/_next/static/media/security.775805f3.png" className="w-full border "/>
                     
                        </div>

                    </div>

                </div>


            </div>
            </div>
        </>
    );
}
