import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    // establishes the conversation if not started yet

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.message.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    // implementing socket io for real time message

    return res.status(201).json({
      newMessage,
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation)
      return res.status(200).json({
        message: [],
        status: "success",
      });


    return res.status(200).json({
      message: conversation?.message,
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
