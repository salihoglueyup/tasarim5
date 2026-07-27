export default function Loading() {
  return (
    <div 
      className="min-h-[75vh] w-full flex flex-col items-center justify-center p-6 bg-[var(--color-background)] relative overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Arkaplan İkincil Parlama Efekti (GPU İzoleli) */}
      <div 
        className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      />

      {/* Merkez Logo ve Pulsing Yükleniyor Halka Efekti */}
      <div className="relative flex flex-col items-center justify-center z-10 max-w-2xl w-full mx-auto space-y-8 animate-pulse">
        {/* İskelet Başlık */}
        <div className="w-48 h-8 bg-slate-200 dark:bg-slate-800/80 rounded-full mx-auto shadow-inner" />
        <div className="w-3/4 h-12 bg-slate-300 dark:bg-slate-800 rounded-2xl mx-auto shadow-inner" />
        <div className="w-1/2 h-6 bg-slate-200 dark:bg-slate-800/60 rounded-xl mx-auto" />

        {/* İskelet Kart Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
          <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="w-2/3 h-5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="w-full h-3 bg-slate-200/60 dark:bg-slate-800/60 rounded" />
            </div>
          </div>
          <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="w-full h-3 bg-slate-200/60 dark:bg-slate-800/60 rounded" />
            </div>
          </div>
          <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="w-1/2 h-5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="w-full h-3 bg-slate-200/60 dark:bg-slate-800/60 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
