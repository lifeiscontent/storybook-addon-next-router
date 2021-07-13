export function config(entry: unknown[] = []): unknown[] {
  return [...entry, require.resolve('./addDecorator')];
}
