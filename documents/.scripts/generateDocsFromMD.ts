import * as fse from 'fs-extra';
import globby from 'globby';
import path from 'path';
import { DOCS_ROOT, PACKAGES_ROOT } from './const';

export async function generateDocsFromMD() {
  console.log('⚙️ Generating docs from MD...');

  return await Promise.all([copyMDDocs(DOCS_ROOT, ["'**/*.md", 'documents/**/*', 'docs/**/*'])]);
}

async function copyMDDocs(outdir: string, exclude: string[]) {
  const filepaths = (
    await globby('**/*.md', {
      cwd: PACKAGES_ROOT,
      ignore: exclude,
    })
  ).filter((filepath) => !filepath.includes('node_modules'));

  console.log('🔎 filepaths', filepaths);

  await Promise.all(
    filepaths.map(async (filepath) => {
      const destinationDir = path.dirname(filepath);

      const isReadme = path.basename(filepath).toLowerCase() === 'readme.md';

      if (destinationDir === '.' && isReadme) return await copyFile(filepath, path.join(outdir, 'index.md'));

      const destination = isReadme
        ? path.join(outdir, `${destinationDir.replace('src/', '')}.md`)
        : path.join(outdir, filepath.replace('src/', ''));

      console.log('🗒️ destination:', destination);

      await copyFile(filepath, destination);
    }),
  );

  console.log('✅ Copied MD docs to', outdir);
}

const copyFile = async (filePath: string, destination: string) => {
  await fse.ensureDir(path.dirname(destination));
  await fse.copy(path.join(PACKAGES_ROOT, filePath), destination);

  return;
};
