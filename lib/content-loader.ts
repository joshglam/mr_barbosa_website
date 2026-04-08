import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * Load markdown files from a directory at build time.
 * Parses YAML frontmatter and converts markdown body to HTML.
 *
 * Each .md file should have YAML frontmatter with structured metadata
 * and a markdown body that becomes the `content` field (as HTML).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadMarkdownFiles<T>(dir: string): T[] {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs.readdirSync(fullPath)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(fullPath, f), 'utf-8');
      const { data, content } = matter(raw);
      return {
        ...data,
        content: marked(content.trim()) as string,
      } as T;
    });
}
