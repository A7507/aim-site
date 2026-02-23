const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnosticando problemas do build...\n');

// Verificar arquivos essenciais
const files = [
  'context/cart-context.tsx',
  'lib/central-storage.ts',
  'app/api/central-sync/route.ts',
  'app/api/get-central-purchases/route.ts',
  'app/api/save-central-purchases/route.ts',
  'app/checkout/page.tsx',
  'app/layout.tsx'
];

console.log('📁 Verificando arquivos essenciais:');
files.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Verificar package.json
console.log('\n📦 Verificando package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('✅ package.json válido');
  console.log(`📜 Scripts: ${Object.keys(packageJson.scripts).join(', ')}`);
} catch (error) {
  console.log('❌ Erro no package.json:', error.message);
}

// Verificar tsconfig.json
console.log('\n⚙️ Verificando tsconfig.json:');
try {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  console.log('✅ tsconfig.json válido');
  console.log(`🎯 Target: ${tsconfig.compilerOptions?.target}`);
  console.log(`📂 BaseUrl: ${tsconfig.compilerOptions?.baseUrl}`);
  console.log(`🔗 Paths: ${JSON.stringify(tsconfig.compilerOptions?.paths)}`);
} catch (error) {
  console.log('❌ Erro no tsconfig.json:', error.message);
}

// Verificar next.config.mjs
console.log('\n🚀 Verificando next.config.mjs:');
try {
  if (fs.existsSync('next.config.mjs')) {
    console.log('✅ next.config.mjs existe');
  } else {
    console.log('❌ next.config.mjs não encontrado');
  }
} catch (error) {
  console.log('❌ Erro ao verificar next.config.mjs:', error.message);
}

console.log('\n🔧 Sugestões:');
console.log('1. Execute: npm install');
console.log('2. Execute: npm run dev');
console.log('3. Se falhar, delete node_modules e package-lock.json');
console.log('4. Execute: npm install novamente');
