import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const medieteknikk = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/medieteknikk' }),
  schema: z.object({
    title: z.string(),
    rolle: z.string(),
    aar: z.string().optional(),
    order: z.number().default(99),
    description: z.string().optional(),
    heroImage: z.string().optional().default(''),
    heroAlt: z.string().optional().default(''),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        }),
      )
      .optional()
      .default([]),
  }),
});

export const collections = { medieteknikk };
