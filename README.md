# my-portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with Tailwind CSS
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth animations and transitions
- **Accessible**: Semantic HTML5 markup with accessibility in mind
- **Optimized**: Built with Next.js for optimal performance

## Technologies Used

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Build Tool**: Next.js with Turbopack
- **Deployment**: Vercel (recommended)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sections

The portfolio includes the following sections:

1. **Hero**: Introduction with animated typing effect
2. **About**: Information about you and your experience
3. **Skills**: Technical skills with animated progress bars
4. **Projects**: Portfolio projects with filtering
5. **Experience**: Work and education history with timeline
6. **Contact**: Contact form and social links
7. **Footer**: Navigation links and social media

## Customization

To customize the portfolio for your own use:

1. Update personal information in the components
2. Replace placeholder links with your actual URLs
3. Update projects with your real projects
4. Customize colors and themes in the CSS
5. Update the hero section with your name and information

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Structure

```
my-portfolio/
├── app/
│   ├── components/     # React components
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/             # Static assets
└── ...                 # Configuration files
```

## License

This project is open source and available under the [MIT License](LICENSE).
