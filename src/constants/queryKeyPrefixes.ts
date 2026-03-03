const queryKeyPrefixes = {
  privateFeed: "private",
  publicFeed: "public",
  privateEssay: "private-essay",
  publicEssay: "public-essay",
  comments: "comments",
  userData: "user-data",
  userStats: "user-stats",
  analytics: {
    essayCounts: "essay-counts",
    userAnalytics: "user-analytics",
    reactionCounts: "reaction-counts",
  },
} as const;

export default queryKeyPrefixes;
