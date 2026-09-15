// নতুন per-service ডেটা থেকে পুরনো ফ্রন্টএন্ডের প্রত্যাশিত ফ্ল্যাট শেপ বানায়
// ⚠️ key-এর নামগুলো (বাম পাশ) আপনার আসল পুরনো dashboardRoutes.js-এর রেসপন্সের
// সাথে মিলিয়ে বদলে নিন যদি এখানে অনুমান করা নাম না মেলে।
function mapToLegacyShape({ users, academic, research, content }) {
  const timestamps = [users?.lastUpdated, academic?.lastUpdated, research?.lastUpdated, content?.lastUpdated]
    .filter(Boolean)
    .map((t) => new Date(t));

  const overallLastUpdated = timestamps.length
    ? new Date(Math.max(...timestamps)).toISOString()
    : null;

  return {
    totalUsers: users?.totalUsers ?? null,
    totalAdmins: users?.totalAdmins ?? null,
    totalDepartments: academic?.totalDepartments ?? null,
    totalTeams: academic?.totalTeams ?? null,
    totalStudents: academic?.uniqueStudents ?? null,
    totalProjects: academic?.totalProjects ?? null,
    totalThesis: academic?.totalThesis ?? null,
    totalJournals: research?.journals ?? null,
    totalConferences: research?.conferences ?? null,
    totalBooks: research?.books ?? null,
    totalPublications: research?.totalPublications ?? null,
    aboutProf: content?.aboutProf ?? null,
    lastUpdated: overallLastUpdated,

    _meta: {
      partial: [users, academic, research, content].some((s) => s?.error),
      raw: { users, academic, research, content },
    },
  };
}

module.exports = mapToLegacyShape;