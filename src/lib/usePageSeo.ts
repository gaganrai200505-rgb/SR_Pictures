import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
}

export function usePageSeo({ title, description }: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | SR Pictures Studio`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [title, description]);
}
