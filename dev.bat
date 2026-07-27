@echo off
chcp 65001 > nul
title Alo Yonetim -- Gelistirici Kontrol Paneli

:MENU
cls
echo.
echo  +===========================================================+
echo  ^|       ALO YONETIM -- GELiSTiRiCi KONTROL PANELi         ^|
echo  ^|          Next.js 16 ^| Turbopack ^| TypeScript             ^|
echo  +===========================================================+
echo.
echo  +-- GELISTIRME -----------------------------------------------+
echo  ^|  [1]  Dev sunucu baslat       (npm run dev)                ^|
echo  ^|  [2]  Production build        (npm run build)              ^|
echo  ^|  [3]  Build + Onizleme        (build, sonra npm start)     ^|
echo  +-------------------------------------------------------------+
echo.
echo  +-- TEST ve KALITE -------------------------------------------+
echo  ^|  [4]  Unit testleri calistir  (vitest)                     ^|
echo  ^|  [5]  E2E testleri calistir   (playwright)                 ^|
echo  ^|  [6]  TypeScript kontrolu     (tsc --noEmit)               ^|
echo  ^|  [7]  Lint kontrolu           (eslint)                     ^|
echo  ^|  [8]  SEO Audit               (scripts/seo-audit.mjs)      ^|
echo  +-------------------------------------------------------------+
echo.
echo  +-- BAGIMLILIKLAR --------------------------------------------+
echo  ^|  [9]  Bagimlilik yukle        (npm install)                ^|
echo  ^| [10]  Bagimlilik guncelle     (npm update)                 ^|
echo  ^| [11]  Guvenlik tara           (npm audit)                  ^|
echo  ^| [12]  Guvenlik aciklari kapat (npm audit fix)              ^|
echo  +-------------------------------------------------------------+
echo.
echo  +-- GIT ISLEMLERI --------------------------------------------+
echo  ^| [13]  Git durumu              (git status)                 ^|
echo  ^| [14]  Hizli commit ve push    (mesaj sor, otomatik)        ^|
echo  ^| [15]  Sube listesi            (git branch -a)              ^|
echo  ^| [16]  Son 10 commit           (git log)                    ^|
echo  +-------------------------------------------------------------+
echo.
echo  +-- TEMIZLIK -------------------------------------------------+
echo  ^| [17]  .next temizle                                        ^|
echo  ^| [18]  node_modules + .next temizle ve yeniden yukle        ^|
echo  ^| [19]  tsconfig.tsbuildinfo temizle                         ^|
echo  +-------------------------------------------------------------+
echo.
echo  +-- ARACLAR --------------------------------------------------+
echo  ^| [20]  Logo optimizasyonu      (scripts/optimize_logos.js)  ^|
echo  ^| [21]  SEO metadata uret       (scripts/generate-seo.mjs)   ^|
echo  ^| [22]  JSON-LD dogrula         (scripts/validate-jsonld.mjs)^|
echo  +-------------------------------------------------------------+
echo.
echo  [0]  Cikis
echo.
set /p SECIM="  Seciminiz: "

if "%SECIM%"=="1"  goto DEV
if "%SECIM%"=="2"  goto BUILD
if "%SECIM%"=="3"  goto BUILD_PREVIEW
if "%SECIM%"=="4"  goto UNIT_TEST
if "%SECIM%"=="5"  goto E2E_TEST
if "%SECIM%"=="6"  goto TSC_CHECK
if "%SECIM%"=="7"  goto LINT
if "%SECIM%"=="8"  goto SEO_AUDIT
if "%SECIM%"=="9"  goto NPM_INSTALL
if "%SECIM%"=="10" goto NPM_UPDATE
if "%SECIM%"=="11" goto NPM_AUDIT
if "%SECIM%"=="12" goto NPM_AUDIT_FIX
if "%SECIM%"=="13" goto GIT_STATUS
if "%SECIM%"=="14" goto GIT_PUSH
if "%SECIM%"=="15" goto GIT_BRANCH
if "%SECIM%"=="16" goto GIT_LOG
if "%SECIM%"=="17" goto CLEAN_NEXT
if "%SECIM%"=="18" goto CLEAN_ALL
if "%SECIM%"=="19" goto CLEAN_TSBUILD
if "%SECIM%"=="20" goto OPTIMIZE_LOGOS
if "%SECIM%"=="21" goto GENERATE_SEO
if "%SECIM%"=="22" goto VALIDATE_JSONLD
if "%SECIM%"=="0"  goto EXIT
echo.
echo  [!] Gecersiz secim. Lutfen tekrar deneyin.
timeout /t 2 > nul
goto MENU

:DEV
cls
echo.
echo  [>] Dev sunucu baslatiliyor...
echo  [*] Adres: http://localhost:3000
echo  [*] Durdurmak icin: Ctrl+C
echo.
npm run dev
goto GERI

:BUILD
cls
echo.
echo  [>] Production build basliyor...
echo.
npm run build
if %ERRORLEVEL% EQU 0 (
    echo.
    echo  [OK] Build basariyla tamamlandi!
) else (
    echo.
    echo  [!!] Build basarisiz! Yukardaki hatalari kontrol edin.
)
goto GERI

:BUILD_PREVIEW
cls
echo.
echo  [>] Production build basliyor...
echo.
npm run build
if %ERRORLEVEL% NEQ 0 (
    echo  [!!] Build basarisiz! Preview baslatilmiyor.
    goto GERI
)
echo.
echo  [OK] Build tamam! Onizleme sunucusu baslatiliyor...
echo  [*] Adres: http://localhost:3000
echo.
npm start
goto GERI

:UNIT_TEST
cls
echo.
echo  [>] Unit testler calistiriliyor...
echo.
npx vitest run
goto GERI

:E2E_TEST
cls
echo.
echo  [>] Playwright E2E testler calistiriliyor...
echo.
npx playwright test
goto GERI

:TSC_CHECK
cls
echo.
echo  [>] TypeScript tip kontrolu yapiliyor...
echo.
npx tsc --noEmit
if %ERRORLEVEL% EQU 0 (
    echo.
    echo  [OK] Tip hatasi yok!
) else (
    echo.
    echo  [!!] Tip hatalari bulundu!
)
goto GERI

:LINT
cls
echo.
echo  [>] ESLint kontrolu yapiliyor...
echo.
npx eslint src --ext .ts,.tsx
if %ERRORLEVEL% EQU 0 (
    echo.
    echo  [OK] Lint hatasi yok!
) else (
    echo.
    echo  [!!] Lint uyarilari veya hatalari bulundu!
)
goto GERI

:SEO_AUDIT
cls
echo.
echo  [>] SEO Audit calistiriliyor...
echo.
node scripts/seo-audit.mjs
goto GERI

:NPM_INSTALL
cls
echo.
echo  [>] Bagimliliklar yukleniyor...
echo.
npm install
echo.
echo  [OK] Kurulum tamamlandi!
goto GERI

:NPM_UPDATE
cls
echo.
echo  [>] Bagimliliklar guncelleniyor...
echo.
npm update
echo.
echo  [OK] Guncelleme tamamlandi!
goto GERI

:NPM_AUDIT
cls
echo.
echo  [>] Guvenlik aciklari taran?yor...
echo.
npm audit
goto GERI

:NPM_AUDIT_FIX
cls
echo.
echo  [>] Guvenlik aciklari kapatiliyor...
echo.
npm audit fix
echo.
echo  [OK] Guvenlik guncellemesi tamamlandi!
goto GERI

:GIT_STATUS
cls
echo.
echo  [>] Git durumu:
echo.
git status
goto GERI

:GIT_PUSH
cls
echo.
set /p COMMIT_MSG="  Commit mesaji: "
if "%COMMIT_MSG%"=="" (
    echo  [!!] Mesaj bos olamaz!
    goto GERI
)
echo.
echo  [>] Dosyalar sahneye aliniyor...
git add .
echo  [>] Commit olusturuluyor...
git commit -m "%COMMIT_MSG%"
echo  [>] GitHub'a gonderiliyor...
git push
if %ERRORLEVEL% EQU 0 (
    echo.
    echo  [OK] Basariyla gonderildi!
) else (
    echo.
    echo  [!!] Push basarisiz! Git ciktisini kontrol edin.
)
goto GERI

:GIT_BRANCH
cls
echo.
echo  [>] Subeler:
echo.
git branch -a
goto GERI

:GIT_LOG
cls
echo.
echo  [>] Son 10 commit:
echo.
git log --oneline -10 --decorate
goto GERI

:CLEAN_NEXT
cls
echo.
echo  [>] .next klasoru temizleniyor...
if exist ".next" (
    rmdir /s /q ".next"
    echo  [OK] .next klasoru silindi!
) else (
    echo  [i] .next klasoru zaten yok.
)
goto GERI

:CLEAN_ALL
cls
echo.
echo  [!!] node_modules ve .next silinecek, ardindan npm install calisacak.
set /p ONAY="  Devam etmek istiyor musunuz? (e/H): "
if /i not "%ONAY%"=="e" goto MENU
echo.
echo  [>] Temizleniyor...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules" rmdir /s /q "node_modules"
echo  [>] Bagimliliklar yeniden yukleniyor...
npm install
echo.
echo  [OK] Temiz kurulum tamamlandi!
goto GERI

:CLEAN_TSBUILD
cls
echo.
if exist "tsconfig.tsbuildinfo" (
    del /f "tsconfig.tsbuildinfo"
    echo  [OK] tsconfig.tsbuildinfo silindi!
) else (
    echo  [i] tsconfig.tsbuildinfo zaten yok.
)
goto GERI

:OPTIMIZE_LOGOS
cls
echo.
echo  [>] Logo optimizasyonu basliyor...
echo.
node scripts/optimize_logos.js
goto GERI

:GENERATE_SEO
cls
echo.
echo  [>] SEO metadata uretiliyor...
echo.
node scripts/generate-seo.mjs
goto GERI

:VALIDATE_JSONLD
cls
echo.
echo  [>] JSON-LD semasi dogrulan?yor...
echo.
node scripts/validate-jsonld.mjs
goto GERI

:GERI
echo.
echo  -----------------------------------------------------------------
pause
goto MENU

:EXIT
cls
echo.
echo  Gorusuruz kankam!
echo.
timeout /t 2 > nul
exit
