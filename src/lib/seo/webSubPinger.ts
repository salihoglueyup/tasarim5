import { BASE_URL } from '@/lib/seo';

/**
 * Faz 142: WebSub / PubSubHubbub Anlık Bildirim Motoru (Google Hub Pinger)
 * 
 * Yeni bir blog yazısı veya RSS içeriği yayınlandığında Google PubSubHubbub Hub'ına
 * anında HTTP POST atarak arama botlarının beklemeden beslemeyi taramasını sağlar.
 */
export async function publishWebSubPing(feedUrl: string = `${BASE_URL}/feed.xml`): Promise<boolean> {
  try {
    const params = new URLSearchParams();
    params.append('hub.mode', 'publish');
    params.append('hub.url', feedUrl);

    fetch('https://pubsubhubbub.appspot.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }).catch((err) => {
      console.error('WebSub ping background fetch error:', err);
    });

    return true;
  } catch (error) {
    console.error('WebSub ping execution error:', error);
    return false;
  }
}
