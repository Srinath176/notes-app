import { Loader2 } from "lucide-react";

/**
 * Global loading spinner used in Suspense fallbacks
 */
const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-gray-600 font-medium">Please wait, loading...</p>
      </div>
    </div>
  );
};

export default Loader;
