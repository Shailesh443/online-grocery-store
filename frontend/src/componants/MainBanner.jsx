import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const MainBanner = () => {
  return (
    <div className="relative">
      <img src={assets.main_banner_bg} alt="banner" className="hidden w-full md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden" />

      <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-24 md:items-start md:justify-center md:pb-0 md:pl-16 lg:pl-24">
        <h1 className="max-w-72 text-center text-3xl font-bold leading-tight md:max-w-80 md:text-left md:text-4xl lg:max-w-[32rem] lg:text-5xl lg:leading-[3.75rem]">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <div className="mt-6 flex items-center gap-4 font-medium">
          <Link
            to="/products"
            className="group flex cursor-pointer items-center gap-2 rounded bg-primary px-7 py-3 text-white transition hover:bg-primary-dull md:px-9"
          >
            Shop Now
            <img
              className="transition group-hover:translate-x-1 md:hidden"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link to="/products" className="group hidden cursor-pointer items-center gap-2 px-9 py-3 md:flex">
            Explore Deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
