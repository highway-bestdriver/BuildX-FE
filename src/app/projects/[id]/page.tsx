import { notFound } from "next/navigation";
import Link from "next/link";
import { projectDetailData } from "../mock";
import { IcCalendar, IcLines, IcStar } from "@assets/icons";
import Button from "@common/Button";

interface Props {
  params: {
    id: string;
  };
}
const ProjectsDetail = ({ params }: Props) => {
  const project = projectDetailData.find(
    (item) => item.id.toString() === params.id
  );
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <Link
        href="/projects"
        className="triangle_48_SB pt-10 text-[24px] text-gray-500 cursor-pointer"
      >
        &lt; DashBoard
      </Link>
      <div className="triangle_48_SB pb-10">{project.name}</div>

      <article className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-4">
          <thead>
            <tr className="text-left text-main_blue suit_16_SB">
              <th className="pl-3">No.</th>
              <th className="pl-3">
                <div className="flex items-center gap-1">
                  <IcLines width={20} />
                  <span>고급 설정</span>
                </div>
              </th>
              <th className="pl-3">
                <div className="flex items-center gap-1">
                  <IcStar width={20} />
                  <span>성능 결과</span>
                </div>
              </th>
              <th></th>
              <th className="pl-3">
                <div className="flex items-center gap-1">
                  <IcCalendar width={20} />
                  <span>생성 일시</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {project.details.map((detail, index) => (
              <tr key={detail.id} className="bg-white shadow-sm align-top">
                {/* 번호 */}
                <td className="px-4 py-2 suit_16_M">{index + 1}</td>

                {/* 고급 설정 */}
                <td className="px-4 py-2 suit_16_M text-[14px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 rounded">
                        에포크
                      </span>
                      {detail.epoch}
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-600 rounded">
                        배치크기
                      </span>
                      {detail.batch_size}
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded">
                        학습률
                      </span>
                      {detail.learning_rate}
                    </div>
                  </div>
                </td>

                {/* 성능 결과 */}
                <td className="px-4 py-2 suit_16_M text-[14px]">
                  <div className="flex flex-col gap-2">
                    <div>Loss: {detail.loss}</div>
                    <div>Accuracy: {detail.accuracy}</div>
                    <button className="mt-2 px-3 py-1 text-white bg-blue-600 text-xs rounded hover:bg-blue-700">
                      상세 보기
                    </button>
                  </div>
                </td>

                {/* 상세보기 */}
                <td className="align-middle">
                  <div className="inline-flex cursor-pointer bg-main_blue rounded-xl suit_16_M text-[14px] text-white px-4 py-2">
                    상세보기
                  </div>
                </td>

                {/* 생성일 */}
                <td className="px-4 py-2 suit_16_M text-[14px]">
                  {detail.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <div className="flex justify-end mt-10 mb-20">
        <Button text="수정하러 가기 >" />
      </div>
    </div>
  );
};

export default ProjectsDetail;
