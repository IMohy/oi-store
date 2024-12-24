/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { ImageLoader } from "@/components/common";
import { CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea } from "@/components/formik";
import { Field, FieldArray, Form, Formik } from "formik";
import { useFileHandler } from "@/hooks";
import PropType from "prop-types";
import React from "react";
import * as Yup from "yup";

// Default brand names that I used. You can use what you want
const brandOptions = [
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "Huawei", label: "Huawei" },
  { value: "Oppo", label: "Oppo" },
];

const FormSchema = Yup.object().shape({
  name: Yup.string().required("اسم المنتج مطلوب").max(60, "اسم المنتج يجب أن يكون أقل من 60 حرف."),
  brand: Yup.string().required("اسم الماركة مطلوب."),
  price: Yup.number().positive("السعر غير صالح.").integer("السعر يجب أن يكون عدد صحيح.").required("السعر مطلوب."),
  description: Yup.string().required("الوصف مطلوب."),
  maxQuantity: Yup.number()
    .positive("عدد المنتجات غير صالح.")
    .integer("عدد المنتجات يجب أن يكون عدد صحيح.")
    .required("عدد المنتجات مطلوب."),
  keywords: Yup.array().of(Yup.string()).min(1, "يرجى إدخال على الأقل 1 كلمة لهذا المنتج."),
  sizes: Yup.array().of(Yup.number()).min(1, "يرجى إدخال حجم لهذا المنتج."),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  availableColors: Yup.array().of(Yup.string().required()).min(1, "يرجى إضافة لون افتراضي لهذا المنتج."),
});

const ProductForm = ({ product, onSubmit, isLoading }) => {
  const initFormikValues = {
    name: product?.name || "IPhone 15",
    brand: "Apple",
    price: product?.price || 10000,
    maxQuantity: 10,
    description:
      "iPhone هو هاتف ذكي من إنتاج شركة Apple يجمع بين جهاز كمبيوتر وجهاز iPod وكاميرا رقمية وهاتف خلوي في جهاز واحد مزود بواجهة تعمل باللمس. يعمل iPhone بنظام التشغيل iOS، وفي عام 2021 عندما تم طرح iPhone 13، كان يوفر مساحة تخزين تصل إلى 1 تيرابايت وكاميرا بدقة 12 ميجابكسل.",
    keywords: ["IPhone", "15", "Apple"],
    sizes: ["512", "1024", "2048"],
    isFeatured: true,
    isRecommended: true,
    availableColors: ["#d21919", "#190000"],
  };

  const { imageFile, isFileLoading, onFileChange, removeImage } = useFileHandler({
    image: {},
    imageCollection: product?.imageCollection || [],
  });

  const onSubmitForm = (form) => {
    if (imageFile.image.file || product.imageUrl) {
      onSubmit({
        ...form,
        quantity: 100,
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: imageFile?.image?.file || product.imageUrl,
        imageCollection: imageFile.imageCollection,
      });
    } else {
      alert("يرجى إضافة صورة المنتج.");
    }
  };
  return (
    <div>
      <Formik initialValues={initFormikValues} validateOnChange validationSchema={FormSchema} onSubmit={onSubmitForm}>
        {({ values, setValues }) => {
          console.log({ values });
          return (
            <Form className="product-form">
              <div className="product-form-inputs">
                <div className="d-flex">
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="name"
                      type="text"
                      required
                      label="* اسم المنتج"
                      placeholder="Gago"
                      style={{ textTransform: "capitalize" }}
                      component={CustomInput}
                    />
                  </div>
                  &nbsp;
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={{ label: values.brand, value: values.brand }}
                      name="brand"
                      iid="brand"
                      options={brandOptions}
                      disabled={isLoading}
                      placeholder="اختر/إنشاء ماركة"
                      label="* الماركة"
                    />
                  </div>
                </div>
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="description"
                    id="description"
                    rows={3}
                    label="* الوصف"
                    component={CustomTextarea}
                  />
                </div>
                <div className="d-flex">
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="price"
                      id="price"
                      type="number"
                      label="* السعر"
                      component={CustomInput}
                    />
                  </div>
                  &nbsp;
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="maxQuantity"
                      type="number"
                      id="maxQuantity"
                      label="* عدد المنتجات"
                      component={CustomInput}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                      name="keywords"
                      iid="keywords"
                      isMulti
                      disabled={isLoading}
                      placeholder="إنشاء/اختيار كلمات"
                      label="* كلمات"
                    />
                  </div>
                  &nbsp;
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                      name="sizes"
                      iid="sizes"
                      isMulti
                      disabled={isLoading}
                      placeholder="إنشاء/اختيار المساحة"
                      label="* المساحة "
                    />
                  </div>
                </div>
                <div className="product-form-field">
                  <FieldArray name="availableColors" disabled={isLoading} component={CustomColorInput} />
                </div>
                <div className="product-form-field">
                  <span className="d-block padding-s">صور المنتج</span>
                  {!isFileLoading && (
                    <label htmlFor="product-input-file-collection">
                      <input
                        disabled={isLoading}
                        hidden
                        id="product-input-file-collection"
                        multiple
                        onChange={(e) => onFileChange(e, { name: "imageCollection", type: "multiple" })}
                        readOnly={isLoading}
                        type="file"
                      />
                      اختيار صور
                    </label>
                  )}
                </div>
                <div className="product-form-collection">
                  <>
                    {imageFile.imageCollection.length >= 1 &&
                      imageFile.imageCollection.map((image) => (
                        <div className="product-form-collection-image" key={image.id}>
                          <ImageLoader alt="" src={image.url} />
                          <button
                            className="product-form-delete-image"
                            onClick={() => removeImage({ id: image.id, name: "imageCollection" })}
                            title="حذف صورة"
                            type="button"
                          >
                            <i className="fa fa-times-circle" />
                          </button>
                        </div>
                      ))}
                  </>
                </div>
                <br />
                <div className="d-flex">
                  <div className="product-form-field">
                    <input
                      checked={values.isFeatured}
                      className=""
                      id="featured"
                      onChange={(e) => setValues({ ...values, isFeatured: e.target.checked })}
                      type="checkbox"
                    />
                    <label htmlFor="featured">
                      <h5 className="d-flex-grow-1 margin-0">&nbsp; إضافة للمنتجات المميزة &nbsp;</h5>
                    </label>
                  </div>
                  <div className="product-form-field">
                    <input
                      checked={values.isRecommended}
                      className=""
                      id="recommended"
                      onChange={(e) => setValues({ ...values, isRecommended: e.target.checked })}
                      type="checkbox"
                    />
                    <label htmlFor="recommended">
                      <h5 className="d-flex-grow-1 margin-0">&nbsp; إضافة للمنتجات الموصى بها &nbsp;</h5>
                    </label>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className="product-form-field product-form-submit">
                  <button className="button" disabled={isLoading} type="submit">
                    {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                    &nbsp;
                    {isLoading ? "جاري حفظ المنتج" : "حفظ المنتج"}
                  </button>
                </div>
              </div>
              {/* ----THUBMNAIL ---- */}
              <div className="product-form-file">
                <div className="product-form-field">
                  <span className="d-block padding-s">* صورة المنتج</span>
                  {!isFileLoading && (
                    <label htmlFor="product-input-file">
                      <input
                        disabled={isLoading}
                        hidden
                        id="product-input-file"
                        onChange={(e) => onFileChange(e, { name: "image", type: "single" })}
                        readOnly={isLoading}
                        type="file"
                      />
                      اختيار صورة
                    </label>
                  )}
                </div>
                <div className="product-form-image-wrapper">
                  {(imageFile.image.url || product.image) && (
                    <ImageLoader
                      alt=""
                      className="product-form-image-preview"
                      src={imageFile.image.url || product.image}
                    />
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropType.shape({
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string),
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired,
};

export default ProductForm;
