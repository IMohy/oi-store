import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { ColorChooser, ImageLoader, MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { RECOMMENDED_PRODUCTS, SHOP } from "@/constants/routes";
import { displayMoney } from "@/helpers/utils";
import { useBasket, useDocumentTitle, useProduct, useRecommendedProducts, useScrollTop } from "@/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

const ViewProduct = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  useScrollTop();
  useDocumentTitle(`View ${product?.name || "Item"}`);

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    addToBasket({ ...product, selectedColor, selectedSize: selectedSize || product.sizes[0], quantity: 1 });
    console.log({ product });
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      )}
      {error && <MessageDisplay message={error} />}
      {product && !isLoading && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; العودة الى المتجر
            </h3>
          </Link>
          <div className="product-modal">
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader className="product-modal-image-collection-img" src={image.url} />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && <input type="color" disabled ref={colorOverlay} id="color-overlay" />}
              <ImageLoader alt={product.name} className="product-modal-image" src={selectedImage} />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.name}</h1>
              <span>{product.description}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                <span className="text-subtle">اختار المساحة</span>
                <br />
                <br />
                <Select
                  placeholder="--اختار المساحة--"
                  onChange={onSelectedSizeChange}
                  options={product.sizes
                    .sort((a, b) => (a < b ? -1 : 1))
                    .map((size) => ({ label: `${size} GB`, value: size }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              {product.availableColors.length >= 1 && (
                <div>
                  <span className="text-subtle">اختار اللون</span>
                  <br />
                  <br />
                  <ColorChooser
                    availableColors={product.availableColors}
                    onSelectedColorChange={onSelectedColorChange}
                  />
                </div>
              )}
              <div className="product-modal-price" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {" "}
                <p style={{ fontSize: "1.5rem" }}>ج.م </p>
                <p>{product.price}</p>
              </div>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${
                    isItemOnBasket(product.id) ? "button-border button-border-gray" : ""
                  }`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id) ? "ازالة من عربة التسوق" : "اضف المنتج الى عربة التسوق"}
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10rem" }}>
            <div className="display-header">
              <Link to={RECOMMENDED_PRODUCTS}>عرض الكل</Link>
              <h1>المنتجات المستحسنة</h1>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay message={error} action={fetchRecommendedProducts} buttonLabel="اعادة المحاولة" />
            ) : (
              <ProductShowcaseGrid products={recommendedProducts} skeletonCount={3} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
