'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { detectLanguage } from '@/utils/formatting';
import { Copy, Download, Edit, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  content: string;
  onEdit?: (content: string) => void;
}

export function CodeBlock({ content, onEdit }: CodeBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${detectLanguage(content)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    onEdit?.(editedContent);
    setIsEditing(false);
  };

  const codeBlocks = content.split('```');

  return (
    <>
      {codeBlocks.map((block, index) => {
        if (index % 2 === 1) {
          const [language, ...code] = block.split('\n');
          const detectedLang = detectLanguage(language.trim() || code[0]);

          return (
            <div key={index} className="relative group">
              {isEditing ? (
                <div className="relative">
                  <textarea
                    value={editedContent}
                    onChange={e => setEditedContent(e.target.value)}
                    className="w-full h-auto min-h-[200px] p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSave}
                    className="absolute top-2 right-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <SyntaxHighlighter
                    language={detectedLang}
                    style={oneDark}
                    className="rounded-md !mt-0"
                  >
                    {code.join('\n')}
                  </SyntaxHighlighter>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      onClick={handleCopy}
                      className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Copy code"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Download code"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    {onEdit && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Edit code"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        }
        return <span key={index}>{block}</span>;
      })}
    </>
  );
}
