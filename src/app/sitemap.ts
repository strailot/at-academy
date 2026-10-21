import type { MetadataRoute } from "next";
import { courses, site, teachers } from "@/lib/site";
import { sscChemistryChapters } from "@/lib/chemistry";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/courses",
    "/chapters",
    "/practice",
    "/live-classes",
    "/chemistry",
    "/chemistry/formulas",
    "/chemistry/equations",
    "/chemistry/periodic-table",
    "/chemistry/valency",
    "/chemistry/balancing",
    "/chemistry/numericals",
    "/chemistry/mcq",
    "/exams",
    "/about",
    "/contact",
    "/faq",
    "/doubts",
    "/teachers",
    "/results",
    "/blog",
    "/login",
    "/register",
    "/privacy",
    "/terms",
    "/refund",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const courseRoutes = courses.map((course) => ({
    url: `${site.url}/courses/${course.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: course.featured ? 0.9 : 0.8,
  }));

  const chapterRoutes = sscChemistryChapters.map((chapter) => ({
    url: `${site.url}/chapters/${chapter.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const teacherRoutes = teachers.map((teacher) => ({
    url: `${site.url}/teachers/${teacher.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...chapterRoutes, ...teacherRoutes, ...blogRoutes];
}
