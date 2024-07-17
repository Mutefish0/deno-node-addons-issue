import Module from 'node:module'
import path from "node:path";

const standalone = Deno.args.includes("--standalone");

export function resolvePath(url: string, metaUrl: string) {
  let baseDir = "";
  if (standalone) {
    baseDir = path.dirname(Deno.execPath());
  } else {
    baseDir = path.dirname(metaUrl);
  }
  baseDir = baseDir.replace("file://", "");
  return path.resolve(baseDir, url);
}

const mod = new Module('')

const url = resolvePath("./audio.node", import.meta.url);


if (Deno.statSync(url).isFile) {
  const m = mod.require(url);
  console.log(m);
}


