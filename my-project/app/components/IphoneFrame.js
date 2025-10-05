export default function IphoneFrame({ children }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* iPhone outer shell */}
        <div className="relative bg-black border-[16px] border-black rounded-[50px] w-[390px] h-[844px] shadow-xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-[20px]" />
  
          {/* Inner screen (scrollable app area) */}
          <div className="w-full h-full bg-white rounded-[36px] overflow-y-auto relative">
            {/* Top bezel area (black border frame) */}
            <div className="absolute top-0 left-0 w-full h-[40px] bg-black rounded-t-[36px] z-10" />

              {/* Modal root for app-scoped popups (portal target) */}
              <div id="iphone-modal-root" className="absolute inset-0 z-30 pointer-events-none" />

              {/* Actual app content */}
              <div className="relative z-20 pt-[40px]"> 
                {children}
              </div>
          </div>
        </div>
      </div>
    );
  }
  