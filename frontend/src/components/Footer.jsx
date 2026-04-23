import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer id="footer" className="mt-10 bg-primary/10 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-start justify-between gap-10 border-b border-gray-500/30 py-10 text-gray-500 md:flex-row">
        <div>
          <img className="w-32 md:w-36" src={assets.logo} alt="logo" />
          <p className="mt-6 max-w-[410px]">
            We deliver fresh groceries and snacks straight to your door. Trusted by
            thousands, we aim to make your shopping experience simple and affordable.
          </p>
        </div>

        <div className="flex w-full flex-wrap justify-between gap-5 md:w-[45%]">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-base font-semibold text-gray-900 md:mb-5">
                {section.title}
              </h3>
              <ul className="space-y-1 text-sm">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.url} className="transition hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base">
        Copyright {new Date().getFullYear()} ©{" "}
        <a href="https://prebuiltui.com">GreatStack</a>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
