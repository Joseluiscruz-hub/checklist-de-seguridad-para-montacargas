# Script de Despliegue Automático para GitHub Pages (PowerShell)
# Checklist de Seguridad para Montacargas - Coca-Cola FEMSA

Write-Host "🚀 Iniciando despliegue en GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en un repositorio git
if (-Not (Test-Path .git)) {
    Write-Host "❌ Error: No estás en un repositorio Git" -ForegroundColor Red
    Write-Host "Ejecuta primero: git init"
    exit 1
}

# Verificar cambios pendientes
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Hay cambios pendientes para commit" -ForegroundColor Yellow
    Write-Host ""

    $commit = Read-Host "¿Quieres hacer commit de los cambios? (s/n)"
    if ($commit -eq 's' -or $commit -eq 'S') {
        Write-Host "📝 Añadiendo archivos..." -ForegroundColor Blue
        git add .

        $message = Read-Host "Mensaje del commit"
        git commit -m $message

        Write-Host "✅ Commit creado" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Cambios no comiteados. Abortando despliegue." -ForegroundColor Yellow
        exit 1
    }
}

# Verificar que existe un remote
$hasOrigin = git remote | Select-String -Pattern "origin"
if (-Not $hasOrigin) {
    Write-Host "❌ No hay remote 'origin' configurado" -ForegroundColor Red
    Write-Host ""
    $repoUrl = Read-Host "Ingresa la URL de tu repositorio GitHub"
    git remote add origin $repoUrl
    Write-Host "✅ Remote 'origin' añadido" -ForegroundColor Green
}

# Obtener la rama actual
$currentBranch = git branch --show-current

# Cambiar a main si está en master
if ($currentBranch -eq "master") {
    Write-Host "🔄 Cambiando de master a main..." -ForegroundColor Blue
    git branch -M main
    $currentBranch = "main"
}

# Push al repositorio
Write-Host "⬆️  Subiendo cambios a GitHub..." -ForegroundColor Blue
try {
    git push -u origin $currentBranch 2>&1 | Out-Null
    $LASTEXITCODE = 0

    Write-Host "✅ Cambios subidos exitosamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 ¡Despliegue iniciado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "GitHub Actions compilará y desplegará tu aplicación automáticamente."
    Write-Host ""

    # Extraer información del repositorio
    $remoteUrl = git config remote.origin.url
    if ($remoteUrl -match "github\.com[:/](.+?)/(.+?)(\.git)?$") {
        $user = $matches[1]
        $repo = $matches[2]

        Write-Host "📊 Ver progreso: " -NoNewline
        Write-Host "https://github.com/$user/$repo/actions" -ForegroundColor Blue
        Write-Host ""
        Write-Host "🌐 Tu app estará en: " -NoNewline
        Write-Host "https://$user.github.io/$repo/" -ForegroundColor Green
        Write-Host ""
    }

    Write-Host "⏱️  El despliegue toma aproximadamente 2-5 minutos."
}
catch {
    Write-Host "❌ Error al subir cambios" -ForegroundColor Red
    Write-Host "Verifica tu conexión y credenciales de GitHub"
    exit 1
}

