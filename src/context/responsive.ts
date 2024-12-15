// Configuration pour le responsive
const responsiveConfig = {
    container: "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32", 
    root: "w-full min-h-screen bg-gray-900 text-white",
    text: {
      title: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold",
      subtitle: "text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
      paragraph: "text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl",
    },
    button:
      "bg-blue-500 text-white py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-12 2xl:py-6 2xl:px-16 rounded hover:bg-blue-600 transition",
    flexCenter: "flex flex-col items-center justify-center",
    section:
      "min-h-[70vh] lg:min-h-[65vh] xl:min-h-[60vh] 2xl:min-h-[55vh] bg-gray-900 text-white",
    maxWidth: "max-w-screen-xl lg:max-w-screen-2xl",
  };
  
  export default responsiveConfig;
  