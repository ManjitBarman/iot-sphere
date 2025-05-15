
import TourProvider from "./tour/TourProvider";
import MiniTourCard from "./tour/MiniTourCard";

// Export the MiniTourCard component for use in other files
export { MiniTourCard };

// Main tour component that handles the tour state
const HomeTour = () => {
  return (
    <TourProvider />
  );
};

export default HomeTour;
