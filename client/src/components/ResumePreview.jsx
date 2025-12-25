import React from 'react'
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
import ClassicTemplate from './templates/ClassicTemplate';

const ResumePreview = ({ data, template, accentColor }) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern": return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal": return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image": return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default: return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="relative">
      {/* Screen Preview Wrapper */}
      <div
        id="resume-preview"
        className="w-[210mm] min-h-[297mm] bg-white origin-top shadow-sm print:shadow-none"
        style={{
          // Simulating A4 Dimensions visually
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        {renderTemplate()}
      </div>

      {/* Print Specific Styles */}
      <style>
        {`
                  @page {
                    size: auto;
                    margin: 0mm;
                  }
                  @media print {
                    html, body {
                      width: 210mm;
                      height: 297mm;
                      margin: 0;
                      padding: 0;
                      overflow: hidden;
                    }
                    /* Hide everything else */
                    body * {
                      visibility: hidden;
                    }
                    /* Show Resume */
                    #resume-preview, #resume-preview * {
                      visibility: visible;
                    }
                    #resume-preview {
                      position: fixed;
                      left: 0;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      margin: 0;
                      padding: 0;
                      box-shadow: none !important;
                      border: none !important;
                      background: white !important;
                      print-color-adjust: exact;
                      -webkit-print-color-adjust: exact;
                    }
                  }
                `}
      </style>
    </div>
  );
};

export default ResumePreview;