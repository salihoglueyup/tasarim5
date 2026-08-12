'use client';

import { WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 font-sans p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center max-w-md text-center">
        <div className="bg-blue-50 p-6 rounded-full mb-8">
          <WifiOff className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-gray-900">
          Bağlantı Koptu
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Görünüşe göre internet bağlantınızda bir sorun var. Bağlantınız geri geldiğinde sayfa otomatik olarak yenilenecektir. Veya aşağıdaki butona basarak manuel olarak deneyebilirsiniz.
        </p>

        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
        >
          Sayfayı Yenile
        </button>
      </div>
    </div>
  );
}
