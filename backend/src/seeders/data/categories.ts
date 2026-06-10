const categories = {
  // ROOT
  root: [
    { name: "electronics", parentId: null },
    { name: "fashion", parentId: null },
  ],

  // Level 1 Categories
  level1: [
    { name: "mobile phones", parentId: "electronics" },
    { name: "laptops", parentId: "electronics" },
    { name: "men", parentId: "fashion" },
    { name: "women", parentId: "fashion" },
  ],

  // Level 2 Categories
  level2: [
    { name: "android phones", parentId: "mobile phones" },
    { name: "iphones", parentId: "mobile phones" },
    { name: "gaming phones", parentId: "mobile phones" },
    { name: "budget phones", parentId: "mobile phones" },
    { name: "gaming laptops", parentId: "laptops" },
    { name: "ultrabooks", parentId: "laptops" },
    { name: "business laptops", parentId: "laptops" },
    { name: "macbooks", parentId: "laptops" },
    { name: "shirts", parentId: "men" },
    { name: "t-shirts", parentId: "men" },
    { name: "jeans", parentId: "men" },
    { name: "shoes", parentId: "men" },
    { name: "watches", parentId: "men" },
    { name: "dresses", parentId: "women" },
    { name: "tops", parentId: "women" },
    { name: "heels", parentId: "women" },
    { name: "bags", parentId: "women" },
    { name: "jewelry", parentId: "women" },
  ],
};

export default categories;
