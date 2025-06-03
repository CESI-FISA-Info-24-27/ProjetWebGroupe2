import Conversation from '../models/conversation.model.js';

export async function getConversationById(req, res) {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    if (!conversation.participants.includes(req.user._id.toString())) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation", error });
  }
}

export async function getConversationsByUser(req, res) {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    });
    
    if (!conversations) {
      return res.status(404).json({ message: "No conversations found" });
    }
    
    res.status(200).json({success: true, data: conversations});
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", error });
  }
}

export async function getConversationAsAdmin(req, res) {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation", error });
  }
}

export async function createConversation(req, res) {
  if (!req.body.participants) {
    return res.status(400).json({ success: false, message: "Participants are required" });
  }
  if (!req.body.participants.includes(req.user._id.toString())) {
    return res.status(400).json({ success: false, message: "You are not in the conversation." });
  }
  try {
    const newConversation = await Conversation.create({
      participants: req.body.participants,
      messages: [],
    });
    res.status(201).json({success: true, data: newConversation});
  } catch (error) {
    res.status(500).json({success: false, message: "Error creating conversation", error });
  }
}

export async function updateConversation(req, res) {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConversation) {
      return res.status(404).json({ success: true, message: "Conversation not found" });
    }
    res.status(200).json({ success: true, data: updatedConversation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating conversation", error });
  }
}

export async function updateConversationAsAdmin(req, res) {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    res.status(200).json({ success: true, data: updatedConversation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating conversation as admin", error });
  }
}
