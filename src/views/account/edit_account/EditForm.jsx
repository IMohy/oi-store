import { ArrowLeftOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomInput, CustomMobileInput } from '@/components/formik';
import { ACCOUNT } from '@/constants/routes';
import { Field, useFormikContext } from 'formik';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const EditForm = ({ isLoading, authProvider }) => {
  const history = useHistory();
  const { values, submitForm } = useFormikContext();

  return (
    <div className="user-profile-details">
      <Field
        disabled={isLoading}
        name="fullname"
        type="text"
        label="* الاسم الكامل"
        placeholder="ادخل الاسم الكامل"
        component={CustomInput}
        style={{ textTransform: 'capitalize' }}
      />
      <Field
        disabled={authProvider !== 'password' || isLoading}
        name="email"
        type="email"
        label="* البريد الالكتروني"
        placeholder="test@example.com"
        component={CustomInput}
      />
      <Field
        disabled={isLoading}
        name="address"
        type="text"
        label="العنوان"
        placeholder="ادخل العنوان"
        component={CustomInput}
        style={{ textTransform: 'capitalize' }}
      />
      <CustomMobileInput
        defaultValue={values.mobile}
        name="mobile"
        disabled={isLoading}
        label="رقم الهاتف (سيتم استخدامه للتواصل)"
      />
      <br />
      <div className="edit-user-action">
        <button
          className="button button-muted w-100-mobile"
          disabled={isLoading}
          onClick={() => history.push(ACCOUNT)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          العودة الى الحساب
        </button>
        <button
          className="button w-100-mobile"
          disabled={isLoading}
          onClick={submitForm}
          type="button"
        >
          {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                    &nbsp;
          {isLoading ? 'جاري التحديث' : 'تحديث الحساب'}
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  isLoading: PropType.bool.isRequired,
  authProvider: PropType.string.isRequired
};

export default EditForm;
