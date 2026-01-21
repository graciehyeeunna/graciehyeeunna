"use client";

import Container from "@/components/layout/container";
import { Mail, Instagram, MapPin, Phone, Check, Copy } from "lucide-react";
import Image from "next/image";
import ContactPic from "@/assets/images/ContactPic.png";
import { useState } from "react";

const ContactPage = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("gracie.hna@gmail.com");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white fade-in">
      <Container>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-10">

          {/* Profile Image */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center group">
            <Image
              src={ContactPic}
              alt="Gracie Na"
              fill
              className="object-cover"
              priority
              placeholder="blur" // 이미지 로딩 시 블러 효과 (선택사항)
            />
          </div>

          {/* Name & Title */}
          <div className="space-y-3 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-cormorant font-medium text-gray-900 tracking-tight">
              Gracie Na
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">
              Sound Engineer
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-gray-600 font-cormorant text-lg md:text-2xl leading-relaxed italic">
              "Let's create something beautiful together."
            </p>
          </div>

          {/* Divider */}
          <div className="w-10 h-[1px] bg-gray-200 my-4"></div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 items-center w-full max-w-xs animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={handleCopyEmail}
              className="group flex items-center justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg cursor-pointer relative"
              title="Click to copy email"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-500" strokeWidth={1.5} />
              ) : (
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              )}
              <span className="font-inter text-sm tracking-wide">
                {isCopied ? "Copied!" : "gracie.hna@gmail.com"}
              </span>
            </button>

            {/* Phone Numbers */}
            <div className="group flex items-start justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 mt-1" strokeWidth={1.5} />
              <div className="flex flex-col gap-1 items-start">
                <a href="tel:+18573344724" className="font-inter text-sm tracking-wide hover:font-medium transition-all">
                  <span className="text-gray-400 text-xs mr-2">US</span> +1 (857) 334 - 4724
                </a>
                {/* <a href="tel:+821039237329" className="font-inter text-sm tracking-wide hover:font-medium transition-all">
                  <span className="text-gray-400 text-xs mr-2">KR</span> +82 (10) 3923 - 7329
                </a> */}
              </div>
            </div>

            <a
              href="https://instagram.com/hyeeuna"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-inter text-sm tracking-wide">@hyeeuna</span>
            </a>

            <div className="flex items-center justify-center gap-3 text-gray-400 w-full py-2 mt-2">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <div className="flex flex-col items-center">
                <span className="font-inter text-sm tracking-wide text-gray-600">Currently based in <span className="font-medium text-gray-800">Boston, MA</span></span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
