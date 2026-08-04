export const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          text: "Sample Post",
        },
      ]);
    }, 1000);
  });
};