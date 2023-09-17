export function commentOutImports(code) {
  return code.replace(/^import\s.*?;/gm, (match) => `//${match}`);
}
