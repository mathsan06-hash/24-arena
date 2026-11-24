// Generates the Android (Trusted Web Activity) project for 24 Arena from twa-manifest.json.
// Used by .github/workflows/android.yml; needs @bubblewrap/core installed.
const path = require('path');
const { TwaManifest, TwaGenerator, ConsoleLog } = require('@bubblewrap/core');

(async () => {
  const manifest = await TwaManifest.fromFile(path.join(__dirname, 'twa-manifest.json'));
  if (process.env.ICON_BASE) {
    manifest.iconUrl = process.env.ICON_BASE + '/icon-512.png';
    manifest.maskableIconUrl = process.env.ICON_BASE + '/icon-maskable-512.png';
  }
  const problem = manifest.validate();
  if (problem) throw new Error(problem);
  const target = path.join(__dirname, '..', 'build', 'twa');
  await new TwaGenerator().createTwaProject(target, manifest, new ConsoleLog('generate'));
  console.log('Android project ready:', target);
})().catch(error => { console.error(error); process.exit(1); });
