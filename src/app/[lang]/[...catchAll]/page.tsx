import { notFound, permanentRedirect } from 'next/navigation';
import { resolveSmartRedirect } from '@/lib/seo/smartRedirect';

export default async function CatchAll({
  params,
}: {
  params: Promise<{ lang: string; catchAll: string[] }>;
}) {
  const { lang, catchAll } = await params;
  const path = Array.isArray(catchAll) ? catchAll.join('/') : '';

  if (path) {
    const redirectResult = resolveSmartRedirect(path, lang);
    if (redirectResult && redirectResult.targetUrl) {
      permanentRedirect(redirectResult.targetUrl);
    }
  }

  notFound();
}
