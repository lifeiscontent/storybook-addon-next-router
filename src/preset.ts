export function config(entry: unknown[] = []): unknown[] {
  return [...entry, require.resolve('./preset/addDecorator')];
}

export function managerEntries(entry: unknown[] = []): unknown[] {
  return [...entry, require.resolve('./preset/register')];
}
