/**
 * About Me 섹션 데이터
 */
import type { IAboutMeItem } from "../type";
export type { IAboutMeItem } from "../type";

export const ABOUT_ME_DATA: IAboutMeItem[] = [
  {
    id: "performance",
    videoUrl: "https://www.youtube.com/watch?v=s0sWmK7SYnI",
    title: "Performance & Stage Sound",
    description: [
      "I have engineered live performances across major concert halls and large rehearsal spaces at Berklee College of Music, including David Friend Recital Hall, Café 939, and the Berklee Performance Center. Through these experiences, I developed strong proficiency in digital mixing consoles, Dante-based audio networks, and live production workflows.",
      "Beyond institutional venues, I have worked as a freelance engineer in various event spaces, adapting to diverse live setups and hybrid production environments.",
      "Currently, I work at The Substation Event Hall, engineering a wide range of live events from weddings and DJ performances to band shows and multi-genre productions focusing on delivering reliable and context-sensitive sound for each performance.",
    ],
  },
  {
    id: "technical",
    videoUrl: "https://www.youtube.com/watch?v=s0sWmK7SYnI",
    title: "Technical & Systems",
    description: [
      "I design, modify, and maintain audio equipment and technical systems across both studio and live environments. My work includes building passive speakers, ribbon microphones, and radio related devices from soldering to final implementation, and integrating custom built tools into recording workflows.",
      "I have also inspected and optimized rehearsal room systems, including amplifiers, speakers, and signal routing for effects processing. In performance spaces, I have supported technical upgrades such as lighting replacement, cable installation, and wireless microphone system implementation.",
      "Through these experiences, I developed a practical understanding of audio system design, signal flow, and technical infrastructure in real-world production environments.",
    ],
  },
  {
    id: "recorded",
    videoUrl: "https://vimeo.com/1157084622",
    title: "Recorded Music & Sound",
    description: [
      "I have worked on a range of studio based projects, including album and single releases across multiple artists and genres. I maintain an ongoing collaborative relationship with singer-songwriter Chloe, contributing to her solo releases as well as projects with her band, Elephant in a Fridge. I am currently involved in the development of her upcoming full length album, contributing across production, recording, mixing, and visual content.",
      "In addition, I have participated in recording and mixing projects for various independent artists, adapting to different creative directions and production styles. I work comfortably in both analog and digital studio environments, with experience on large format Neve 88RS consoles, API Legacy Plus desks, and SSL Duality hybrid systems.",
      "My experience spans a wide range of musical styles and ensembles, including orchestra, jazz, big band, rock, pop, and K-pop.",
    ],
  },
];
