import { useTexture, useVideoTexture } from "@react-three/drei";

export function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
