import type { Lead, LeadType } from './types';

/** Lead tipinin Türkçe insan-okur etiketi. */
export const LEAD_TYPE_LABEL: Record<LeadType, string> = {
  contact: 'İletişim Formu',
  quote: 'Teklif Talebi',
  newsletter: 'Bülten Kaydı',
  callback: 'Geri Arama Talebi',
};

/** Lead alanlarını { etiket, değer } satırlarına indir (boşları at). */
export function leadRows(lead: Lead): Array<{ label: string; value: string }> {
  const rows: Array<{ label: string; value: string }> = [];
  if (lead.name) rows.push({ label: 'Ad Soyad', value: lead.name });
  if (lead.phone) rows.push({ label: 'Telefon', value: lead.phone });
  if (lead.email) rows.push({ label: 'E-posta', value: lead.email });
  if (lead.message) rows.push({ label: 'Mesaj', value: lead.message });

  if (lead.meta) {
    for (const [key, val] of Object.entries(lead.meta)) {
      if (val === undefined || val === null || val === '') continue;
      rows.push({ label: key, value: String(val) });
    }
  }
  return rows;
}
