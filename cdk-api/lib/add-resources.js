const addResources = (root, fullPath) => {
  const parts = fullPath.split("/").filter(Boolean);
  let current = root;

  for (const part of parts) {
    const existing = current.node.tryFindChild(part);

    if (existing) {
      current = existing;
    } else {
      current = current.addResource(part);
    }
  }

  return current;
};

module.exports = addResources;
