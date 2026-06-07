const categories = [
  { id: "electronics", name: "Electronics", parentId: null },
  { id: "mobile-phones", name: "Mobile Phones", parentId: "electronics" },
  { id: "laptops", name: "Laptops", parentId: "electronics" },
  { id: "fashion", name: "Fashion", parentId: null },
  { id: "mens", name: "Mens", parentId: "fashion" },
  { id: "womens", name: "Womens", parentId: "fashion" },
  { id: "home-and-living", name: "Home & Living", parentId: null },
  { id: "kitchen", name: "Kitchen", parentId: "home-and-living" },
  { id: "lighting", name: "Lighting", parentId: "home-and-living" },
  { id: "wellness", name: "Wellness", parentId: null },
  { id: "aromatherapy", name: "Aromatherapy", parentId: "wellness" },
  { id: "hydration", name: "Hydration", parentId: "wellness" },
];

export default categories;
