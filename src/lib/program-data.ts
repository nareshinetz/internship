export type Duration = "1 Week" | "2 Weeks" | "1 Month" | "3 Months";
export type TechStack = "MERN" | "Java" | "Python" | "DataScienceAI" | "DataAnalytics" | "Embedded";

export interface SyllabusItem {
  label: string;
  title: string;
  tools: string[];
  topics: string[];
}

export interface ProjectItem {
  title: string;
  tech: string[];
  img: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ProgramDetails {
  title: string;
  subtitle: string;
  heroImg: string;
  syllabus: SyllabusItem[];
  projects: ProjectItem[]; // Added
  reviews: ReviewItem[];   // Added
}

export const programData: Record<TechStack, Record<Duration, ProgramDetails>> = {
  MERN: {
    "1 Week": {
      title: "MERN Stack Sprint",
      subtitle: "5-Day Full-Stack Portfolio Sprint",
      heroImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2072",
      syllabus: [
        { label: "Day 1", title: "Semantic Structure & SEO", tools: ["html5"], topics: ["HTML5 Semantics", "Document Hierarchy", "SEO Basics", "Metadata"] },
        { label: "Day 2", title: "Visual Identity & Box Model", tools: ["css3"], topics: ["CSS Box Model", "Modern Typography", "CSS Variables", "Branding"] },
        { label: "Day 3", title: "Modern Layouts", tools: ["css3"], topics: ["Flexbox Mastery", "CSS Grid Systems", "Sticky Positioning", "Navigation"] },
        { label: "Day 4", title: "Responsive Design", tools: ["tailwind"], topics: ["Mobile-First Workflow", "Media Queries", "Micro-interactions", "Animations"] },
        { label: "Day 5", title: "Git & Global Deployment", tools: ["github"], topics: ["Git Workflow", "Remote Repos", "GitHub Pages", "CI/CD Basics"] },
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "2 Weeks": {
      title: "Advanced MERN Development",
      subtitle: "From Logic to Full-Stack Build",
      heroImg: "https://images.unsplash.com/photo-1579403174647-010476aa01e8?q=80&w=2072",
      syllabus: [
        { label: "Day 1", title: "Semantic Structure", tools: ["html5"], topics: ["Semantic HTML5 Tags", "Head vs Body", "Document Hierarchy", "Digital Business Card Task"] },
        { label: "Day 2", title: "Visual Identity", tools: ["css3"], topics: ["CSS Box Model", "Google Fonts Integration", "Custom Color Palettes", "Circular Image Styling"] },
        { label: "Day 3", title: "Modern Layouts", tools: ["css3"], topics: ["Flexbox Alignment", "Relative vs Absolute Position", "Navigation Bars", "Services Card Grid"] },
        { label: "Day 4", title: "Mobile-First Design", tools: ["css3", "tailwind"], topics: ["Media Queries", "Viewport Settings", "Responsive Card Stacking", "Breakpoint Logic"] },
        { label: "Day 5", title: "Modern UI Techniques", tools: ["css3"], topics: ["Box Shadows & Gradients", "CSS Transitions", "Hover Animations", "UI Clone Challenge"] },
        { label: "Day 6", title: "Programming Logic", tools: ["javascript"], topics: ["Variables (let/const)", "Data Types", "Template Literals", "Welcome Bot Script"] },
        { label: "Day 7", title: "Decision Making", tools: ["javascript"], topics: ["If/Else Statements", "Comparison Operators", "Arrow Functions", "Tip Calculator Project"] },
        { label: "Day 8", title: "DOM Interaction", tools: ["javascript"], topics: ["querySelector & getElementById", "Event Listeners", "Class Toggling", "Dark Mode Switcher"] },
        { label: "Day 9", title: "Working with Data", tools: ["javascript"], topics: ["Arrays & Objects", ".push() Method", ".forEach() Rendering", "Dynamic To-Do List"] },
        { label: "Day 10", title: "Capstone Project", tools: ["javascript", "html5", "css3"], topics: ["Full Tool Integration", "Measuring Logic", "Smart Tailor Calculator", "Final Build Summary"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "1 Month": {
      title: "MERN Frontend Specialist",
      subtitle: "Foundations to Asynchronous Apps",
      heroImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
      syllabus: [
        { label: "Day 1", title: "HTML5 & Semantic SEO", tools: ["html5"], topics: ["ARIA Accessibility", "Metadata Optimization", "Document Hierarchy", "Technical Doc Task"] },
        { label: "Day 2", title: "CSS Box Model Mastery", tools: ["css3"], topics: ["Border-Box Sizing", "Specificity Rules", "Margin vs Padding", "3D Hover Effects"] },
        { label: "Day 3", title: "Flexbox Architecture", tools: ["css3"], topics: ["Alignment & Justification", "Flex-Grow Logic", "Gap Property", "YouTube Nav Clone"] },
        { label: "Day 4", title: "Advanced CSS Grid", tools: ["css3"], topics: ["Template Areas", "FR Unit Sizing", "Implicit Grids", "Magazine Layout Task"] },
        { label: "Day 5", title: "Mobile-First Strategy", tools: ["css3", "tailwind"], topics: ["Viewport Settings", "Relative Units (REM/VH)", "Media Query Logic", "Responsive Magazine"] },
        { label: "Day 6", title: "Modern UI Animations", tools: ["css3"], topics: ["CSS Custom Variables", "Keyframe Timelines", "Transitions", "Slide-in Menu Build"] },
        { label: "Day 7", title: "Professional Forms", tools: ["html5", "css3"], topics: ["Pseudo-class Styling", "Validation States", "Input Management", "Tailor Booking Form"] },
        { label: "Day 8", title: "JavaScript Fundamentals", tools: ["javascript"], topics: ["Variable Scoping", "Template Literals", "Type Conversion", "Story Generator Task"] },
        { label: "Day 9", title: "Control Flow & Logic", tools: ["javascript"], topics: ["Logical Operators", "Switch Statement Case", "Truthiness Check", "Password Strength Tool"] },
        { label: "Day 10", title: "Functions & Scoping", tools: ["javascript"], topics: ["Arrow Function Syntax", "Return Value Logic", "Block vs Global", "Currency Converter"] },
        { label: "Day 11", title: "DOM Manipulation", tools: ["javascript"], topics: ["Query Selectors", "Event Listeners", "Inline Style Control", "Dark Mode Toggle"] },
        { label: "Day 12", title: "Array & List Logic", tools: ["javascript"], topics: ["Stack/Queue Methods", "Iteration Patterns", "Reference Types", "Live Shopping List"] },
        { label: "Day 13", title: "Objects & JSON Data", tools: ["javascript"], topics: ["Key-Value Mapping", "JSON Stringification", "Nested Data", "Customer Profile Object"] },
        { label: "Day 14", title: "High-Order Functions", tools: ["javascript"], topics: [".map() & .filter()", ".sort() Logic", "Functional Pipelines", "Product Filter Project"] },
        { label: "Day 15", title: "Persistence & Storage", tools: ["javascript"], topics: ["DOM Node Creation", "LocalStorage API", "State Preservation", "Persistent To-Do App"] },
        { label: "Day 16", title: "Asynchronous JS Basics", tools: ["javascript"], topics: ["The Event Loop", "Callback Patterns", "SetTimeout/Interval", "Real-time Clock Build"] },
        { label: "Day 17", title: "Promises & Fetch API", tools: ["javascript"], topics: ["API Request Cycle", "Then/Catch Chains", "Data Serialization", "Random User Dashboard"] },
        { label: "Day 18", title: "Modern Async/Await", tools: ["javascript"], topics: ["Async Syntax", "Try/Catch Handling", "Endpoint Integration", "Live Weather App"] },
        { label: "Day 19", title: "Tooling & Deployment", tools: ["github"], topics: ["Chrome DevTools", "Git Branching", "Netlify Hosting", "Bug Squashing Session"] },
        { label: "Day 20", title: "Final Residency Capstone", tools: ["javascript", "html5", "css3"], topics: ["Full Architecture", "Performance Tuning", "Live Deployment", "Final Presentation"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "3 Months": {
      title: "MERN Full-Stack Development",
      subtitle: "System Architecture & Deployment",
      heroImg: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2072",
      syllabus: [
        { label: "Mon 1", title: "UI & Logic Foundation", tools: ["html5", "css3", "javascript"], topics: ["Advanced Flex/Grid Layouts", "Responsive Netflix Clone", "Smart Fabric Calculator", "DOM & LocalStorage"] },
        { label: "Mon 2", title: "Modern Frontend (React)", tools: ["react", "tailwind", "javascript"], topics: ["Hooks (useState/useEffect)", "API Data Fetching", "React Router Navigation", "Context API State"] },
        { label: "Mon 3", title: "Backend & Database", tools: ["node", "mongodb", "github"], topics: ["Express Server Routing", "Mongoose Schema Design", "RESTful CRUD APIs", "Full-Stack Cloud Deploy"] },
        { label: "Final", title: "Capstone: Enterprise App", tools: ["react", "node", "mongodb"], topics: ["Frontend-Backend Auth", "Database Integration", "Performance Testing", "Live System Launch"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
  },
  Java: {
    "1 Week": {
      title: "Java Fundamentals",
      subtitle: "Core OOP Basics",
      heroImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
      syllabus: [
        { label: "Day 1", title: "Java Syntax", tools: ["java"], topics: ["JVM/JDK Architecture", "Data Types", "Operators", "First Program"] },
        { label: "Day 2", title: "Control Flow", tools: ["java"], topics: ["Loops", "Switch Statements", "Logic Gates", "Pattern Printing"] },
        { label: "Day 3", title: "OOPS Phase 1", tools: ["java"], topics: ["Classes & Objects", "Constructors", "This Keyword", "Encapsulation"] },
        { label: "Day 4", title: "OOPS Phase 2", tools: ["java"], topics: ["Inheritance", "Polymorphism", "Abstract Classes", "Interfaces"] },
        { label: "Day 5", title: "Java Collections", tools: ["java"], topics: ["ArrayList", "HashMap", "Collections Class", "Exception Handling"] },
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "2 Weeks": {
      title: "Java Intermediate",
      subtitle: "Enterprise Foundations",
      heroImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      syllabus: [
        { label: "Week 1", title: "Core & Collections", tools: ["java"], topics: ["Generics", "Streams API", "Lambda Expressions", "File I/O"] },
        { label: "Week 2", title: "Java Database", tools: ["postgresql", "java"], topics: ["JDBC Basics", "SQL Queries", "Design Patterns", "Library Management Project"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "1 Month": {
      title: "Backend Engineer (Java)",
      subtitle: "Spring Framework Specialist",
      heroImg: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2070",
      syllabus: [
        { label: "Mon 1", title: "Spring Core", tools: ["spring"], topics: ["Inversion of Control", "Dependency Injection", "Spring Beans", "Annotations"] },
        { label: "Mon 2", title: "Spring Boot API", tools: ["spring"], topics: ["REST Controllers", "Spring Data JPA", "Hibernate", "H2 Database"] },
        { label: "Mon 3", title: "Security & Validation", tools: ["spring"], topics: ["Spring Security Basics", "DTO Patterns", "Exception Handling", "Swagger Docs"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "3 Months": {
      title: "Java Full-Stack Mastery",
      subtitle: "Spring Boot & Microservices",
      heroImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      syllabus: [
        { label: "Mon 1", title: "Advanced Java & SQL", tools: ["java", "postgresql"], topics: ["Multithreading", "Memory Management", "Complex SQL Joins", "Maven/Gradle"] },
        { label: "Mon 2", title: "Spring Boot Mastery", tools: ["spring", "postgresql"], topics: ["Microservices Intro", "Spring Cloud", "Eureka Discovery", "API Gateway"] },
        { label: "Mon 3", title: "Full-Stack Java", tools: ["react", "spring"], topics: ["React Integration", "JWT Security", "JUnit Testing", "Docker & AWS Deploy"] },
        { label: "Final", title: "Enterprise Capstone", tools: ["spring", "react", "docker"], topics: ["System Architecture", "Performance Profiling", "Production Launch", "SDR Review"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
  },
  Python: {
    "1 Week": {
      title: "Python Quickstart",
      subtitle: "Automation & Scripts",
      heroImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
      syllabus: [
        { label: "Day 1", title: "Python Basics", tools: ["python"], topics: ["Variables", "Data Types", "Input/Output", "Indentation Logic"] },
        { label: "Day 2", title: "Data Structures", tools: ["python"], topics: ["Lists", "Dictionaries", "Tuples", "List Comprehension"] },
        { label: "Day 3", title: "Functional Python", tools: ["python"], topics: ["Functions", "Modules", "Pip Packages", "Local/Global Scope"] },
        { label: "Day 4", title: "File & Error Handling", tools: ["python"], topics: ["Try/Except", "File I/O", "Regular Expressions", "JSON Parsing"] },
        { label: "Day 5", title: "Scripting & Automation", tools: ["python"], topics: ["BeautifulSoup Intro", "OS Module", "Github basics", "Final Script Demo"] },
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "2 Weeks": {
      title: "Python Data Specialist",
      subtitle: "Logic to Data Science",
      heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      syllabus: [
        { label: "Week 1", title: "OOP Python", tools: ["python"], topics: ["Classes & Methods", "Inheritance", "Decorators", "Iterators"] },
        { label: "Week 2", title: "Data Analysis Intro", tools: ["python"], topics: ["NumPy Basics", "Pandas Dataframes", "Data Cleaning", "Matplotlib Visualization"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "1 Month": {
      title: "Web Developer (Python)",
      subtitle: "Django & Flask Specialist",
      heroImg: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2070",
      syllabus: [
        { label: "Phase 1", title: "Flask Web Apps", tools: ["python"], topics: ["Routing", "Jinja2 Templates", "Request Handling", "Small Web App"] },
        { label: "Phase 2", title: "Django Framework", tools: ["python"], topics: ["MTV Architecture", "Models & ORM", "Django Admin", "Authentication"] },
        { label: "Phase 3", title: "Deployment", tools: ["github"], topics: ["PostgreSQL Integration", "Heroku/Railway", "Gunicorn", "API Integration"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "3 Months": {
      title: "Python Full-Stack Mastery",
      subtitle: "AI, Data & Web Systems",
      heroImg: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070",
      syllabus: [
        { label: "Month 1", title: "Web Backend (Django)", tools: ["python", "postgresql"], topics: ["Advanced Django ORM", "REST Framework (DRF)", "Middleware", "Celery Tasks"] },
        { label: "Month 2", title: "Data & AI Intro", tools: ["python"], topics: ["Pandas Deep Dive", "Scikit-Learn Basics", "Predictive Modeling", "API Deployment"] },
        { label: "Month 3", title: "Full-Stack & Cloud", tools: ["react", "python"], topics: ["React Frontend", "FastAPI Intro", "Dockerizing Apps", "Cloud Infrastructure"] },
        { label: "Final", title: "Enterprise Capstone", tools: ["python", "react", "aws"], topics: ["System Architecture", "Security Audit", "Production Release", "Portfolio Presentation"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
  },
  DataAnalytics: {
    "1 Week": {
      title: "Data Analytics Foundations",
      subtitle: "Excel & Statistics Sprint",
      heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      syllabus: [
        { label: "Day 1", title: "Advanced Excel", tools: ["excel"], topics: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Data Cleaning", "Power Query"] },
        { label: "Day 2", title: "Business Statistics", tools: ["excel"], topics: ["Descriptive Stats", "Probability", "Hypothesis Testing", "Outliers"] },
        { label: "Day 3", title: "SQL for Data", tools: ["postgresql"], topics: ["SELECT & WHERE", "JOIN Operations", "GROUP BY Aggregates", "Subqueries"] },
        { label: "Day 4", title: "Data Visualization", tools: ["powerbi"], topics: ["Chart Selection", "Dashboard Layout", "DAX Basics", "Slicers"] },
        { label: "Day 5", title: "Capstone Project", tools: ["powerbi"], topics: ["Data Storytelling", "Executive Reporting", "Live Dashboard Build", "Presentation"] },
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "2 Weeks": {
      title: "SQL & BI Mastery",
      subtitle: "Relational Data & Dashboards",
      heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      syllabus: [
        { label: "Week 1", title: "Advanced SQL", tools: ["postgresql"], topics: ["Window Functions", "CTEs", "Views & Indexes", "Database Normalization"] },
        { label: "Week 2", title: "Power BI / Tableau", tools: ["powerbi"], topics: ["Data Modeling", "Calculated Columns", "Row-Level Security", "Automated Refresh"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "1 Month": {
      title: "Professional Data Analyst",
      subtitle: "Python for Data Analysis",
      heroImg: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070",
      syllabus: [
        { label: "Phase 1", title: "Python Basics", tools: ["python"], topics: ["Lists & Dictionaries", "Loops", "Functions", "Error Handling"] },
        { label: "Phase 2", title: "Pandas & NumPy", tools: ["python"], topics: ["DataFrame Operations", "Vectorized Math", "Data Merging", "Missing Value Treatment"] },
        { label: "Phase 3", title: "Exploratory Data Analysis", tools: ["python"], topics: ["Seaborn Charts", "Correlation Analysis", "Statistical Visualization", "Reporting"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "3 Months": {
      title: "Data Analytics Mastery",
      subtitle: "End-to-End Analytics Engineering",
      heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      syllabus: [
        { label: "Mon 1", title: "SQL & Data Modeling", tools: ["postgresql"], topics: ["Star Schema", "Snowflake Schema", "ETL Pipelines", "Data Warehousing"] },
        { label: "Mon 2", title: "Advanced BI & Python", tools: ["powerbi", "python"], topics: ["Python in Power BI", "Advanced DAX", "Predictive Analytics", "Data Governance"] },
        { label: "Mon 3", title: "Big Data Tools", tools: ["python"], topics: ["Spark Intro", "Cloud Data Basics (AWS/Azure)", "Automation Scripts", "A/B Testing"] },
        { label: "Final", title: "Enterprise Capstone", tools: ["powerbi", "python", "postgresql"], topics: ["Real-world Dataset", "Automated ETL", "Interactive Story", "SDR Review"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    }
  },
  DataScienceAI: {
    "1 Week": {
      title: "AI & ML Quickstart",
      subtitle: "Core Concept Crash Course",
      heroImg: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070",
      syllabus: [
        { label: "Day 1", title: "Math for AI", tools: ["python"], topics: ["Linear Algebra", "Calculus Basics", "Matrices", "Vectors"] },
        { label: "Day 2", title: "Scikit-Learn Basics", tools: ["python"], topics: ["Regression", "Classification", "Train/Test Split", "Feature Scaling"] },
        { label: "Day 3", title: "Clustering & Patterns", tools: ["python"], topics: ["K-Means", "PCA", "Customer Segmentation", "Anomaly Detection"] },
        { label: "Day 4", title: "Neural Networks Intro", tools: ["tensorflow"], topics: ["Perceptrons", "Activation Functions", "Layers", "Weights"] },
        { label: "Day 5", title: "AI Model Demo", tools: ["python"], topics: ["Model Training", "Prediction API", "Validation", "Live Testing"] },
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "2 Weeks": {
      title: "Machine Learning Specialist",
      subtitle: "Algorithm Deep Dive",
      heroImg: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069",
      syllabus: [
        { label: "Week 1", title: "Supervised Learning", tools: ["python"], topics: ["Random Forests", "XGBoost", "SVMs", "Hyperparameter Tuning"] },
        { label: "Week 2", title: "Deep Learning Intro", tools: ["pytorch"], topics: ["Backpropagation", "Gradient Descent", "CNNs", "Computer Vision Basics"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "1 Month": {
      title: "Deep Learning Engineer",
      subtitle: "Vision & Language Systems",
      heroImg: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?q=80&w=2070",
      syllabus: [
        { label: "Phase 1", title: "Computer Vision", tools: ["pytorch"], topics: ["Image Processing", "Object Detection", "YOLO", "Transfer Learning"] },
        { label: "Phase 2", title: "Natural Language Processing", tools: ["python"], topics: ["Tokenization", "RNNs", "Word Embeddings", "Sentiment Analysis"] },
        { label: "Phase 3", title: "Model Deployment", tools: ["flask", "docker"], topics: ["Model Serialization", "API Endpoints", "Dockerization", "Cloud Setup"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "3 Months": {
      title: "AI & GenAI Mastery",
      subtitle: "Large Language Models & MLOps",
      heroImg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070",
      syllabus: [
        { label: "Mon 1", title: "Advanced ML Pipeline", tools: ["python", "postgresql"], topics: ["Feature Stores", "Data Engineering", "Ensemble Methods", "Model Tracking"] },
        { label: "Mon 2", title: "LLM Foundations", tools: ["pytorch"], topics: ["Transformer Architecture", "Attention Mechanisms", "HuggingFace", "BERT/GPT Intro"] },
        { label: "Mon 3", title: "Generative AI", tools: ["pytorch"], topics: ["Prompt Engineering", "Fine-tuning LLMs", "LangChain", "Vector Databases"] },
        { label: "Final", title: "Capstone: Intelligent App", tools: ["pytorch", "aws"], topics: ["End-to-End AI System", "Scaling Inference", "Live Monitoring", "Final Portfolio"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    }
  },
  Embedded: {
    "1 Week": {
      title: "Electronics 101",
      subtitle: "Hardware Foundations",
      heroImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
      syllabus: [
        { label: "Day 1", title: "Circuit Basics", tools: ["multimeter"], topics: ["Ohm's Law", "Components (Resistors/LEDs)", "Voltage/Current", "Breadboarding"] },
        { label: "Day 2", title: "Microcontroller Intro", tools: ["arduino"], topics: ["Arduino IDE", "Digital I/O", "Analog Signals", "Blink/Serial"] },
        { label: "Day 3", title: "Sensors & Actuators", tools: ["arduino"], topics: ["Ultrasonic Sensors", "Servos", "LCD Screens", "Potentiometers"] },
        { label: "Day 4", title: "Protocols", tools: ["arduino"], topics: ["I2C Communication", "SPI Interface", "UART Serial", "Device Interfacing"] },
        { label: "Day 5", title: "Mini Project", tools: ["arduino"], topics: ["Circuit Assembly", "Code Integration", "Debugging", "Demo"] },
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "2 Weeks": {
      title: "Embedded C Mastery",
      subtitle: "Firmware Development",
      heroImg: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070",
      syllabus: [
        { label: "Week 1", title: "C for Embedded", tools: ["c"], topics: ["Bitwise Operations", "Pointers", "Memory Mapping", "Register Access"] },
        { label: "Week 2", title: "STM32 Basics", tools: ["stm32"], topics: ["ARM Cortex M4", "HAL Drivers", "Timers & Interrupts", "DMA Control"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "1 Month": {
      title: "IoT Systems Engineer",
      subtitle: "Connected Devices & Wireless",
      heroImg: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070",
      syllabus: [
        { label: "Phase 1", title: "ESP32 & Wi-Fi", tools: ["esp32"], topics: ["TCP/IP", "Webservers", "OTA Updates", "Deep Sleep Modes"] },
        { label: "Phase 2", title: "IoT Protocols", tools: ["esp32"], topics: ["MQTT", "HTTP/REST", "JSON Parsing", "AWS IoT Core"] },
        { label: "Phase 3", title: "Bluetooth & Mesh", tools: ["esp32"], topics: ["BLE (Bluetooth Low Energy)", "Mesh Networks", "Security", "Phone Connectivity"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    },
    "3 Months": {
      title: "Embedded Product Mastery",
      subtitle: "RTOS & Advanced Firmware",
      heroImg: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069",
      syllabus: [
        { label: "Mon 1", title: "Real-Time OS (RTOS)", tools: ["freertos"], topics: ["Task Management", "Semaphores", "Mutexes", "Queues"] },
        { label: "Mon 2", title: "Embedded Linux", tools: ["raspberrypi"], topics: ["Kernel Basics", "Device Drivers", "Yocto Project", "Shell Scripting"] },
        { label: "Mon 3", title: "PCB Design", tools: ["kicad"], topics: ["Schematic Design", "Layout Routing", "Gerber Files", "Component Sourcing"] },
        { label: "Final", title: "Hardware Capstone", tools: ["stm32", "freertos"], topics: ["Custom PCB Build", "Firmware Logic", "Production Testing", "Launch Presentation"] }
      ],
      projects: [
        { title: "E-Commerce OS", tech: ["React", "Node", "MongoDB"], img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800" },
        { title: "SaaS Dashboard", tech: ["Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" }
      ],
      reviews: [
        { name: "Arjun Mehta", role: "SDE Intern @ Google", text: "The MERN roadmap is incredibly dense and practical.", rating: 5 }
      ]
    }
  }
};