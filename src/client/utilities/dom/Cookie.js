export function read(name) {
  const matches = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);

  return matches ? matches.pop() : undefined;
}
