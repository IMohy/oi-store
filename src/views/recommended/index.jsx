import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from "@/hooks";
import bannerImg from "@/images/iphone-blue.png";
import React from "react";

const RecommendedProducts = () => {
  useDocumentTitle("Recommended Products | OI-Store");
  useScrollTop();

  const { recommendedProducts, fetchRecommendedProducts, isLoading, error } = useRecommendedProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>
              المنتجات <br />
              الموصى بها
            </h1>
          </div>
          <div className="banner-img">
            <img
              src={bannerImg}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: "50px" }}
            />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {error && !isLoading ? (
              <MessageDisplay message={error} action={fetchRecommendedProducts} buttonLabel="Try Again" />
            ) : (
              <ProductShowcaseGrid products={recommendedProducts} skeletonCount={6} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendedProducts;
