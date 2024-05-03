import { FC, useRef, useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';

import { Loader } from '~/components/loader';
import { VideoPreviewProps } from './video-preview-interface';

export const VideoPreview: FC<VideoPreviewProps> = (props) => {
  const { screenshotTs = 0, src, ...imageProps } = props;
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    videoRef.current.currentTime = screenshotTs;

    const drawFrame = (v: HTMLVideoElement, c: CanvasRenderingContext2D) => {
      const { videoWidth, videoHeight } = v;

      c.canvas.width = videoWidth;
      c.canvas.height = videoHeight;
      c.drawImage(v, 0, 0, videoWidth, videoHeight);
      if (canvasRef.current) {
        setCanvasUrl(canvasRef.current.toDataURL('png', 4));
      }
    };

    const ctx = canvasRef.current.getContext('2d');
    drawFrame(videoRef.current, ctx!);

    const playingHandler = function () {
      drawFrame(videoRef.current!, ctx!);
    };

    videoRef.current.addEventListener('loadeddata', playingHandler);

    return () => {
      if (!videoRef.current) return;
      videoRef.current.removeEventListener('loadeddata', playingHandler);
    };
  }, []);

  return (
    <>
      <video preload={'auto'} playsInline muted ref={videoRef} style={{ display: 'none' }}>
        <source src={src} />
      </video>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {canvasUrl && (canvasUrl.length <= 7 ? <Loader/> : <Image {...imageProps} src={canvasUrl} />)}
    </>
  );
};
