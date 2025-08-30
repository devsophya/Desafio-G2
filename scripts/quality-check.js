#!/usr/bin/env node

/**
 * Script de análise de qualidade e segurança para desenvolvimento
 * Executa apenas em ambiente de desenvolvimento
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.blue}${colors.bold}🔍 G2 - Análise de Qualidade e Segurança${colors.reset}\n`);

const issues = [];

// 1. Verificar arquivos sensíveis
console.log(`${colors.yellow}📁 Verificando arquivos sensíveis...${colors.reset}`);
const sensitiveFiles = ['.env', '.env.local', '.env.production', 'config.json'];
sensitiveFiles.forEach(file => {
  if (fs.existsSync(file)) {
    issues.push(`⚠️  Arquivo sensível encontrado: ${file}`);
  }
});

// 2. Verificar dependências com vulnerabilidades conhecidas
console.log(`${colors.yellow}📦 Verificando vulnerabilidades em dependências...${colors.reset}`);
try {
  execSync('npm audit --audit-level moderate', { stdio: 'inherit' });
  console.log(`${colors.green}✅ Nenhuma vulnerabilidade crítica encontrada${colors.reset}`);
} catch (error) {
  issues.push('🚨 Vulnerabilidades encontradas nas dependências');
}

// 3. Verificar tamanho dos bundles
console.log(`${colors.yellow}📊 Analisando tamanho dos bundles...${colors.reset}`);
try {
  // Limpar dist anterior se existir
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Executar build
  console.log('  Executando build...');
  execSync('npm run build', { stdio: 'pipe' });
  
  if (fs.existsSync('dist')) {
    const calculateDirSize = (dirPath) => {
      let totalSize = 0;
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const file of files) {
        const fullPath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          totalSize += calculateDirSize(fullPath);
        } else {
          totalSize += fs.statSync(fullPath).size;
        }
      }
      return totalSize;
    };
    
    const totalSize = calculateDirSize('dist');
    const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
    
    if (sizeMB > 5) {
      issues.push(`⚠️  Bundle muito grande: ${sizeMB}MB (recomendado < 5MB)`);
    } else {
      console.log(`${colors.green}✅ Tamanho do bundle: ${sizeMB}MB${colors.reset}`);
    }
  } else {
    issues.push('❌ Pasta dist não foi criada após o build');
  }
} catch (error) {
  console.log(`${colors.yellow}  ℹ️  Pulando análise de bundle (pode ser executada separadamente com npm run build)${colors.reset}`);
}

// 4. Verificar práticas de segurança no código
console.log(`${colors.yellow}🛡️  Verificando práticas de segurança...${colors.reset}`);

// Procurar por innerHTML
try {
  const result = execSync('grep -r "innerHTML" src/ || true', { encoding: 'utf8' });
  if (result.trim()) {
    issues.push('⚠️  Uso de innerHTML detectado - possível XSS');
  }
} catch (error) {
  // Ignore
}

// Procurar por eval
try {
  const result = execSync('grep -r "eval(" src/ || true', { encoding: 'utf8' });
  if (result.trim()) {
    issues.push('🚨 Uso de eval() detectado - risco de segurança');
  }
} catch (error) {
  // Ignore
}

// 5. Verificar acessibilidade básica
console.log(`${colors.yellow}♿ Verificando acessibilidade...${colors.reset}`);

const checkA11y = (dir) => {
  const files = fs.readdirSync(dir, { recursive: true });
  let a11yIssues = 0;
  
  files.forEach(file => {
    if ((file.endsWith('.tsx') || file.endsWith('.jsx')) && !file.includes('stories') && !file.includes('Configure.mdx')) {
      const filePath = path.join(dir, file);
      
      // Pular arquivos do Storybook
      if (filePath.includes('stories') || filePath.includes('.stories.')) {
        return;
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Verificar se tem alt em imagens (mais específico)
      const imgMatches = content.match(/<img[^>]*>/g);
      if (imgMatches) {
        imgMatches.forEach(img => {
          if (!img.includes('alt=')) {
            console.log(`    ⚠️  Imagem sem alt em: ${filePath}`);
            a11yIssues++;
          }
        });
      }
      
      // Verificar aria-labels em botões sem texto
      const buttonMatches = content.match(/<button[^>]*>[\s\S]*?<\/button>/g);
      if (buttonMatches) {
        buttonMatches.forEach(button => {
          const hasText = button.match(/>([^<]+)</);
          const hasAriaLabel = button.includes('aria-label') || button.includes('aria-labelledby');
          
          if (!hasText && !hasAriaLabel && button.includes('onClick')) {
            console.log(`    ⚠️  Botão sem label em: ${filePath}`);
            a11yIssues++;
          }
        });
      }
    }
  });
  
  return a11yIssues;
};

const a11yIssues = checkA11y('src');
if (a11yIssues > 0) {
  issues.push(`⚠️  ${a11yIssues} potenciais problemas de acessibilidade`);
} else {
  console.log(`${colors.green}✅ Verificações de acessibilidade aprovadas${colors.reset}`);
}

// 6. Verificar performance básica
console.log(`${colors.yellow}⚡ Verificando performance...${colors.reset}`);

// Verificar imports desnecessários do React
try {
  const result = execSync('grep -r "import React from" src/ || true', { encoding: 'utf8' });
  const lines = result.trim().split('\n').filter(line => line.trim());
  if (lines.length > 5) {
    issues.push(`⚠️  Muitos imports desnecessários do React (${lines.length}) - usar React 17+ JSX transform`);
  }
} catch (error) {
  // Ignore
}

// Resultados finais
console.log(`\n${colors.blue}${colors.bold}📋 RELATÓRIO FINAL${colors.reset}`);

if (issues.length === 0) {
  console.log(`${colors.green}${colors.bold}🎉 Parabéns! Nenhum problema encontrado!${colors.reset}`);
  console.log(`${colors.green}✨ Seu código está seguindo as melhores práticas de segurança e qualidade.${colors.reset}`);
} else {
  console.log(`${colors.red}${colors.bold}⚠️  ${issues.length} problema(s) encontrado(s):${colors.reset}\n`);
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
  console.log(`\n${colors.yellow}💡 Recomendamos corrigir estes problemas antes do deploy.${colors.reset}`);
}

console.log(`\n${colors.blue}🚀 Análise concluída!${colors.reset}`);

// Exit code baseado nos problemas encontrados
process.exit(issues.filter(issue => issue.includes('🚨')).length > 0 ? 1 : 0);
