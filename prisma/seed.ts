import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Helper function to hash passwords
function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function main() {
  // Default password for all demo users
  const defaultPassword = hashPassword("password123");

  const [riya, ava, arjun, zara, kabir, admin] = await Promise.all([
    prisma.user.upsert({ 
      where: { email: "riya@kgpian.iitkgp.ac.in" }, 
      update: {}, 
      create: { name: "Riya Sen", email: "riya@kgpian.iitkgp.ac.in", password: defaultPassword, avatar: "https://i.pravatar.cc/150?img=10" } 
    }),
    prisma.user.upsert({ 
      where: { email: "ava@kgpian.iitkgp.ac.in" }, 
      update: {}, 
      create: { name: "Ava Rao", email: "ava@kgpian.iitkgp.ac.in", password: defaultPassword, avatar: "https://i.pravatar.cc/150?img=11" } 
    }),
    prisma.user.upsert({ 
      where: { email: "arjun@kgpian.iitkgp.ac.in" }, 
      update: {}, 
      create: { name: "Arjun Mehta", email: "arjun@kgpian.iitkgp.ac.in", password: defaultPassword, avatar: "https://i.pravatar.cc/150?img=12" } 
    }),
    prisma.user.upsert({ 
      where: { email: "zara@kgpian.iitkgp.ac.in" }, 
      update: {}, 
      create: { name: "Zara Kapoor", email: "zara@kgpian.iitkgp.ac.in", password: defaultPassword, avatar: "https://i.pravatar.cc/150?img=13" } 
    }),
    prisma.user.upsert({ 
      where: { email: "kabir@kgpian.iitkgp.ac.in" }, 
      update: {}, 
      create: { name: "Kabir Iyer", email: "kabir@kgpian.iitkgp.ac.in", password: defaultPassword, avatar: "https://i.pravatar.cc/150?img=14" } 
    }),
    prisma.user.upsert({ 
      where: { email: "admin@interiit.org" }, 
      update: {}, 
      create: { name: "Admin", email: "admin@interiit.org", password: defaultPassword, avatar: "https://i.pravatar.cc/150?img=15" } 
    }),
  ]);


const post = await prisma.post.create({
data: {
title: "Inter IIT 14.0 – Nested Commenting System",
body: "Designing a clean, scalable API for threaded discussions.",
image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop",
authorId: admin.id,
},
});


const c1 = await prisma.comment.create({ data: { text: "Brilliant explanation!", userId: arjun.id, postId: post.id, upvotes: 49 } });
const c2 = await prisma.comment.create({ data: { text: "I completely agree with your point here.", userId: ava.id, postId: post.id, parentId: c1.id, upvotes: 12 } });
const c3 = await prisma.comment.create({ data: { text: "Could you share references?", userId: riya.id, postId: post.id, parentId: c1.id, upvotes: 6 } });
const c4 = await prisma.comment.create({ data: { text: "Adding a counter-example might help readers.", userId: kabir.id, postId: post.id, parentId: c2.id, upvotes: 7 } });
await prisma.comment.create({ data: { text: "Agree. I can draft something.", userId: ava.id, postId: post.id, parentId: c4.id, upvotes: 2 } });
  const c5 = await prisma.comment.create({ data: { text: "Hot take: we should benchmark this against a baseline.", userId: zara.id, postId: post.id, upvotes: 31 } });
  await prisma.comment.create({ data: { text: "+1. Also measure memory.", userId: riya.id, postId: post.id, parentId: c5.id, upvotes: 3 } });

  console.log("✅ Database seeded successfully!");
  console.log({ 
    postId: post.id,
    userCount: 6,
    commentCount: 7,
    note: "All users have password: password123"
  });
}


main().catch(console.error).finally(() => prisma.$disconnect());