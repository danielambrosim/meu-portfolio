#!/usr/bin/env node
// Gera data/github.json com dados reais via GitHub REST + GraphQL
// Usa GH_TOKEN (GITHUB_TOKEN da Action) para evitar rate limit e pegar contribuições
import { writeFileSync, mkdirSync } from 'fs';

const USER = process.env.GH_USER || 'danielambrosim';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

async function ghFetch(url, extraHeaders={}){
  const h = { Accept: 'application/vnd.github.v3+json', ...extraHeaders };
  if(TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  const r = await fetch(url, { headers: h });
  if(!r.ok) throw new Error(`GET ${url} -> ${r.status} ${await r.text()}`);
  return r.json();
}

async function fetchGraphQL(query, variables){
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ query, variables })
  });
  if(!r.ok) throw new Error(`GraphQL ${r.status} ${await r.text()}`);
  const j = await r.json();
  if(j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

const FALLBACK_LEVELS = [1,2,3,4,2,1,3,4,2,1,3,4,2,3,1,4,2,3,4,1,2,3,4,2,1,3,2,4];

try {
  // REST: usuário + repos
  const [user, repos] = await Promise.all([
    ghFetch(`https://api.github.com/users/${USER}`),
    ghFetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`)
  ]);
  const reposCount = user.public_repos ?? repos.length;
  const stars = repos.reduce((s,r)=> s + (r.stargazers_count||0), 0);
  const projects = repos.filter(r=> !r.fork).length;

  // linguagens agregadas por contagem de repo com language
  const langBytes = {};
  repos.forEach(r=> { if(r.language) langBytes[r.language]=(langBytes[r.language]||0)+1; });
  const total = Object.values(langBytes).reduce((a,b)=>a+b,0) || 1;
  const languages = {};
  Object.entries(langBytes).sort((a,b)=>b[1]-a[1]).slice(0,4).forEach(([k,v])=> languages[k]=Math.round(v/total*100));

  // GraphQL: contribuições do ano atual
  let contribs = null;
  let contribLevels = FALLBACK_LEVELS;
  if(TOKEN){
    try{
      const q = `
        query($login:String!){
          user(login:$login){
            contributionsCollection{
              contributionCalendar{
                totalContributions
                weeks{ contributionDays{ date contributionCount } }
              }
            }
          }
        }`;
      const data = await fetchGraphQL(q, { login: USER });
      const cal = data.user?.contributionsCollection?.contributionCalendar;
      if(cal){
        contribs = cal.totalContributions;
        const days = cal.weeks.flatMap(w=> w.contributionDays).slice(-28).map(d=> d.contributionCount);
        const max = Math.max(1, ...days);
        contribLevels = days.map(c=> c===0?1: c<=max*0.25?1: c<=max*0.5?2: c<=max*0.75?3:4);
      }
    }catch(e){ console.warn('GraphQL contribuições falhou, usando fallback', e.message); }
  }
  // fallback contribuições via deno API se ainda null
  if(contribs===null){
    try{
      const r = await fetch(`https://github-contributions-api.deno.dev/${USER}.json`);
      if(r.ok){
        const j = await r.json();
        if(typeof j.totalContributions==='number') contribs = j.totalContributions;
      }
    }catch{}
  }
  if(contribs===null) contribs = 166;

  const out = {
    contribs,
    repos: reposCount,
    stars,
    projects,
    languages,
    contribLevels,
    updatedAt: new Date().toISOString(),
    source: 'action'
  };

  mkdirSync('data', { recursive: true });
  writeFileSync('data/github.json', JSON.stringify(out, null, 2) + '\n');
  console.log('Wrote data/github.json', out);
} catch(e){
  console.error(e);
  process.exit(1);
}
