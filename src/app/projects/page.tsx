import Link from "next/link";
import ProjectItem from "./_components/ProjectItem";
import { projectsData } from "./mock";

const ProjectsPage = () => {
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="triangle_48_SB pt-10 pb-10">DashBoard</div>

      <article className="flex-1 flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-x-3 gap-y-6">
          <Link
            href="/new/step/1"
            className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-48 cursor-pointer hover:bg-gray-100"
          >
            <span className="square_16_SB text-xl text-gray-600">
              Create New
            </span>
          </Link>
          {projectsData.map((data) => (
            <ProjectItem key={data.id} {...data} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default ProjectsPage;
