import React from "react";

const Footer = () => {
  return (
    <>
      <div className="mt-5 w-full p-[50px] bg-[#004896]">
        <div class="grid grid-cols-6 gap-2">
          <div class="p-4">
            <img
              src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1"
              class="_2PIUn"
              alt="Car Trade"
            />
          </div>
          <div class="p-4">
            <img
              src="https://statics.olx.in/external/base/img/cartrade/logo/olx_2025.svg?v=1"
              class="_2PIUn"
              alt="olx"
              width={110}
              className="ms-9 mt-5"
            />
          </div>
          <div class="p-4">
            <img
              src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1"
              class="_2PIUn"
              alt="carwale"
            />
          </div>
          <div class=" p-4">
            <img
              src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1"
              class="_2PIUn"
              alt="bikewale"
            />
          </div>
          <div class="p-4">
            <img
              src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1"
              class="_2PIUn"
              alt="cartrade"
            />
          </div>
          <div class="p-4">
            <img
              src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1"
              class="_2PIUn"
              alt="mobility_outlook"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
