const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
const User = require("../models/user");

// Route to add a notification
router.post("/notifications/add", async (req, res) => {
  const { userId, msg } = req.body;
  try {
    notification = new Notification({
      user_id: userId,
      msg: msg,
      seen: false,
    });

    await notification.save();
    res.status(200).json({ message: "Notification added successfully" });
  } catch (error) {
    res.send(error);
  }
});

// Route to update notification status
router.post("/notifications/update", async (req, res) => {
  const { userId, notificationId } = req.body;
  try {
    const notification = await Notification.findOne({
      user_id: userId,
      _id: notificationId,
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    const notif = notification;
    if (notif) {
      notif.seen = true;
      await notification.save();
      res.status(200).json({ message: "Notification status updated" });
    } else {
      res.status(404).json({ error: "Notification ID not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification status" });
  }
});

// Route to get all notifications for a user
router.get("/notifications/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ user_id: userId }).sort({
      timestamp: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// routes/notifications.js
router.delete("/notifications/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  try {
    const result = await Notification.deleteOne({ _id: notificationId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

module.exports = router;
