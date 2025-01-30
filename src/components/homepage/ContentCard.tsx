import Image, { StaticImageData } from "next/image";

const imageStyle = {
  width: '100%',
  height: '400px',
}

type ComponentProps = {
  description: string,
  title: string,
  alt: string,
  imageSrc: StaticImageData,
}

const ContentCard: React.FC<ComponentProps> = ({ description, imageSrc, title, alt }) => {
  return (
    <section className="bg-gradient-to-r from-indigo-950 to-purple-950 m-6 rounded-lg shadow-2xl ring-4 ring-indigo-900 shadow-indigo-950 inset-shadow-2xl inset-shadow-indigo-950">
      <div>
        <Image src={imageSrc} alt={alt} width={100} height={0} style={imageStyle} className="rounded" />
      </div>
      <div className="p-6 pt-0 h-[14rem] md:h-[12rem]">
        <h2 className="text-lg pb-6 font-quintessential">{title}</h2>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ContentCard;
