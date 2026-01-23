/**
 * Contact 페이지 관련 상수 데이터
 */
import type { IContactInfo } from "./type";
export type { IContactInfo, IPhoneNumber, ISocialLink } from "./type";

/**
 * 혜은 : 아래 데이터를 수정하시면 Contact 페이지에 반영됩니다.
 */
export const CONTACT_INFO: IContactInfo = {
  // 프로필 이미지 경로
  profileImage: "/images/contact/ContactPic.png",
  name: "Gracie Na",
  title: "Sound Engineer",
  quote: "Let's create something beautiful together.",
  email: "gracie.hna@gmail.com",
  phoneNumbers: [
    {
      country: "US",
      number: "+1 (857) 334 - 4724",
      tel: "+18573344724",
    },
    // 필요시 아래 주석 해제
    // {
    //   country: "KR",
    //   number: "+82 (10) 3923 - 7329",
    //   tel: "+821039237329",
    // },
  ],

  // 소셜 링크
  socialLinks: [
    {
      platform: "instagram",
      handle: "@hyeeuna",
      url: "https://instagram.com/hyeeuna",
    },
  ],

  // 현재 위치
  location: {
    city: "Boston",
    region: "MA",
  },
};
