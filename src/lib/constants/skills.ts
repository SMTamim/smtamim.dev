export const skills = {
  categories: [
    {
      name: "Frontend Development",
      icon: "/icons/frontend.svg"
    },
    {
      name: "Backend Development",
      icon: "/icons/backend.svg"
    },
    {
      name: "DevOps & Cloud",
      icon: "/icons/cloud.svg"
    },
    {
      name: "Soft Skills",
      icon: "/icons/soft-skills.svg"
    }
  ],
  technical: [
    {
      name: "JavaScript",
      icon: "/icons/javascript.svg",
      category: "Frontend Development",
      proficiency: 90
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      category: "Frontend Development",
      proficiency: 85
    },
    {
      name: "React",
      icon: "/icons/react.svg",
      category: "Frontend Development",
      proficiency: 88
    },
    {
      name: "Next.js",
      icon: "/icons/nextjs.svg",
      category: "Frontend Development",
      proficiency: 85
    },
    {
      name: "Node.js",
      icon: "/icons/nodejs.svg",
      category: "Backend Development",
      proficiency: 80
    },
    {
      name: "Express",
      icon: "/icons/express.svg",
      category: "Backend Development",
      proficiency: 75
    },
    {
      name: "MongoDB",
      icon: "/icons/mongodb.svg",
      category: "Backend Development",
      proficiency: 70
    },
    {
      name: "PostgreSQL",
      icon: "/icons/postgresql.svg",
      category: "Backend Development",
      proficiency: 65
    },
    {
      name: "GraphQL",
      icon: "/icons/graphql.svg",
      category: "Backend Development",
      proficiency: 70
    },
    {
      name: "HTML/CSS",
      icon: "/icons/html-css.svg",
      category: "Frontend Development",
      proficiency: 95
    },
    {
      name: "Tailwind CSS",
      icon: "/icons/tailwindcss.svg",
      category: "Frontend Development",
      proficiency: 85
    },
    {
      name: "Git",
      icon: "/icons/git.svg",
      category: "DevOps & Cloud",
      proficiency: 80
    },
    {
      name: "Docker",
      icon: "/icons/docker.svg",
      category: "DevOps & Cloud",
      proficiency: 65
    },
    {
      name: "AWS",
      icon: "/icons/aws.svg",
      category: "DevOps & Cloud",
      proficiency: 60
    }
  ],
  soft: [
    {
      name: "Problem Solving",
      icon: "/icons/problem-solving.svg",
      category: "Soft Skills",
      proficiency: 90
    },
    {
      name: "Team Leadership",
      icon: "/icons/leadership.svg",
      category: "Soft Skills",
      proficiency: 85
    },
    {
      name: "Communication",
      icon: "/icons/communication.svg",
      category: "Soft Skills",
      proficiency: 88
    },
    {
      name: "Time Management",
      icon: "/icons/time-management.svg",
      category: "Soft Skills",
      proficiency: 80
    },
    {
      name: "Adaptability",
      icon: "/icons/adaptability.svg",
      category: "Soft Skills",
      proficiency: 85
    },
    {
      name: "Collaboration",
      icon: "/icons/collaboration.svg",
      category: "Soft Skills",
      proficiency: 90
    },
    {
      name: "Creativity",
      icon: "/icons/creativity.svg",
      category: "Soft Skills",
      proficiency: 75
    },
    {
      name: "Attention to Detail",
      icon: "/icons/detail.svg",
      category: "Soft Skills",
      proficiency: 95
    }
  ]
};

export type Skill = {
  name: string;
  icon: string;
  category: string;
  proficiency: number;
};

export type SkillCategory = {
  name: string;
  icon: string;
};
