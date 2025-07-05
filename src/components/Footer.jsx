import React from "react";

function Footer() {
  return (
    <footer className="w-full border-t border-black px-2 md:px-10 text-sm bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <p className="text-center md:text-left">
          Wealth management services in the United States are provided by UBS
          Financial Services Inc.
        </p>
        <span className="text-center md:text-right text-[12px]">
          © UBS 1998-2025. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
