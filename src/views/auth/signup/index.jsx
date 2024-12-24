import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { SocialLogin } from "@/components/common";
import { CustomInput } from "@/components/formik";
import { SIGNIN } from "@/constants/routes";
import { Field, Form, Formik } from "formik";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import PropType from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/redux/actions/authActions";
import { setAuthenticating, setAuthStatus } from "@/redux/actions/miscActions";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("البريد الالكتروني غير صالح.").required("البريد الالكتروني مطلوب."),
  password: Yup.string()
    .required("كلمة المرور مطلوبة.")
    .min(8, "كلمة المرور يجب ان تكون اكثر من 8 احرف.")
    .matches(/[A-Z\W]/g, "كلمة المرور يجب ان تحتوي على حرف كبير واحد على الاقل."),
  fullname: Yup.string().required("الاسم مطلوب.").min(4, "الاسم يجب ان يكون اكثر من 4 احرف."),
});

const SignUp = ({ history }) => {
  const { isAuthenticating, authStatus } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus,
  }));
  const dispatch = useDispatch();

  useScrollTop();
  useDocumentTitle("Sign Up | OI-Store");

  useEffect(
    () => () => {
      dispatch(setAuthStatus(null));
      dispatch(setAuthenticating(false));
    },
    []
  );

  const onClickSignIn = () => history.push(SIGNIN);

  const onFormSubmit = (form) => {
    dispatch(
      signUp({
        fullname: form.fullname.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      })
    );
  };

  return (
    <div className="auth-content" dir="rtl">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus?.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && <h5 className="text-center toast-error">{authStatus?.message}</h5>}
          <div className={`auth ${authStatus?.message && !authStatus?.success && "input-error"}`}>
            <div className="auth-main" dir="rtl">
              <h3>انشاء حساب في OI-Store</h3>
              <Formik
                initialValues={{
                  fullname: "",
                  email: "",
                  password: "",
                }}
                validateOnChange
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}
              >
                {() => (
                  <Form>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="fullname"
                        type="text"
                        label="* الاسم"
                        style={{ textTransform: "capitalize" }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="email"
                        type="email"
                        label="* البريد الالكتروني"
                        placeholder="test@example.com"
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="password"
                        type="password"
                        label="* كلمة المرور"
                        placeholder="كلمة المرور"
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className="auth-field auth-action auth-action-signup">
                      <button className="button auth-button" disabled={isAuthenticating} type="submit">
                        {isAuthenticating ? "جاري التسجيل" : "انشاء حساب"}
                        &nbsp;
                        {isAuthenticating ? (
                          <LoadingOutlined />
                        ) : (
                          <ArrowRightOutlined style={{ transform: "rotate(180deg)" }} />
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="auth-divider">
              <h6>أو</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>لديك حساب؟</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray"
              disabled={isAuthenticating}
              onClick={onClickSignIn}
              type="button"
            >
              تسجيل الدخول
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignUp.propTypes = {
  history: PropType.shape({
    push: PropType.func,
  }).isRequired,
};

export default SignUp;
