# yashasdevulapally.com

An interactive personal website for Yashas Devulapally, built with Next.js 16, React 19, and Tailwind CSS 4.

The site uses a quiet, readable portfolio layout with separate Home, Research & Work, Currently, and Volleyball pages. Navigation stays available at the top of every page.

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

- Drag the small blue YD object on the homepage, or move it with arrow keys; double-click or press Escape to reset
- Type `yashas` anywhere on the page to toggle the hidden “Blue Hour” theme
- Click personal or volleyball photos to open a larger view; Escape closes the viewer

All motion respects `prefers-reduced-motion`.

## Quality checks

```bash
npm run lint
npm run build
```
