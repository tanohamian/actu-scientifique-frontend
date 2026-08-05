import { getHostname, getMediaKind } from "../utils/mediaUtils";

export default function MediaPreview({
  src,
  mimeType,
  onReplace,
}: {
  src: string;
  mimeType?: string;
  onReplace?: () => void;
}) {
  const kind = getMediaKind(src, mimeType);

  switch (kind) {
    case "video":
      return (
        <video src={src} controls className="max-w-full max-h-60 rounded-lg" />
      );
    case "audio":
      return <audio src={src} controls className="w-full" />;
    case "image":
      return (
        <img
          src={src}
          alt="Aperçu"
          className="max-w-full max-h-60 object-contain rounded-lg"
        />
      );
    case "pdf":
      return (
        <div className="flex flex-col items-center gap-2 text-white text-sm py-2">
          <span>Document PDF</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline"
          >
            Ouvrir le PDF dans un nouvel onglet
          </a>
        </div>
      );
    default:
      // lien générique (site web, article, etc.) : pas de garantie qu'un
      // iframe passe les headers X-Frame-Options, donc on affiche une carte
      // avec le domaine plutôt que de tenter un embed qui peut être bloqué
      return (
        <div className="flex flex-col items-center gap-1 text-white text-sm py-2">
          <span className="text-white/70">Aperçu non disponible</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline break-all text-center"
          >
            {getHostname(src)}
          </a>
        </div>
      );
  }
}
