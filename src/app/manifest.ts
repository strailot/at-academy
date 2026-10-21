import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AT Academy — SSC Chemistry',
    short_name: 'AT Academy',
    description: 'SSC Chemistry learning platform — structured lessons, practice and board-style exam preparation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f4ff',
    theme_color: '#0860D0',
    icons: [{ src: '/logo/at-academy-logo.jpg', sizes: '330x330', type: 'image/jpeg' }],
  };
}
