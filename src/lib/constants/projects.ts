import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    slug: "e-commerce-platform",
    shortDescription: "A full-featured online store with payment integration.",
    fullDescription:
      "Developed a responsive e-commerce platform with product listings, cart functionality, and secure checkout process. Integrated with Stripe for payments and implemented user authentication.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux"],
    features: [
      "Product catalog with filters and search",
      "User authentication and profiles",
      "Shopping cart and checkout process",
      "Order history and tracking",
      "Admin dashboard for inventory management"
    ],
    challenges: [
      "Optimized performance for large product catalogs",
      "Implemented secure payment processing",
      "Developed a responsive design for all devices"
    ],
    demoUrl: "https://example-ecommerce.com",
    codeUrl: "https://github.com/example/ecommerce"
  },
  {
    id: "2",
    title: "Task Management App",
    slug: "task-management-app",
    shortDescription: "A collaborative task management application for teams.",
    fullDescription:
      "Built a real-time task management application with drag-and-drop functionality, team collaboration features, and project tracking. Used WebSockets for real-time updates across clients.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "PostgreSQL"],
    features: [
      "Drag-and-drop task boards",
      "Real-time collaboration",
      "Task assignments and due dates",
      "Project progress tracking",
      "Team management"
    ],
    demoUrl: "https://example-tasks.com",
    codeUrl: "https://github.com/example/task-manager"
  },
  {
    id: "3",
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    shortDescription: "A weather application with interactive maps and forecasts.",
    fullDescription:
      "Created a weather dashboard that displays current conditions, forecasts, and historical data. Integrated with multiple weather APIs and implemented interactive maps for location selection.",
    technologies: ["React", "TypeScript", "Mapbox", "Weather API", "Chart.js"],
    features: [
      "Current weather conditions",
      "7-day forecast",
      "Interactive map for location selection",
      "Historical weather data",
      "Favorite locations"
    ],
    demoUrl: "https://example-weather.com",
    codeUrl: "https://github.com/example/weather-app"
  }
];
