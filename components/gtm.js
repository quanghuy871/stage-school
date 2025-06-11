// app/GTM.tsx
'use client';

import { useEffect } from 'react';

const GTM_ID = 'GTM-P7G95Z9T'; // Replace with your actual GTM ID

export function GTM() {
  useEffect(() => {
    if (!GTM_ID) return;

    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);
  }, []);

  return null;
}