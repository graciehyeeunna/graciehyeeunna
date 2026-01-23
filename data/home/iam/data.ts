/**
 * I'm a 섹션 (Role) 데이터
 * 혜은 : iam 의 카테고리별로 label, 카드 이미지, 클릭시 노출되는 영상 및 카드 하단의 description(설명추가) 부분 데이터 가공 위치 입니다.
 */
import type { IRoleData } from "../type";
export type { TRole, IRoleData } from "../type";

export const ROLE_DATA: IRoleData[] = [
  {
    id: "live-sound",
    label: "Live Sound Engineer",
    title: "Upside Down Universe",
    videoUrl: "https://vimeo.com/1060116537",
    thumbnail: "/images/home/iam/live-sound/UpsidedownUniverse.png",
    description: "An interdisciplinary live production integrating original music, visual media, and immersive technology.\n\nI worked as the streaming engineer for this production, mixing orchestral and multimedia audio for the live broadcast from the BPC studio. I collaborated with the production and sound design teams to ensure that pre-produced tracks and background sound elements were accurately translated into the streaming mix.",
  },
  {
    id: "av-tech",
    label: "A/V",
    title: "Lady Gaga Ensemble — The Monster Ball",
    videoUrl: "https://vimeo.com/manage/videos/1156782343",
    thumbnail: "/images/home/iam/av-tech/ladygaga.jpg",
    description: "A large-scale ensemble performance featuring the music of Lady Gaga, performed by Berklee student musicians.\n\nFrom September 4 to November 22, I handled rehearsal audio for the production, including live mixing, technical setup, and signal flow optimization. I adapted system configurations to support efficient rehearsals and the final performance.",
  },
  {
    id: "music-producer",
    label: "Music Production & Engineering",
    title: "Moonchild — Floor Green",
    videoUrl: "https://www.youtube.com/watch?v=pjiqxhwYpZ0",
    thumbnail: "/images/home/iam/music-producer/Sleepwalk.jpg",
    description: "A project by Floor Green, reinterpreting Moonchild through a contemporary sonic approach.\n\nI contributed to the production and recording process as an audio engineer, supporting the technical and sonic development of the track. Beyond this project, I have worked closely with singer-songwriter Chloe on her original releases, contributing to production and audio engineering across her solo and band projects.",
  },
];
