import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectItemProps {
  id: number;
  name: string;
  last_modified: string;
  thumbnail: StaticImageData;
}
const ProjectItem = ({
  id,
  name,
  last_modified,
  thumbnail,
}: ProjectItemProps) => {
  return (
    <Link href={`/projects/${id}`} className="flex flex-col">
      <div className="relative w-full h-48 bg-gray-400 rounded-md ">
        <Image
          src={thumbnail}
          alt={`${name} thumbnail`}
          fill
          sizes=""
          className="object-contain object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="square_16_B text-xl mt-2">{name}</div>
      <div className="square_16_M">{last_modified}</div>
    </Link>
  );
};

export default ProjectItem;
