/* eslint-disable indent */
import { ImageLoader } from '@/components/common';
import { ACCOUNT_EDIT } from '@/constants/routes';
import { displayDate } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserProfile = (props) => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader
              alt="Banner"
              className="user-profile-banner-img"
              src={profile.banner}
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader
              alt="Avatar"
              className="user-profile-img"
              src={profile.avatar}
            />
          </div>
          <button
            className="button button-small user-profile-edit"
            onClick={() => props.history.push(ACCOUNT_EDIT)}
            type="button"
          >
            تعديل الحساب
          </button>
        </div>
        <div className="user-profile-details">
          <h2 className="user-profile-name">{profile.fullname}</h2>
          <span>البريد الالكتروني</span>
          <br />
          <h5>{profile.email}</h5>
          <span>العنوان</span>
          <br />
          {profile.address ? (
            <h5>{profile.address}</h5>
          ) : (
            <h5 className="text-subtle text-italic">العنوان غير موجود</h5>
          )}
          <span>رقم الهاتف</span>
          <br />
          {profile.mobile ? (
            <h5>{profile.mobile.value}</h5>
          ) : (
            <h5 className="text-subtle text-italic">رقم الهاتف غير موجود</h5>
          )}
          <span>تاريخ الانضمام</span>
          <br />
          {profile.dateJoined ? (
            <h5>{displayDate(profile.dateJoined)}</h5>
          ) : (
            <h5 className="text-subtle text-italic">غير متاح</h5>
          )}
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default withRouter(UserProfile);
