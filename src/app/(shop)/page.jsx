import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSlider from "@/components/home/HeroSlider";
import Newsletter from "@/components/home/NewsLetter";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <CategorySection />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
};

export default HomePage;
