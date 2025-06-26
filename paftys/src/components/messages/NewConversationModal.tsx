import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createConversation,
  fetchConversations,
} from "@/reducers/conversationSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  currentUserId: string;
};

export default function NewConversationModal({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const baseUrl = import.meta.env.VITE_DB_URI;

  const users = (() => {
    const list = [
      ...(currentUser?.subscribers || []),
      ...(currentUser?.subscriptions || []),
    ];
    // Remove duplicates
    const seen = new Map();
    for (const user of list) {
      if (!seen.has(user._id)) {
        seen.set(user._id, user);
      }
    }
    return Array.from(seen.values());
  })();

  const handleCreateConversation = async (targetId: string) => {
    if (!targetId || !currentUser?.id) return;
    await dispatch(
      createConversation({ participants: [currentUser.id, targetId] })
    );
    dispatch(fetchConversations());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle conversation</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {users.length === 0 ? (
            <div className="text-left text-xl text-gray-500">
              Vous n&apos;avez pas d&apos;amis à qui parler pour l&apos;instant.
              Abonnez vous à d&apos;autres utilisateurs pour commencer une
              conversation !
            </div>
          ) : (
            users.map((user) => (
              <Button
                key={user._id}
                variant="ghost"
                className="flex items-center gap-3 justify-start cursor-pointer"
                onClick={() => handleCreateConversation(user._id)}
              >
                <Avatar>
                  <img
                    src={
                      user.profilePicture
                        ? `${baseUrl}/uploads/profiles/${user.profilePicture}`
                        : "https://via.placeholder.com/40"
                    }
                    alt=""
                  />
                </Avatar>
                <span>{user.userName}</span>
              </Button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
