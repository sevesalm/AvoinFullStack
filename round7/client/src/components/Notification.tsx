import React from 'react';
import { connect } from 'react-redux';
import { INotification } from '../reducers/notificationReducer';

const infoStyle = {
  background: '#efe',
  border: 'solid 1px #afa'
};

const Notification = ({ notification }: { notification: INotification }) =>
  notification && (
    <div className="notification" style={infoStyle}>
      {notification.message}
    </div>
  );

function mapStateToProps(state: any) {
  return { notification: state.notification };
}

export default connect(mapStateToProps)(Notification);
