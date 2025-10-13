import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import type { ProfileCompletion } from "../types";

interface ProfileCompletionProps {
  completion: ProfileCompletion;
}

const ProfileCompletionComponent: React.FC<ProfileCompletionProps> = ({
  completion,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-primary-950">Profile Completion</h3>
        <span className="text-2xl font-bold text-accent">
          {completion.percentage}%
        </span>
      </div>

      <div className="w-full bg-primary-100 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-accent to-accent h-3 rounded-full transition-all duration-500"
          style={{ width: `${completion.percentage}%` }}
        />
      </div>

      {completion.missingFields.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary-950 mb-2">
            Complete your profile:
          </p>
          {completion.missingFields.map((field, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Circle className="w-4 h-4 text-primary-400" />
              <span className="text-primary-700">{field}</span>
            </div>
          ))}
        </div>
      )}

      {completion.percentage === 100 && (
        <div className="flex items-center gap-2 text-sm text-accent bg-accent-50 p-3 rounded-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">Profile Complete! You're all set.</span>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionComponent;
