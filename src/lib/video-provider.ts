export interface VideoProviderInterface {
  load(url: string): string;
  getProgress(): number;
  seek(position: number): void;
  play(): void;
  pause(): void;
  destroy(): void;
}

export abstract class VideoProvider implements VideoProviderInterface {
  abstract load(url: string): string;
  abstract getProgress(): number;
  abstract seek(position: number): void;
  abstract play(): void;
  abstract pause(): void;
  abstract destroy(): void;
}

export class YouTubeProvider extends VideoProvider {
  private embedUrl = '';
  load(url: string) {
    const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url;
    this.embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.embedUrl;
  }
  getProgress() { return 0; }
  seek() {}
  play() {}
  pause() {}
  destroy() {}
}

export class VimeoProvider extends VideoProvider {
  private currentUrl = '';
  load(url: string) { this.currentUrl = url; return url; }
  getProgress() { return 0; }
  seek() {}
  play() {}
  pause() {}
  destroy() {}
}

export function getVideoProvider(name: string): VideoProvider {
  if (name === 'youtube') return new YouTubeProvider();
  if (name === 'vimeo') return new VimeoProvider();
  return new YouTubeProvider();
}