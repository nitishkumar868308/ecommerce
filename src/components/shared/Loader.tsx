export default function Loader() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-lg z-50">
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  