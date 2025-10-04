export default function IphoneFrame({ children }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* iPhone outer shell */}
        <div className="relative bg-black border-[16px] border-black rounded-[50px] w-[390px] h-[844px] shadow-xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-[20px]" />
  
          {/* Inner screen (scrollable app area) */}
          <div className="w-full h-full bg-white rounded-[36px] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }
  