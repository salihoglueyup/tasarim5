@echo off
chcp 65001 >nul
title Alo Yönetim - Proje Yönetim Araçları
color 0B

:MENU
cls
echo ===============================================================================
echo                ALO YÖNETİM - PROJE YÖNETİM VE GELİŞTİRME PANELİ                
echo ===============================================================================
echo.
echo    [1] Geliştirme Sunucusunu Başlat (npm run dev - http://localhost:3000)
echo    [2] Üretim Sürümü Derle (npm run build)
echo    [3] Linter ve Kod Kalitesi Kontrolü (npm run lint)
echo    [4] Üretim Sunucusunu Başlat (npm start)
echo    [5] Logoları Optimize Et (scripts/optimize_logos.js)
echo    [6] Git Durumu ve Değişiklikleri Görüntüle (git status -s)
echo    [7] Bağımlılıkları Yeniden Kur (npm install)
echo    [0] Çıkış
echo.
echo ===============================================================================
set /p secim="Lütfen yapmak istediğiniz işlemin numarasını girin [0-7]: "

if "%secim%"=="1" goto DEV
if "%secim%"=="2" goto BUILD
if "%secim%"=="3" goto LINT
if "%secim%"=="4" goto START
if "%secim%"=="5" goto LOGO
if "%secim%"=="6" goto GIT
if "%secim%"=="7" goto INSTALL
if "%secim%"=="0" goto EXIT

echo.
echo [HATA] Geçersiz bir seçim yaptınız! Lütfen 0 ile 7 arasında bir numara girin.
timeout /t 2 >nul
goto MENU

:DEV
cls
echo [BİLGİ] Geliştirme sunucusu başlatılıyor...
echo Tarayıcınızdan http://localhost:3000 adresini açabilirsiniz.
echo Durdurmak için CTRL+C tuşlarına basabilirsiniz.
echo -------------------------------------------------------------------------------
npm run dev
echo.
pause
goto MENU

:BUILD
cls
echo [BİLGİ] Next.js üretim derlemesi (Production Build) başlatılıyor...
echo -------------------------------------------------------------------------------
npm run build
echo.
echo [BİLGİ] Derleme tamamlandı!
pause
goto MENU

:LINT
cls
echo [BİLGİ] ESLint ile kod kalitesi ve sıfır uyarı kontrolü yapılıyor...
echo -------------------------------------------------------------------------------
npm run lint
echo.
echo [BİLGİ] Kontrol tamamlandı!
pause
goto MENU

:START
cls
echo [BİLGİ] Üretim sunucusu başlatılıyor...
echo -------------------------------------------------------------------------------
npm start
echo.
pause
goto MENU

:LOGO
cls
echo [BİLGİ] Şirket logoları optimize ediliyor ve WebP formatına dönüştürülüyor...
echo -------------------------------------------------------------------------------
node scripts/optimize_logos.js
echo.
echo [BİLGİ] Optimizasyon tamamlandı!
pause
goto MENU

:GIT
cls
echo [BİLGİ] Git depo durumu (Değiştirilen ve yeni dosyalar):
echo -------------------------------------------------------------------------------
git status
echo.
pause
goto MENU

:INSTALL
cls
echo [BİLGİ] NPM bağımlılıkları güncelleniyor/kuruluyor...
echo -------------------------------------------------------------------------------
npm install
echo.
echo [BİLGİ] Kurulum tamamlandı!
pause
goto MENU

:EXIT
cls
echo ===============================================================================
echo      Alo Yönetim Geliştirme Panelini kullandığınız için teşekkürler!      
echo ===============================================================================
timeout /t 2 >nul
exit
