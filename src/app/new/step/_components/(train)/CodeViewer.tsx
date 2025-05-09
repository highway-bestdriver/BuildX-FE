"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
}

const CodeViewer = ({ code }: Props) => {
  return (
    <div className="flex flex-col mt-10 w-full bg-[#1e1e1e] text-white p-4 rounded-md shadow-md">
      <h3 className="text-lg suit_16_SB mb-3 text-main_orange">
        ㅣ 생성된 코드
      </h3>
      <pre className="text-sm whitespace-pre-wrap font-mono text-[#dcdcdc] leading-relaxed">
        <SyntaxHighlighter language="python" style={vscDarkPlus}>
          {code}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
};

export default CodeViewer;
