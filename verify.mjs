import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const files=fs.readdirSync('dist').filter(f=>f.endsWith('.html'));
for(const file of files){const html=fs.readFileSync('dist/'+file,'utf8');assert(html.includes('<title>'),file+': title');assert(html.includes('name="description"'),file+': description');assert(html.includes('rel="canonical"'),file+': canonical');assert(html.includes('id="main"'),file+': main landmark');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+': one h1');const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,file+': unique ids');for(const [,url]of html.matchAll(/(?:src|href)="([^"\s]+)"/g)){if(/^(?:https?:|tel:|mailto:|data:)/.test(url))continue;const [target,hash]=url.split('#');if(!target&&!hash)continue;const dest=target||file;assert(fs.existsSync(path.join('dist',dest)),file+': missing '+url);if(hash){const destHtml=target?fs.readFileSync(path.join('dist',target),'utf8'):html;assert(destHtml.includes('id="'+hash+'"'),file+': missing anchor '+url)}}assert(!/<script[^>]*src="https?:/.test(html),file+': no external JS');}
for(const file of ['app.js','site.js'])execFileSync('node',['--check','dist/'+file]);
const data=JSON.parse(fs.readFileSync('dist/catalogue-data.json','utf8'));assert.equal(new Set(data.map(x=>x.id)).size,data.length);assert(data.length===6);for(const p of data)assert(fs.existsSync('dist/assets/'+p.image));
console.log('PASS: 7 pages; local links, assets, anchors, unique IDs, metadata, catalogue and JS syntax.');
