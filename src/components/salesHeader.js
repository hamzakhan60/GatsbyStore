
import React from "react";

export default function SalesHeader({salesInfo}) {
  
  return (
    <>
    <div className="w-full bg-black h-12 text-white text-lg text-center flex justify-center items-center font-bold font-mono">
        {salesInfo}
    </div>
    <div className="font-extrabold text-black text-2xl  h-24 font-mono text-center flex justify-center items-center">
    ColonBroom Program
</div>
    </>
  );
}
