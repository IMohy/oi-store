import { ArrowRightOutlined } from "@ant-design/icons";
import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from "@/constants/routes";
import { useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop } from "@/hooks";
import bannerImg from "@/images/iphone14.png";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useDocumentTitle("OI-Store | Home");
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Memory</strong>
              &nbsp;everything with&nbsp;
              <strong>Clarity</strong>
            </h1>
            <p>
              iPhone 14 منتج جديد من شركة آبل يحتوي على العديد من المزايا الجديدة والمتطورة والعظيمة والعديد من المميزات
            </p>
            <br />
            <Link to={SHOP} className="button">
              <ArrowRightOutlined style={{ transform: "rotate(180deg)" }} />
              &nbsp; تسوق الآن
            </Link>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <div className="display">
          <div className="display-header">
            <Link to={FEATURED_PRODUCTS}>عرض الكل</Link>
            <h1>المنتجات المميزة</h1>
          </div>
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay message={errorFeatured} action={fetchFeaturedProducts} buttonLabel="Try Again" />
          ) : (
            <ProductShowcaseGrid products={featuredProducts} skeletonCount={6} />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <Link to={RECOMMENDED_PRODUCTS}>عرض الكل</Link>
            <h1>المنتجات الموصى بها</h1>
          </div>
          {errorRecommended && !isLoadingRecommended ? (
            <MessageDisplay message={errorRecommended} action={fetchRecommendedProducts} buttonLabel="Try Again" />
          ) : (
            <ProductShowcaseGrid products={recommendedProducts} skeletonCount={6} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
