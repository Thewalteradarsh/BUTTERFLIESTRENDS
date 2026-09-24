"use client";

import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function Hero() {
  return (
    <>
      <div className="block md:hidden w-full">
        <HeroMobile />
      </div>
      <div className="hidden md:block w-full">
        <HeroDesktop />
      </div>
    </>
  );
}
