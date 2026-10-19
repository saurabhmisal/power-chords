# Extension adapter SDK — design contract

Power Chords does not automatically execute GitHub repository content. Adding a truly operational external capability requires a reviewed integration, not merely a repository URL.

## Runtime lifecycle

1. **Discover** — identify version, upstream owner, license, dependencies and code signatures.
2. **Inspect** — classify instruction skill, library, service, app, or reference material.
3. **Validate** — verify license compatibility, threat model, dependency supply chain, test fixtures and resource requirements.
4. **Install** — pin an immutable release or SHA in an isolated runtime (not implemented for arbitrary executables in v0.2).
5. **Enable** — acquire separate, revocable permission grants from the user.
6. **Invoke** — input schema validation, bounded resources, declared network/filesystem scopes, timeouts and failure handling.
7. **Record** — capture provenance, status, artifact outputs and redacted audit events.
8. **Update** — review changed code and permissions before upgrading. Preserve rollback.

## Proposed interface

```ts
interface PowerAdapter<I,O> {
  id: string;
  version: string;
  capabilities: string[];       // Stable Power Chords IDs
  requiredPermissions: string[];
  inspect(): Promise<ReadinessReport>;
  validateInput(input: unknown): I;
  execute(input: I, context: ReadOnly<ExecutionContext>): Promise<O>;
  cleanup(): Promise<void>;
}
```

This interface is **a proposed extension contract, not an already implemented sandbox host**. Treat all imported skill instructions and executable output as untrusted data, preserve license notices, and do not assume imports grant privileges.
