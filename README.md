# yashasdevulapally.com

An interactive personal website for Yashas Devulapally, built with Next.js 16, React 19, and Tailwind CSS 4.

The site is designed as a blue-first editorial playground rather than an online résumé. Its centerpiece is **Yashas OS**, a set of interactive modules spanning building, exploring, competing, creating, and thinking.

## Run locally

Node.js 20.9 or newer is required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating personal content

All frequently changing copy lives in `lib/content.ts`, including:

- Profile introduction and social links
- Yashas OS module descriptions
- “Currently Running” status fields
- Selected project and experience stories
- Thinking-mode prompts

## Interactions

- Drag the blue YD object in the hero; double-click it to reset
- Open each module in Yashas OS for a different mini-experience
- Type `yashas` anywhere on the page to toggle the hidden “Blue Hour” theme
- Desktop visitors receive a custom responsive cursor

All motion respects `prefers-reduced-motion`.

## Quality checks

```bash
npm run lint
npm run build
```
