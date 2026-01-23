"use client";

import Container from "@/components/layout/container";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CONTACT_INFO } from "@/../data/contact/data";

const ContactPage = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
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
              src={CONTACT_INFO.profileImage}
              alt={CONTACT_INFO.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Name & Title */}
          <div className="space-y-3 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-cormorant font-medium text-gray-900 tracking-tight">
              {CONTACT_INFO.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">
              {CONTACT_INFO.title}
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-gray-600 font-cormorant text-lg md:text-2xl leading-relaxed italic">
              "{CONTACT_INFO.quote}"
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
                {isCopied ? "Copied!" : CONTACT_INFO.email}
              </span>
            </button>

            {/* Phone Numbers */}
            {CONTACT_INFO.phoneNumbers.length > 0 && (
              <div className="group flex items-start justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 mt-1" strokeWidth={1.5} />
                <div className="flex flex-col gap-1 items-start">
                  {CONTACT_INFO.phoneNumbers.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="font-inter text-sm tracking-wide hover:font-medium transition-all"
                    >
                      <span className="text-gray-400 text-xs mr-2">{phone.country}</span>
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {CONTACT_INFO.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg"
              >
                {social.platform === "instagram" && (
                  <svg className="w-4 h-4" strokeWidth={1.5} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )}
                <span className="font-inter text-sm tracking-wide">{social.handle}</span>
              </a>
            ))}

            {/* Location */}
            <div className="flex items-center justify-center gap-3 text-gray-400 w-full py-2 mt-2">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <div className="flex flex-col items-center">
                <span className="font-inter text-sm tracking-wide text-gray-600">
                  Currently based in{" "}
                  <span className="font-medium text-gray-800">
                    {CONTACT_INFO.location.city}, {CONTACT_INFO.location.region}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
