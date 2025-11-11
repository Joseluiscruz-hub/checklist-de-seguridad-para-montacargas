#!/usr/bin/env node

/**
 * Script de despliegue interactivo para GitHub Pages
 * Checklist de Seguridad para Montacargas - Coca-Cola FEMSA
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as readline from 'readline';

const execAsync = promisify(exec);

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  log('\n🚀 Script de Despliegue a GitHub Pages', colors.bright + colors.blue);
  log('━'.repeat(50), colors.blue);
  log('Checklist de Seguridad para Montacargas - Coca-Cola FEMSA\n', colors.blue);

  try {
    // Verificar que estamos en un repositorio git
    log('📋 Verificando repositorio...', colors.yellow);
    await execAsync('git rev-parse --git-dir');
    log('✅ Repositorio válido\n', colors.green);

    // Verificar estado del repositorio
    log('📋 Verificando estado del repositorio...', colors.yellow);
    const { stdout: status } = await execAsync('git status --porcelain');
    if (status.trim()) {
      log('⚠️  Hay cambios sin commitear en el repositorio', colors.yellow);
      const commit = await askQuestion('¿Deseas commitear los cambios antes de desplegar? (s/n): ');
      
      if (commit.toLowerCase() === 's' || commit.toLowerCase() === 'y') {
        const message = await askQuestion('Mensaje del commit: ');
        await execAsync('git add .');
        await execAsync(`git commit -m "${message}"`);
        log('✅ Cambios comiteados\n', colors.green);
      } else {
        log('⚠️  Continuando sin commitear cambios\n', colors.yellow);
      }
    } else {
      log('✅ No hay cambios pendientes\n', colors.green);
    }

    // Compilar para producción
    log('🔨 Compilando aplicación para producción...', colors.yellow);
    log('Esto puede tomar unos momentos...\n', colors.yellow);
    
    await execAsync('npm run build:prod');
    log('✅ Compilación exitosa\n', colors.green);

    // Preguntar confirmación para desplegar
    log('━'.repeat(50), colors.blue);
    log('⚠️  Estás a punto de desplegar a GitHub Pages', colors.yellow + colors.bright);
    log('━'.repeat(50), colors.blue);
    log('\nEsto publicará tu aplicación en:', colors.reset);
    log('https://joseluiscruz-hub.github.io/checklist-de-seguridad-para-montacargas/\n', colors.green);
    
    const confirm = await askQuestion('¿Deseas continuar con el despliegue? (s/n): ');

    if (confirm.toLowerCase() === 's' || confirm.toLowerCase() === 'y') {
      log('\n🚀 Desplegando a GitHub Pages...', colors.blue);
      log('Esto puede tomar unos momentos...\n', colors.yellow);

      await execAsync('npx gh-pages -d dist');

      log('\n━'.repeat(50), colors.green);
      log('✅ ¡Despliegue exitoso!', colors.green + colors.bright);
      log('━'.repeat(50), colors.green);
      log('\n🌐 Tu aplicación estará disponible en:', colors.reset);
      log('https://joseluiscruz-hub.github.io/checklist-de-seguridad-para-montacargas/', colors.green + colors.bright);
      log('\n⏱️  Puede tomar 1-2 minutos para que los cambios sean visibles.\n', colors.yellow);
    } else {
      log('\n❌ Despliegue cancelado', colors.red);
      process.exit(0);
    }
  } catch (error) {
    log('\n❌ Error durante el despliegue:', colors.red);
    log(error.message, colors.red);
    process.exit(1);
  }
}

main();
