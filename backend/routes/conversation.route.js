import express from 'express';
import { protectAdmin, protectOwn } from '../middlewares/auth.middleware.js';
import { 
  createConversation, 
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
router.put("/admin/:id", protectOwn, updateConversationAsAdmin);


export default router;