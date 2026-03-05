import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "Why Every Zimbabwean Business Needs a Professional Website in 2025",
    slug: "zimbabwean-business-website-2025",
    excerpt: "In today's digital-first economy, having a professional website is no longer optional—it's essential. Discover why Zimbabwean businesses are investing in their online presence.",
    content: `<p>The digital landscape in Zimbabwe is evolving rapidly. With increasing internet penetration and mobile connectivity, consumers are turning to the web to find products and services. Yet, a significant number of Zimbabwean businesses still lack a professional online presence.</p>
<h2>The Digital Shift in Zimbabwe</h2>
<p>Zimbabwe's internet users have grown substantially over the past five years, driven by affordable mobile data and smartphone adoption. This shift means your potential customers are online, searching for solutions that your business provides.</p>
<h2>Benefits of a Professional Website</h2>
<p><strong>Credibility & Trust:</strong> A well-designed website establishes your business as legitimate and trustworthy. In an era of online scams, a professional site sets you apart.</p>
<p><strong>24/7 Availability:</strong> Unlike a physical store, your website works around the clock, providing information and capturing leads even while you sleep.</p>
<p><strong>Wider Reach:</strong> A website extends your market beyond your physical location, allowing you to serve customers across Zimbabwe and internationally.</p>
<h2>Getting Started</h2>
<p>At KunTech, we specialize in building modern, fast, and SEO-optimized websites for Zimbabwean businesses. Our solutions are tailored to your industry and designed to generate real results. Contact us today to start your digital journey.</p>`,
    category: "Web Development",
    author: "KunTech Team",
    authorRole: "Digital Solutions",
    date: "2025-01-15",
    readTime: "5 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: JSON.stringify(["Web Development", "Zimbabwe", "Business"]),
  },
  {
    title: "SEO Strategies for Local Businesses in Zimbabwe",
    slug: "seo-strategies-local-businesses-zimbabwe",
    excerpt: "Learn proven SEO techniques to help your Zimbabwean business rank higher on Google and attract more local customers.",
    content: `<p>Search Engine Optimization (SEO) is one of the most cost-effective marketing strategies for local businesses. When done right, it puts your business in front of customers actively searching for your services.</p>
<h2>Understanding Local SEO</h2>
<p>Local SEO focuses on optimizing your online presence to attract business from relevant local searches. For Zimbabwean businesses, this means appearing in searches like "web developer in Harare" or "IT support Bulawayo."</p>
<h2>Key Strategies</h2>
<p><strong>Google Business Profile:</strong> Claim and optimize your Google Business listing with accurate information, photos, and regular updates.</p>
<p><strong>Local Keywords:</strong> Include location-specific keywords throughout your website content, meta descriptions, and headings.</p>
<p><strong>Mobile Optimization:</strong> With most Zimbabweans accessing the internet via mobile, a mobile-first website design is crucial for SEO success.</p>
<p><strong>Quality Content:</strong> Regularly publish valuable content that addresses the needs and questions of your local audience.</p>
<h2>Measuring Success</h2>
<p>Track your SEO progress using tools like Google Analytics and Search Console. Monitor your keyword rankings, organic traffic, and conversion rates to refine your strategy over time.</p>`,
    category: "SEO",
    author: "KunTech Team",
    authorRole: "Digital Marketing",
    date: "2025-01-28",
    readTime: "7 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    tags: JSON.stringify(["SEO", "Local Business", "Marketing"]),
  },
  {
    title: "E-commerce Trends Shaping Zimbabwe's Digital Market",
    slug: "ecommerce-trends-zimbabwe",
    excerpt: "From mobile payments to social commerce, explore the e-commerce trends transforming how Zimbabweans buy and sell online.",
    content: `<p>E-commerce in Zimbabwe is experiencing unprecedented growth. Driven by mobile money integration, improved logistics, and changing consumer behavior, online shopping is becoming mainstream.</p>
<h2>Mobile-First Commerce</h2>
<p>With EcoCash and other mobile money platforms deeply integrated into daily life, mobile commerce is the dominant force in Zimbabwe's e-commerce landscape. Businesses that optimize for mobile payments see significantly higher conversion rates.</p>
<h2>Social Commerce</h2>
<p>Platforms like WhatsApp, Facebook, and Instagram have become major sales channels for Zimbabwean businesses. Integrating social commerce features into your online strategy is essential.</p>
<h2>Building Your Online Store</h2>
<p>At KunTech, we build e-commerce solutions that are tailored to the Zimbabwean market, with integrated mobile payment gateways, local delivery tracking, and social media integration. Let us help you tap into the growing digital economy.</p>`,
    category: "E-commerce",
    author: "KunTech Team",
    authorRole: "E-commerce Specialist",
    date: "2025-02-10",
    readTime: "6 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: JSON.stringify(["E-commerce", "Zimbabwe", "Mobile Payments"]),
  },
  {
    title: "A Beginner's Guide to UI/UX Design Principles",
    slug: "beginners-guide-ui-ux-design",
    excerpt: "Master the fundamentals of user interface and experience design. Learn how good design drives engagement and business results.",
    content: `<p>Great design is invisible—it just works. Understanding UI/UX design principles is essential for creating digital products that users love.</p>
<h2>What is UI vs UX?</h2>
<p><strong>UI (User Interface)</strong> focuses on the visual elements—buttons, colors, typography, layouts. It's what users see and interact with.</p>
<p><strong>UX (User Experience)</strong> encompasses the entire journey—how easy it is to navigate, how quickly users can accomplish tasks, and how they feel using your product.</p>
<h2>Core Principles</h2>
<p><strong>Consistency:</strong> Maintain consistent design patterns throughout your application to reduce cognitive load.</p>
<p><strong>Hierarchy:</strong> Guide users' attention through visual hierarchy using size, color, and spacing.</p>
<p><strong>Feedback:</strong> Every user action should have a clear response—loading states, success messages, error handling.</p>
<p><strong>Simplicity:</strong> Remove unnecessary elements. Every component should serve a purpose.</p>`,
    category: "Design",
    author: "KunTech Team",
    authorRole: "Design Lead",
    date: "2025-02-20",
    readTime: "8 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tags: JSON.stringify(["UI/UX", "Design", "Tutorial"]),
  },
  {
    title: "Digital Transformation: A Roadmap for Zimbabwean Companies",
    slug: "digital-transformation-zimbabwe",
    excerpt: "Learn how to lead your organization through digital transformation with practical steps and real-world examples from the Zimbabwean market.",
    content: `<p>Digital transformation isn't just about adopting new technology—it's about fundamentally changing how your business operates and delivers value to customers.</p>
<h2>Why Transform Now?</h2>
<p>The competitive landscape is shifting. Companies that embrace digital tools are outperforming those that don't. In Zimbabwe, early adopters of digital solutions are capturing market share and building stronger customer relationships.</p>
<h2>Steps to Transform</h2>
<p><strong>Assess Your Current State:</strong> Audit your existing processes, technology, and capabilities.</p>
<p><strong>Define Your Vision:</strong> What does digital success look like for your business?</p>
<p><strong>Start Small:</strong> Begin with quick wins—digitize a manual process, launch a website, or automate customer communications.</p>
<p><strong>Scale Gradually:</strong> Build on successes with more complex integrations and systems.</p>
<h2>How KunTech Can Help</h2>
<p>We partner with businesses at every stage of their digital journey. From building your first website to creating custom business systems, we provide the technology and expertise to drive your transformation.</p>`,
    category: "Digital Transformation",
    author: "KunTech Team",
    authorRole: "Strategy",
    date: "2025-03-01",
    readTime: "6 min",
    featured: false,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    tags: JSON.stringify(["Digital Transformation", "Strategy", "Zimbabwe"]),
  },
  {
    title: "Case Study: Building a Reward System for a Retail Chain",
    slug: "case-study-reward-system-retail",
    excerpt: "How KunTech developed a custom loyalty and reward system that increased customer retention by 40% for a Zimbabwean retail chain.",
    content: `<p>When a leading Zimbabwean retail chain approached us to build a customer loyalty system, we knew a one-size-fits-all solution wouldn't work. Here's how we created a custom platform that delivered measurable results.</p>
<h2>The Challenge</h2>
<p>The client needed a system that integrated with their existing POS, tracked customer purchases, managed reward points, and provided analytics on customer behavior—all while being simple enough for staff to use daily.</p>
<h2>Our Solution</h2>
<p>We built a custom web-based reward platform with mobile integration, real-time point tracking, automated reward notifications, and a comprehensive admin dashboard for management insights.</p>
<h2>The Results</h2>
<p><strong>40% increase</strong> in customer retention within 6 months. <strong>25% boost</strong> in average transaction value from repeat customers. <strong>60% adoption rate</strong> among existing customers in the first quarter.</p>
<p>This project demonstrates the power of custom software tailored to specific business needs. Contact KunTech to discuss how we can build solutions for your business.</p>`,
    category: "Case Studies",
    author: "KunTech Team",
    authorRole: "Project Lead",
    date: "2025-03-02",
    readTime: "5 min",
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: JSON.stringify(["Case Study", "Custom Software", "Retail"]),
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing posts
  await prisma.blogPost.deleteMany();
  console.log("Cleared existing blog posts");

  // Create new posts
  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    });
    console.log(`Created post: ${post.title}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

