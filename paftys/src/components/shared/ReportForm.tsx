// components/ReportForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ReportFormProps {
  postId: string;
  onCancel: () => void;
  onSubmit?: (reason: string, postId: string) => void;
}

export default function ReportForm({ postId, onCancel, onSubmit }: ReportFormProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;

    if (onSubmit) {
      onSubmit(reason, postId);
    } else {
      console.log(`Report submitted for post ${postId}:`, reason);
    }

    setReason("");
    onCancel(); // Ferme le modal
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-4">
      <h2 className="text-lg font-semibold">Signaler ce post</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Pourquoi voulez-vous signaler ce contenu ?
      </p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Expliquez brièvement la raison du signalement..."
        rows={4}
        className="w-full border border-gray-300 dark:border-gray-700 rounded p-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} className="bg-red-600 text-white hover:bg-red-700">
          Signaler
        </Button>
      </div>
    </div>
  );
}
