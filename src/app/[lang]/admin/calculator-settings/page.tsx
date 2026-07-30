import { prisma } from '@/lib/prisma';
import { defaultCalcConfig } from '@/lib/hesaplayici';
import { updateCalculatorConfig } from './actions';

export default async function CalculatorSettingsPage() {
  const configRecord = await prisma.calculatorConfig.findFirst();

  const config = configRecord || defaultCalcConfig;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">Hesaplayıcı Ayarları</h1>
        <p className="text-[var(--color-secondary)]">Ön yüzdeki (hesaplayici) tahmini aidat modülünün çarpanlarını ve birim maliyetlerini buradan güncelleyebilirsiniz.</p>
      </div>

      <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        <form action={updateCalculatorConfig} className="flex flex-col gap-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Taban Aidat (Bağımsız Bölüm Başına ₺)</label>
              <input name="baseCostPerUnit" type="number" defaultValue={config.baseCostPerUnit} className="border border-gray-300 dark:border-white/10 rounded-lg p-3 bg-transparent" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Güvenlik Hizmeti (Sabit Eklenti ₺)</label>
              <input name="securityAddon" type="number" defaultValue={config.securityAddon} className="border border-gray-300 dark:border-white/10 rounded-lg p-3 bg-transparent" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Havuz Bakımı (Sabit Eklenti ₺)</label>
              <input name="poolAddon" type="number" defaultValue={config.poolAddon} className="border border-gray-300 dark:border-white/10 rounded-lg p-3 bg-transparent" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Yeşil Alan Bakımı (Sabit Eklenti ₺)</label>
              <input name="greenAddon" type="number" defaultValue={config.greenAddon} className="border border-gray-300 dark:border-white/10 rounded-lg p-3 bg-transparent" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Asansör (Adet Başına Sabit Eklenti ₺)</label>
              <input name="elevatorAddon" type="number" defaultValue={config.elevatorAddon} className="border border-gray-300 dark:border-white/10 rounded-lg p-3 bg-transparent" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Tasarruf Oranı (Örn: 0.22 = %22)</label>
              <input name="savingsRate" type="number" step="0.01" defaultValue={config.savingsRate} className="border border-gray-300 dark:border-white/10 rounded-lg p-3 bg-transparent" />
            </div>
          </div>

          <button type="submit" className="bg-[var(--color-primary)] text-white py-3 px-6 rounded-xl font-bold w-fit hover:opacity-90">
            Ayarları Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}
