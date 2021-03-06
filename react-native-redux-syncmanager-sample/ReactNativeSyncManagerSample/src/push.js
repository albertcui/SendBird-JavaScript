
import firebase from 'react-native-firebase';

export default async (message) => {
  try {
    const text = message.data.message;
    const payload = JSON.parse(message.data.sendbird);

    const localNotification = new firebase.notifications.Notification({ show_in_foreground: true })
      .android.setChannelId('com.reactnativesyncmanagersample.default_channel_id')
      .android.setSmallIcon('ic_notification')
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .setNotificationId(message.messageId)
      .setTitle('New message')
      .setSubtitle(`Unread message: ${payload.unread_message_count}`)
      .setBody(text)
      .setSound('default')
      .setData(payload);
    return firebase.notifications().displayNotification(localNotification);
  } catch(e) {
    return Promise.reject(e);
  }
}