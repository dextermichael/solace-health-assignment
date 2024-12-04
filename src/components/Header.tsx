import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="border-b py-3">
      <div className="flex max-w-6xl mx-auto justify-between px-3">
        <div>
          <Image src={"/logo.svg"} alt="" width={120} height={80}/>
        </div>
      </div>
    </div>
  );
}
