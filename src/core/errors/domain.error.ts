export class DomainError extends Error {
  constructor(
    detail: string,
    public readonly code: number,
    public readonly source?: string,
  ) {
    super(detail);
  }
}
