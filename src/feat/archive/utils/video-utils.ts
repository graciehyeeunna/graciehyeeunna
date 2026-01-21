/**
 * @function getVideoId
 * @description 비디오 링크에서 ID를 추출하는 함수
 */
export const getVideoId = (links: string[]) => {
  const videoLink = links.find(
    (l) =>
      l.includes("vimeo.com") ||
      l.includes("youtube.com") ||
      l.includes("youtu.be")
  );
  if (!videoLink) return { id: null, type: null };

  if (videoLink.includes("vimeo.com")) {
    const videoId = videoLink.split("video=")[1] || videoLink.split("/").pop();
    return { id: videoId?.split("?")[0] || null, type: "vimeo" };
  }

  if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
    const videoId = videoLink.includes("watch?v=")
      ? videoLink.split("v=")[1].split("&")[0]
      : videoLink.split("/").pop();
    return { id: videoId || null, type: "youtube" };
  }

  return { id: null, type: null };
};

/**
 * @function getVideoThumbnail
 * @description 비디오 ID와 타입을 기반으로 썸네일 URL을 반환하는 함수
 */
export const getVideoThumbnail = (links: string[]): string | null => {
  const { id, type } = getVideoId(links);
  if (!id) return null;

  if (type === "vimeo") {
    // vumbnail.com은 Vimeo 썸네일을 제공하는 공개 서비스입니다.
    return `https://vumbnail.com/${id}.jpg`;
  }

  if (type === "youtube") {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }

  return null;
};

/**
 * @function getEmbedUrl
 * @description 비디오 링크를 임베드 가능한 URL로 변환하는 함수
 */
export const getEmbedUrl = (links: string[]) => {
  const { id, type } = getVideoId(links);
  if (!id) return null;

  if (type === "vimeo") {
    return `https://player.vimeo.com/video/${id}`;
  }

  if (type === "youtube") {
    return `https://www.youtube.com/embed/${id}`;
  }

  return null;
};

/**
 * @function getPreviewEmbedUrl
 * @description 호버 시 자동재생되는 비디오 URL을 반환하는 함수 (muted, autoplay, loop)
 */
export const getPreviewEmbedUrl = (links: string[]): string | null => {
  const { id, type } = getVideoId(links);
  if (!id) return null;

  if (type === "vimeo") {
    // Vimeo 자동재생 파라미터: autoplay, muted, loop, background (controls 숨김)
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`;
  }

  if (type === "youtube") {
    // YouTube 자동재생 파라미터: autoplay, mute, loop, controls=0, playlist (loop용)
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}`;
  }

  return null;
};
