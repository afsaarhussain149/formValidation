import { IoMdArrowBack } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className="w-full px-[25px] py-[22px] shadow fixed top-0 left-0 bg-white z-50">
        <i className="text-[25px]">
          <IoMdArrowBack className="cursor-pointer" />
        </i>
      </div>
    </>
  );
};

export default Header;
