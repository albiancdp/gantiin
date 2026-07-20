import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf-8"));
const version = pkg.version ?? "0.0.0";

const output = `// Auto-generated — jangan diedit langsung. Jalankan \`npm run build\` atau \`node scripts/update-version.mjs\`.
export const APP_VERSION = "${version}";
`;

writeFileSync(resolve(root, "src/lib/version.ts"), output, "utf-8");
console.log(`✅ Version updated: ${version}`);
