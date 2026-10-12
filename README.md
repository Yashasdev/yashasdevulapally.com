# yashasdevulapally.com

An interactive personal website for Yashas Devulapally, built with Next.js 16, React 19, and Tailwind CSS 4.

The site is designed as a blue-first editorial portfolio, combining a live “Currently Running” section with selected biomedical engineering, research, leadership, and volleyball stories.

## Run locally

Node.js 20.9 or newer is required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating personal content

Site copy and project data live in `lib/content.ts`, including:

- Profile introduction and social links
- “Currently Running” status fields
- Selected projects and experience stories
- Volleyball and impact statistics

## Interactions

- Drag the blue YD object in the hero; double-click it to reset
- Type `yashas` anywhere on the page to toggle the hidden “Blue Hour” theme
- Desktop visitors receive a custom responsive cursor

All motion respects `prefers-reduced-motion`.

## Quality checks

```bash
npm run lint
npm run build
```
