import tsCompile from '@tsbb/typescript';
import { BabelCompileOptions } from '@tsbb/babel';
import { babelTransform } from './watcher/babelTransform.js';
import { watcherCopyFiles } from './watcher/copyFiles.js';

export interface CompileOptions extends BabelCompileOptions {
  watch?: boolean;
  build?: boolean;
  entry?: string[];
  [key: string]: any;
}

export async function compile(options: CompileOptions = {}) {
  if (!options.useBabel) {
    return tsCompile({
      watch: options.watch,
      onCopyFiles: watcherCopyFiles,
    });
  }
  // ==Use Babel=============================================
  const err = [
    '\x1b[31;1m When compiling with\x1b[0m\x1b[33;1m Babel\x1b[0m\x1b[31;1m, you need to specify the compilation file, E.g:\x1b[0m\n',
    '    \x1b[35;1m$\x1b[0m\x1b[36;1m tsbb\x1b[0m build\x1b[33;1m src/*.{jsx,js}\x1b[0m --useBabel',
    '    \x1b[35;1m$\x1b[0m\x1b[36;1m tsbb\x1b[0m build\x1b[33;1m "src/**/*.ts"\x1b[0m --useBabel',
    '    \x1b[35;1m$\x1b[0m\x1b[36;1m tsbb\x1b[0m build\x1b[33;1m src/index.jsx\x1b[0m --useBabel',
    '    \x1b[35;1m$\x1b[0m\x1b[36;1m tsbb\x1b[0m build\x1b[33;1m src/index.jsx\x1b[0m \x1b[33;1m src/main.jsx\x1b[0m --useBabel\n',
  ];
  if (!options.entry?.length) {
    throw new Error(err.join('\n'));
  }
  babelTransform(options);
}