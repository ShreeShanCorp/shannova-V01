import fs from "fs";
import zlib from "zlib";

// Read docx (zip file format)
const buffer = fs.readFileSync("d:/SHAN PROJECTS/shannova_version01/ShanNova_FullStack_Training_Program_Finalized.docx");

// Simple unzipper for word/document.xml
// In zip files, local file header starts with PK\x03\x04
let offset = 0;
let documentXml = "";

while (offset < buffer.length - 4) {
  if (buffer.readUInt32LE(offset) === 0x04034b50) {
    const fileNameLen = buffer.readUInt16LE(offset + 26);
    const extraLen = buffer.readUInt16LE(offset + 28);
    const compMethod = buffer.readUInt16LE(offset + 8);
    const compSize = buffer.readUInt32LE(offset + 18);
    const uncompSize = buffer.readUInt32LE(offset + 22);
    
    const fileName = buffer.toString("utf8", offset + 30, offset + 30 + fileNameLen);
    const dataStart = offset + 30 + fileNameLen + extraLen;
    
    if (fileName === "word/document.xml") {
      const compressedData = buffer.subarray(dataStart, dataStart + compSize);
      if (compMethod === 8) {
        documentXml = zlib.inflateRawSync(compressedData).toString("utf8");
      } else {
        documentXml = compressedData.toString("utf8");
      }
      break;
    }
    offset = dataStart + compSize;
  } else {
    offset++;
  }
}

if (documentXml) {
  // Extract text from <w:t> tags
  const texts = [];
  const regex = /<w:t[^>]*>(.*?)<\/w:t>/g;
  let match;
  while ((match = regex.exec(documentXml)) !== null) {
    texts.push(match[1]);
  }
  
  // Also preserve paragraph breaks from <w:p>
  const cleanText = documentXml
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "");

  fs.writeFileSync("d:/SHAN PROJECTS/shannova_version01/extracted_course_clean.txt", cleanText);
  console.log("SUCCESS! Extracted characters:", cleanText.length);
} else {
  console.log("Could not find word/document.xml in docx.");
}
