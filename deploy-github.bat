@echo off
echo ========================================
echo   DESPLIEGUE A GITHUB PAGES
echo   Checklist de Seguridad para Montacargas
echo ========================================
echo.

REM Verificar que estamos en un repo git
if not exist .git (
    echo ERROR: No estas en un repositorio Git
    pause
    exit /b 1
)

REM Solicitar nombre de usuario
set /p GITHUB_USER="Ingresa tu nombre de usuario de GitHub: "
if "%GITHUB_USER%"=="" (
    echo ERROR: Debes ingresar un nombre de usuario
    pause
    exit /b 1
)

REM Solicitar email
set /p GIT_EMAIL="Ingresa tu email de GitHub: "
if "%GIT_EMAIL%"=="" (
    echo ERROR: Debes ingresar un email
    pause
    exit /b 1
)

REM Solicitar nombre completo
set /p GIT_NAME="Ingresa tu nombre completo: "
if "%GIT_NAME%"=="" (
    set GIT_NAME=%GITHUB_USER%
)

echo.
echo Configurando Git...
git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"

echo.
echo Verificando remote...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USER%/checklist-de-seguridad-para-montacargas.git

echo.
echo Estado de Git:
git status

echo.
echo ========================================
echo IMPORTANTE: Antes de continuar
echo ========================================
echo.
echo 1. Asegurate de haber creado el repositorio en GitHub:
echo    https://github.com/new
echo.
echo 2. Nombre del repo: checklist-de-seguridad-para-montacargas
echo.
echo 3. Debe ser PUBLICO
echo.
echo 4. NO marques "Add a README file"
echo.
set /p CONTINUE="Has creado el repositorio? (S/N): "
if /i not "%CONTINUE%"=="S" (
    echo.
    echo Por favor, crea el repositorio primero en:
    echo https://github.com/new
    echo.
    echo Luego ejecuta este script nuevamente.
    pause
    exit /b 0
)

echo.
echo Subiendo codigo a GitHub...
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   EXITO! Codigo subido a GitHub
    echo ========================================
    echo.
    echo Ahora:
    echo 1. Ve a: https://github.com/%GITHUB_USER%/checklist-de-seguridad-para-montacargas
    echo 2. Click en Settings ^> Pages
    echo 3. En Source, selecciona: GitHub Actions
    echo 4. Espera 2-5 minutos
    echo.
    echo Tu app estara en:
    echo https://%GITHUB_USER%.github.io/checklist-de-seguridad-para-montacargas/
    echo.
) else (
    echo.
    echo ========================================
    echo   ERROR en el push
    echo ========================================
    echo.
    echo Posibles causas:
    echo 1. El repositorio no existe en GitHub
    echo 2. Necesitas autenticacion
    echo 3. No tienes permisos
    echo.
    echo Para autenticacion, usa:
    echo - Usuario: %GITHUB_USER%
    echo - Password: Personal Access Token ^(NO tu contrasena^)
    echo.
    echo Crea un token en:
    echo https://github.com/settings/tokens
    echo.
)

echo.
pause

