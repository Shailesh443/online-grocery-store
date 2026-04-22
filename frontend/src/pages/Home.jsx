import MainBanner from "../componants/MainBanner";
import Categories from "../componants/Categories";
import BestSeller from "../componants/BestSeller";
import BottomBanner from "../componants/BottomBanner";
import NewsLetter from "../componants/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
