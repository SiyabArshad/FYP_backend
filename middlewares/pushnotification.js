const { Expo } = require("expo-server-sdk");

// Create a new Expo instance
const expo = new Expo();

// Function to send a push notification
async function sendPushNotificationToDevice(expoPushToken, title, body) {
  try {
    // Check if the Expo push token is valid
    if (!Expo.isExpoPushToken(expoPushToken)) {
      console.error("Invalid Expo push token:", expoPushToken);
      return;
    }

    // Prepare the notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      //   data: { anyDataYouWantToSend }, // You can send additional data along with the notification
    };

    // Send the push notification
    const result = await expo.sendPushNotificationsAsync([message]);

    // Process the result to check for any errors
    if (result[0].status === "ok") {
      console.log("Push notification sent successfully!");
    } else {
      console.error(
        "Failed to send push notification:",
        result[0].details.error
      );
    }
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

module.exports = sendPushNotificationToDevice;
