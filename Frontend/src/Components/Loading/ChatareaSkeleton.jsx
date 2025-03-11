import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ChatareaSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div className="max-w-xs p-2 rounded-lg">
            <Skeleton width={200} height={40} borderRadius={12} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatareaSkeleton;
