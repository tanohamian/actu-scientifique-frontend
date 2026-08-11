type MediaKind = "image" | "video" | "audio" | "pdf" | "link";

/**
 * Détecte le type de média à partir du mimeType (prioritaire) et/ou de l'URL.
 * Nettoie le query string / hash avant de tester l'extension, contrairement
 * à l'ancienne regex qui exigeait l'extension en toute fin de chaîne.
 */
export function getMediaKind(src?: string, mimeType?: string): MediaKind {
  if (mimeType) {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    if (mimeType.startsWith("audio/")) return "audio";
    if (mimeType === "application/pdf") return "pdf";
  }

  if (!src) return "link";

  let pathname = src;
  try {
    pathname = new URL(src).pathname;
  } catch {
    // src n'est pas une URL absolue valide (ex: blob:, ou saisie incomplète)
    pathname = src.split("?")[0].split("#")[0];
  }

  const ext = pathname.split(".").pop()?.toLowerCase() ?? "";

  if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext))
    return "image";
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";
  if (["mp3", "wav", "m4a"].includes(ext)) return "audio";
  if (ext === "pdf") return "pdf";

  return "link";
}

/**
 * Extrait le nom de domaine pour l'affichage du fallback "lien".
 */
export function getHostname(src: string): string {
  try {
    return new URL(src).hostname.replace(/^www\./, "");
  } catch {
    return src;
  }
}
