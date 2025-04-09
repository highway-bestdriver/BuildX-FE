import Link from "next/link";

interface ProjectItemProps {
  id: number;
  name: string;
  date: string;
}
const ProjectItem = ({ id, name, date }: ProjectItemProps) => {
  return (
    <Link href={`/projects/${id}`} className="flex flex-col">
      <div className="bg-gray-400 h-48"></div>
      <div className="square_16_B text-xl mt-2">{name}</div>
      <div className="square_16_M">{date}</div>
    </Link>
  );
};

export default ProjectItem;
