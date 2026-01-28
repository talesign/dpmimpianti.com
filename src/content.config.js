import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";
import { z } from "astro/zod";

const servizi = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/servizi" }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      order: z.number(),
      listDescription: z.string(),
      listImage: image(),
      listImageAlt: z.string(),
      introTitle: z.string(),
      introDescription: z.string(),
      repairsLabel: z.string(),
      repairsTitle: z.string(),
      repairsDescription: z.string(),
      repairsList: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
      repairsCommonProblems: z.array(z.string()),
      repairsImage: image(),
      ctaLabel: z.string(),
      ctaTitle: z.string(),
      ctaDescription: z.string(),
      ctaImage: image(),
      bodyLabel: z.string(),
      bodyTitle: z.string(),
      bodyDescription: z.string(),
      bodyCta: z.string(),
    }),
});

export const collections = { servizi };
