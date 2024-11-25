'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { detectLanguage } from '@/utils/formatting';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  content: string;
}

export function CodeBlock({ content }: CodeBlockProps) {
  const codeBlocks = content.split('```');

  return (
    <>
      {codeBlocks.map((block, index) => {
        if (index % 2 === 1) {
          const [language, ...code] = block?.split('\n');
          const detectedLang = detectLanguage(language?.trim() || code[0]);

          return (
            <div key={index} className="relative group">
              <SyntaxHighlighter
                language={detectedLang}
                style={oneDark}
                className="rounded-md !mt-0"
              >
                {code.join('\n')}
              </SyntaxHighlighter>
              <Button
                onClick={() => navigator.clipboard.writeText(code?.join('\n'))}
                className="absolute top-2 right-2 p-2 rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy code"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          );
        }
        return <span key={index}>{block}</span>;
      })}
    </>
  );
}
