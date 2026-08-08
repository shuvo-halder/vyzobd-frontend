import { getCategories, getProducts } from "@/lib/api";
import CategoryCarousel, { getCategoryImage } from "./CategoryCarousel";

export default async function CategorySection() {
  let categories = [];

  try {
    // Fetch categories and products concurrently to count items dynamically
    const [categoriesRes, productsRes] = await Promise.allSettled([
      getCategories(),
      getProducts(),
    ]);

    const categoryListRaw =
      categoriesRes.status === "fulfilled" ? categoriesRes.value : [];
    const productListRaw =
      productsRes.status === "fulfilled" ? productsRes.value : [];

    const categoryList = categoryListRaw?.data || categoryListRaw || [];
    const productList = productListRaw?.data || productListRaw || [];

    if (categoryList.length > 0) {
      // Map existing category service records
      categories = categoryList.map((cat) => {
        const name =
          typeof cat === "string" ? cat : cat.name || cat.title || cat.category;
        const slug =
          typeof cat === "string" ?
            cat.toLowerCase().replace(/\s+/g, "-")
          : cat.slug || cat._id || name.toLowerCase().replace(/\s+/g, "-");

        // Dynamically count products matching this category
        const productCount = productList.filter((p) => {
          const pCat =
            typeof p.category === "string" ? p.category : p.category?.name;
          return String(pCat || "").toLowerCase() === name.toLowerCase();
        }).length;

        const image =
          typeof cat === "object" && cat.image ? cat.image : getCategoryImage(name);

        return {
          id: typeof cat === "object" ? cat._id || slug : slug,
          name,
          slug,
          image,
          productCount: productList.length > 0 ? productCount : null,
          href: `/products?category=${encodeURIComponent(name)}`,
        };
      });
    } else if (productList.length > 0) {
      // Fallback: extract real categories from existing products database
      const uniqueCategoryNames = [
        ...new Set(
          productList
            .map((p) =>
              typeof p.category === "string" ? p.category : p.category?.name,
            )
            .filter(Boolean),
        ),
      ];

      categories = uniqueCategoryNames.map((name) => {
        const slug = name.toLowerCase().replace(/\s+/g, "-");
        const productCount = productList.filter((p) => {
          const pCat =
            typeof p.category === "string" ? p.category : p.category?.name;
          return String(pCat || "").toLowerCase() === name.toLowerCase();
        }).length;

        return {
          id: slug,
          name,
          slug,
          image: getCategoryImage(name),
          productCount,
          href: `/products?category=${encodeURIComponent(name)}`,
        };
      });
    }
  } catch (error) {
    console.error("Failed to load category section data:", error);
  }

  // Gracefully return null on empty states so the page layout remains unbroken
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryCarousel categories={categories} />
      </div>
    </section>
  );
}
