import Image, { StaticImageData } from "next/image";

interface Props {
  text: string;
  outerLeft?: StaticImageData;
  outerRight?: StaticImageData;
  innerLeft?: StaticImageData;
  innerRight?: StaticImageData;
}

const HeaderBanner: React.FC<Props> = ({ text, outerLeft, outerRight, innerLeft, innerRight }) => {
  return (
    <h1 className="border-b-2 border-indigo-800
                  items-center mb-6 md:mb-12 p-4
                  text-center font-quintessential text-xl sm:text-2xl text-purple-200
                  flex flex-row gap-2 sm:gap-4 pb-5 justify-evenly">
      {outerLeft && (
        <Image
          src={outerLeft}
          alt=""
          width={100}
          height={100}
          className="size-14 md:size-16 lg:size-20"
          priority
        />
      )}

      {innerLeft && (
        <Image
          src={innerLeft}
          alt=""
          width={100}
          height={100}
          className="hidden md:block md:size-16 lg:size-20"
          priority
        />
      )}
      
      {text}

      {innerRight && (
        <Image
          src={innerRight}
          alt=""
          width={100}
          height={100}
          className="hidden md:block md:size-16 lg:size-20"
          priority
        />
      )}

      {outerRight && (
        <Image
          src={outerRight}
          alt=""
          width={100}
          height={100}
          className="size-14 md:size-16 lg:size-20"
          priority
        />
      )}
    </h1>
  );
};

export default HeaderBanner;
