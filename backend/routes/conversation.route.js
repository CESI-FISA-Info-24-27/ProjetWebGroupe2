import express from 'express';
import { protectAdmin, protectOwn } from '../middlewares/auth.middleware.js';
import { 
  addMessageToConversation,
  createConversation, 
  deleteMessageFromConversation, 
  getConversationAsAdmin, 
  getConversationById, 
  getConversationsByUser, 
  updateConversation, 
  updateConversationAsAdmin 
} from '../controllers/conversation.controller.js';

const router = express.Router();

router.get("/myConversation/:id", protectOwn, getConversationById);
router.get("/allMyConversations", protectOwn,  getConversationsByUser);
router.get("/admin/:id", protectAdmin, getConversationAsAdmin);
router.post("/", protectOwn, createConversation);
router.put("/update/:id", protectOwn, updateConversation);
router.put("/addMessage/:id", protectOwn, addMessageToConversation);
router.put("/admin/:id", protectOwn, updateConversationAsAdmin);
router.put("/deleteMessage/:messageId/fromConversation/:id", protectOwn, deleteMessageFromConversation);


export default router;