const queryKeyPrefixes = {
  privateFeed: "private",
  publicFeed: "public",
  privateEssay: "private-essay",
  publicEssay: "public-essay",
  comments: "comments",
  userData: "user-data",
  userStats: "user-stats",
} as const;

export default queryKeyPrefixes;
