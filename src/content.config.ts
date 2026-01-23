import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    locale: z.enum(['es', 'en']).default('es'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { resources };
