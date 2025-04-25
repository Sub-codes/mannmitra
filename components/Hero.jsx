"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef();
  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrolledPosition = window.scrollY;
      const scrolledThreshold = 100;
      if (scrolledPosition > scrolledThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="mx-auto container text-center">
        <h1 className="text-5xl md:text-8xl gradient-title lg:text-[105px] pb-6 font-bold">
          Heal Your Mind <br />
          With Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An empathetic AI companion that listens, supports, and guides you
          through tough times. Chat freely, track your emotions, and book
          appointments with real mental health professionals — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={"/chat-bot"}>
            <Button className={"px-8"} size={"lg"}>
              Start Chatting
            </Button>
          </Link>
          <Link href={"https://github.com/Blue-Onion/mannmitra"}>
            <Button className={"px-8"} variant={"outline"} size={"lg"}>
   
              View on GitHub
              
            </Button>
          </Link>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <div ref={imageRef} className="hero-image">
          <Image
            src="/banner.jpg"
            alt="Banner"
            priority
            className="mx-auto rounded-lg  border shadow-2xl"
            width={1280}
            height={720}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
