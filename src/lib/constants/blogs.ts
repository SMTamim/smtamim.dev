import { TBlog } from "@/lib/types";

export const blogs: TBlog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    slug: "getting-started-with-nextjs-14",
    excerpt:
      "Learn the fundamentals of Next.js 14 and how to build modern web applications with this powerful React framework.",
    content: `
      <h2>Introduction</h2>
      <p>Next.js has become one of the most popular React frameworks for building production-ready web applications. With the release of Next.js 14, the framework introduces several exciting new features and improvements.</p>
      
      <h2>New Features in Next.js 14</h2>
      <p>Some of the key features include:</p>
      <ul>
        <li>Improved Server Components support</li>
        <li>Enhanced performance optimizations</li>
        <li>Simplified data fetching</li>
        <li>Better developer experience</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js 14 project, run:</p>
      <pre><code>npx create-next-app@latest</code></pre>
      
      <h2>Conclusion</h2>
      <p>Next.js 14 continues to push the boundaries of what's possible with React, making it easier than ever to build fast, scalable web applications.</p>
    `,
    date: "2023-11-15",
    readTime: 5,
    tags: ["Next.js", "React", "Web Development"]
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    slug: "typescript-best-practices",
    excerpt: "Discover the best practices for writing clean, maintainable TypeScript code in your projects.",
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript brings type safety to JavaScript, helping catch errors early and improving code maintainability.</p>
      
      <h2>Best Practices</h2>
      <h3>1. Use Strict Mode</h3>
      <p>Always enable strict mode in your tsconfig.json:</p>
      <pre><code>{
        "compilerOptions": {
          "strict": true
        }
      }</code></pre>
      
      <h3>2. Prefer Interfaces for Public API</h3>
      <p>Use interfaces when defining contracts for your public API:</p>
      <pre><code>interface User {
        id: string;
        name: string;
      }</code></pre>
      
      <h3>3. Avoid Any Type</h3>
      <p>The 'any' type defeats the purpose of TypeScript. Always prefer proper typing.</p>
      
      <h2>Conclusion</h2>
      <p>Following these practices will help you write more robust and maintainable TypeScript code.</p>
    `,
    date: "2023-10-20",
    readTime: 8,
    tags: ["TypeScript", "JavaScript", "Programming"]
  },
  {
    id: "3",
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt:
      "Learn how to create web applications that are accessible to all users, including those with disabilities.",
    content: `
      <h2>Why Accessibility Matters</h2>
      <p>Accessible web applications ensure that all users, regardless of ability, can access and interact with your content.</p>
      
      <h2>Key Accessibility Principles</h2>
      <h3>1. Semantic HTML</h3>
      <p>Use proper HTML elements for their intended purpose:</p>
      <pre><code>&lt;button&gt;Click me&lt;/button&gt;</code></pre>
      
      <h3>2. Keyboard Navigation</h3>
      <p>Ensure all functionality is available via keyboard.</p>
      
      <h3>3. ARIA Attributes</h3>
      <p>Use ARIA attributes when native HTML isn't sufficient:</p>
      <pre><code>&lt;div role="button" tabindex="0"&gt;Custom button&lt;/div&gt;</code></pre>
      
      <h2>Testing Accessibility</h2>
      <p>Use tools like:</p>
      <ul>
        <li>Screen readers</li>
        <li>Keyboard navigation</li>
        <li>Accessibility audit tools</li>
      </ul>
      
      <h2>Conclusion</h2> <p>Building accessible applications isn't just good practice—it's essential for creating inclusive digital experiences.</p> `,
    date: "2023-09-10",
    readTime: 6,
    tags: ["Accessibility", "Web Development", "UI/UX"]
  }
];
