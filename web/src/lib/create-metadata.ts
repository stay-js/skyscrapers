import type { Metadata } from 'next';

export function createMetadata({
  path,
  title,
  absoluteTitle,
  description,
  noIndex,
}: {
  path: string;
  title: string;
  absoluteTitle?: string;
  description?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    authors: [{ name: 'Zétény Nagy', url: 'https://znagy.hu' }],
    creator: 'Zétény Nagy',

    keywords: [''].join(', '),

    title: absoluteTitle ?? `${title} - Skyscrapers`,
    description,

    applicationName: 'Skyscrapers',

    robots: noIndex
      ? {
          index: false,
          follow: false,
          'max-video-preview': -1,
          'max-image-preview': 'none',
          'max-snippet': -1,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    openGraph: {
      type: 'website',
      url: `${path}`,
      title: absoluteTitle ?? `${title} - Skyscrapers`,
      description,
      siteName: 'Skyscrapers',
      locale: 'hu-HU',
    },

    twitter: {
      card: 'summary',
      title: absoluteTitle ?? `${title} - Skyscrapers`,
      description,
    },

    icons: {
      icon: '/favicon.ico',
    },
  };
}
