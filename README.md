# Claqui — Deploy na Vercel

Sistema operacional para produtores audiovisuais. Pipeline + Calculadora + Recursos.

---

## Antes de começar

Você precisa ter instalado no Mac:

1. **Node.js** (versão 18 ou superior) — baixa em https://nodejs.org (pega a LTS)
2. **Git** — já vem instalado no Mac. Pra confirmar, abre o Terminal e digita: `git --version`
3. **Conta no GitHub** — https://github.com/signup (gratuita)
4. **Conta na Vercel** — https://vercel.com/signup (gratuita, faz login com GitHub)

---

## Passo 1 — Instala as dependências (5 minutos)

Descompacta esse zip onde quiser (sugestão: `~/Documents/claqui`). Abre o Terminal e navega até a pasta:

```bash
cd ~/Documents/claqui
```

Instala as bibliotecas:

```bash
npm install
```

Vai demorar 1-2 minutos. Vai aparecer "added 200 packages" ou similar no final.

---

## Passo 2 — Testa localmente (2 minutos)

Antes de subir pra internet, testa se tá funcionando no seu Mac:

```bash
npm run dev
```

Vai aparecer algo como:
```
  VITE v6.0.1  ready in 350 ms
  ➜  Local:   http://localhost:5173/
```

Abre `http://localhost:5173` no Chrome. Você vai ver o Claqui funcionando. Testa as 3 abas: Pipeline, Calculadora, Recursos. Quando tiver tudo OK, volta no Terminal e pressiona `Ctrl+C` pra parar.

---

## Passo 3 — Sobe pro GitHub (5 minutos)

No Terminal, ainda na pasta do projeto:

```bash
git init
git add .
git commit -m "Primeira versão do Claqui"
```

Agora vai no GitHub, clica em **"New repository"** (canto superior direito, botão verde "+").
- **Repository name**: `claqui`
- **Visibility**: Private (recomendo)
- **Não marca nenhuma das opções de "Initialize"** (README, .gitignore, license)
- Clica em **"Create repository"**

Na tela seguinte, GitHub vai mostrar comandos. Copia os 3 da seção **"…or push an existing repository from the command line"** e cola no Terminal. Vão ser parecidos com:

```bash
git remote add origin https://github.com/SEU_USUARIO/claqui.git
git branch -M main
git push -u origin main
```

Pode pedir login do GitHub. Se pedir, usa seu usuário e um **Personal Access Token** (não a senha — gera em https://github.com/settings/tokens).

Depois de rodar, atualiza a página do GitHub. Os arquivos vão estar lá.

---

## Passo 4 — Deploy na Vercel (3 minutos)

1. Vai em https://vercel.com/new
2. Escolhe **"Import Git Repository"**
3. Conecta o GitHub se ainda não tiver conectado
4. Procura `claqui` na lista e clica em **"Import"**
5. Vercel detecta automaticamente que é Vite. Não precisa mexer em nada.
6. Clica em **"Deploy"**

Em ~30 segundos, ela te dá uma URL tipo `claqui-pablo.vercel.app`. Pronto, tá no ar.

---

## Passo 4.1 — Usa o domínio claqui.app.br no lugar da URL da Vercel

O ideal não é fazer “máscara” por iframe/encaminhamento. O jeito certo é conectar o domínio na Vercel para a pessoa entrar direto em `https://claqui.app.br` e continuar vendo esse endereço no navegador.

### 1. Adiciona o domínio na Vercel

1. Abre o projeto do Claqui na Vercel.
2. Vai em **Settings → Domains**.
3. Adiciona estes dois domínios:
   - `claqui.app.br`
   - `www.claqui.app.br`
4. Escolhe um domínio principal. Recomendo deixar `claqui.app.br` como principal e configurar `www.claqui.app.br` para redirecionar para ele.

### 2. Configura o DNS no Registro.br

No painel do Registro.br, abre o domínio `claqui.app.br` e entra na área de DNS. Se estiver usando os servidores DNS do próprio Registro.br, use o modo avançado/editor de zona e crie estes registros:

| Nome/Host | Tipo | Valor/Destino |
| --- | --- | --- |
| `@` ou vazio | `A` | `76.76.21.21` |
| `www` | `CNAME` | `cname.vercel-dns-0.com` |

> Importante: se a Vercel mostrar valores diferentes em **Settings → Domains**, siga os valores exatos que aparecerem lá. A Vercel também pode pedir um registro `TXT` de verificação; se pedir, adicione exatamente como indicado.

### 3. Espera propagar e valida

DNS pode levar alguns minutos para propagar. Quando a Vercel marcar o domínio como válido, ela emite o HTTPS automaticamente. Testa:

```bash
curl -I https://claqui.app.br
curl -I https://www.claqui.app.br
```

O resultado esperado é a URL abrir com cadeado (`https`) e o endereço ficar como `claqui.app.br`, sem aparecer `vercel.app` para o usuário.

---

## Passo 5 — Adiciona como app no celular (1 minuto)

**iPhone:** abre a URL no Safari → toca em "Compartilhar" → "Adicionar à Tela de Início"

**Android:** abre a URL no Chrome → menu (3 pontos) → "Adicionar à tela inicial"

Vira um ícone igual app nativo, com a logo do Claqui.

---

## Como atualizar depois

Sempre que quiser fazer mudanças no código:

```bash
# Edita o arquivo src/App.jsx
git add .
git commit -m "Descrição da mudança"
git push
```

A Vercel detecta o push e refaz o deploy automaticamente em ~30 segundos. A URL é a mesma.

---

## ⚠️ Importante sobre os dados

Esta versão usa **localStorage** do navegador. Isso significa:

- ✅ Funciona offline
- ✅ Rápido, sem banco de dados
- ✅ Privado (cada pessoa só vê os dados dela)
- ❌ **NÃO compartilha dados entre dispositivos** — o que você cadastrar no Mac não aparece no celular
- ❌ **NÃO compartilha dados entre pessoas** — sua equipe vê o que ela cadastrou, você vê o que você cadastrou

Pra ter dados compartilhados (multiusuário com login), o próximo passo é integrar Supabase ou similar. Mas isso é outra empreitada.

---

## Travou em algum passo?

Os erros mais comuns:

- **"command not found: npm"** — instala o Node.js (passo de pré-requisitos)
- **"permission denied" no git push** — gera um Personal Access Token no GitHub e usa ele no lugar da senha
- **Build falha na Vercel** — confere se rodou `npm run build` localmente sem erro antes de fazer push
- **Tela branca depois do deploy** — abre o Console do navegador (F12) e vê o erro

Boa, chefe. Tá nas suas mãos agora.
