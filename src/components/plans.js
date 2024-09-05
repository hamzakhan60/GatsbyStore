import React from "react";
const Plan=({header,supply,price,detail,color,isSelected})=>{

    return (<>
          <div className={`border-2 bg-[#F7F9F8] ${isSelected ? ' border-[#1C9E75]' : ''}  rounded-lg  flex-1 mb-4 md:mb-0`}>
                        <div className={`flex items-center justify-center  bg-[${color}]`}>
                            <h3 className="text-white h-8 flex justify-center items-center  font-bold text-sm">{header} </h3>
                        </div>
                        <div className="flex mt-3 w-full flex-row justify-evenly ">
                        <div>
                            <div className={`w-5 h-5  ml-5 rounded-full border border-black ${isSelected ? 'bg-blue-400' : ''} `}></div>
                        </div>
                            <div className=" w-30 ">
                                <p className="text-lg text-center font-semibold">{supply}-Month supply</p>
                                <p className="text-3xl font-bold">${price} <span className="text-sm font-normal">/per bottle</span></p>

                            </div>
                            <div>
                            <ul className="text-sm text-gray-600 space-y-1 mt-2">
                            {
                                detail && detail.map((li,key)=>{
                                    return <li key={key}>✔️ {li}</li>
                                })
                            }
                            
                        </ul>
                            </div>
                        </div>
                        
                    </div>

    </>)
}
export default Plan