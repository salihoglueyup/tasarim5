import type { Lead, ChannelResult } from './types';
import { LEAD_TYPE_LABEL, leadRows } from './format';

/**
 * Telegram bildirimi — Bot API sendMessage (ücretsiz, anlık, SDK yok).
 * Env-gated: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID tanımlı değilse atlanır.
 * Mobil ekip için hızlı; @BotFather ile bot açılır, chat_id getUpdates ile bulunur.
 */

function escapeMd(s: string): string {
  // Telegram MarkdownV2 için özel karakterleri kaçır.
  return s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (m) => `\\${m}`);
}

function buildText(lead: Lead): string {
  const header = `*Yeni ${escapeMd(LEAD_TYPE_LABEL[lead.type])}*`;
  const lines = leadRows(lead).map((r) => `*${escapeMd(r.label)}:* ${escapeMd(r.value)}`);
  return [header, ...lines].join('\n');
}

export async function notifyTelegram(lead: Lead): Promise<ChannelResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { channel: 'telegram', status: 'skipped', detail: 'env yok' };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildText(lead),
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { channel: 'telegram', status: 'error', detail: `HTTP ${res.status} ${text.slice(0, 120)}` };
    }
    return { channel: 'telegram', status: 'ok' };
  } catch (err) {
    return { channel: 'telegram', status: 'error', detail: (err as Error).message };
  }
}
