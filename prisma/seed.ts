// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const blogPosts = [
//   {
//     title: "Welcome to KunTech Digital Forge",
//     slug: "welcome-to-kuntech",
//     content: "Kun Technologies builds websites, UI/UX designs, and modern digital platforms.",
//     published: true,
//   },
//   {
//     title: "Why Every Business Needs a Website",
//     slug: "why-business-needs-website",
//     content: "In today's digital economy, having a website is essential for growth.",
//     published: true,
//   },
// ];

// async function main() {
//   for (const post of blogPosts) {
//     await prisma.post.create({
//       data: post,
//     });
//   }

//   console.log("✅ Blog posts seeded successfully");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });