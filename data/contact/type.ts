/**
 * Contact 페이지 관련 타입 정의
 */

export interface IPhoneNumber {
  country: string;
  number: string;
  tel: string;
}

export interface ISocialLink {
  platform: string;
  handle: string;
  url: string;
}

export interface IContactInfo {
  profileImage: string;
  name: string;
  title: string;
  quote: string;
  email: string;
  phoneNumbers: IPhoneNumber[];
  socialLinks: ISocialLink[];
  location: {
    city: string;
    region: string;
  };
}
