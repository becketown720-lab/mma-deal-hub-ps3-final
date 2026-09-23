import React, { useEffect } from 'react';

declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
  }
}

const DISQUS_SHORTNAME = 'mma-deal-hub';
const DISQUS_SCRIPT_ID = 'disqus-embed-script';
const PAGE_URL = 'https://mma-deal-hub-w5.vercel.app/';
const PAGE_IDENTIFIER = 'home';

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    const disqusConfig = function (this: { page: { url: string; identifier: string } }) {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
    };

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: disqusConfig,
      });
    } else {
      window.disqus_config = disqusConfig;
      if (!document.getElementById(DISQUS_SCRIPT_ID)) {
        const script = document.createElement('script');
        script.id = DISQUS_SCRIPT_ID;
        script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
        script.setAttribute('data-timestamp', String(Date.now()));
        (document.head || document.body).appendChild(script);
      }
    }
  }, []);

  return (
    <section id="disqus-comments-section" className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <p className="text-sm font-semibold text-slate-700 mb-4">
        Tell us what worked for you and what didn't — we appreciate your feedback!
      </p>
      <div id="disqus_thread" />
    </section>
  );
};

export default DisqusComments;
