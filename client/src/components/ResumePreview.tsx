import React from "react";
import type { ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { QuantumMatrixTemplate } from "./templates/QuantumMatrixTemplate";
import { CosmicNebulaTemplate } from "./templates/CosmicNebulaTemplate";
import { NeuralCircuitTemplate } from "./templates/NeuralCircuitTemplate";
import { DataStreamTemplate } from "./templates/DataStreamTemplate";
import { OrbitalTemplate } from "./templates/OrbitalTemplate";

interface ResumePreviewProps {
  data: ResumeContent;
  className?: string;
  template?: string;
}

// Helper function to determine if a section needs a page break
const shouldPageBreak = (
  sectionType: string,
  contentHeight: number,
  remainingPageHeight: number
) => {
  // If section is too tall for remaining space, force page break
  return contentHeight > remainingPageHeight * 0.8; // Leave 20% margin
};

export const ResumePreview = React.forwardRef<
  HTMLDivElement,
  ResumePreviewProps
>(({ data, className, template = "quantum" }, ref) => {
  let SelectedTemplate;

  switch (template) {
    case "modern":
      SelectedTemplate = ModernTemplate;
      break;
    case "creative":
      SelectedTemplate = CreativeTemplate;
      break;
    case "minimal":
      SelectedTemplate = MinimalTemplate;
      break;
    case "nebula":
      SelectedTemplate = CosmicNebulaTemplate;
      break;
    case "circuit":
      SelectedTemplate = NeuralCircuitTemplate;
      break;
    case "data":
      SelectedTemplate = DataStreamTemplate;
      break;
    case "orbit":
      SelectedTemplate = OrbitalTemplate;
      break;
    case "quantum":
    default:
      SelectedTemplate = QuantumMatrixTemplate;
      break;
  }

  // Add print-specific styles
  const printStyles = `
      @media print {
        /* Ensure sections don't break inside */
        .section-container {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        /* Force page break before sections that won't fit */
        .force-page-break {
          break-before: page;
          page-break-before: always;
        }
        
        /* Handle long sections that need to be split */
        .allow-split {
          break-inside: auto;
          page-break-inside: auto;
        }
        
        /* Ensure proper margins */
        @page {
          margin: 0.2in;
          size: A4;
        }
        
        /* Main container */
        .a4-container {
          width: 210mm;
          min-height: 297mm;
          background: white;
          box-shadow: none;
        }
        
        /* Reset all elements for print */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
      
      /* Screen styles */
      @media screen {
        .a4-container {
          width: 210mm;
          min-height: 297mm;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          overflow: hidden;
        }
      }
    `;

  return (
    <>
      <style>{printStyles}</style>
      <div ref={ref} className={cn("a4-container", className)}>
        <SelectedTemplate data={data} />
      </div>
    </>
  );
});

ResumePreview.displayName = "ResumePreview";
