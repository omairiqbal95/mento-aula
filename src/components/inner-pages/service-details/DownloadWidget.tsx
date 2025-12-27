import DownloadIcon from "@/icons/DownloadIcon";

interface DownloadWidgetProps {
  buttonText: string;
  downloadHref: string;
  fileName: string;
}

const DownloadWidget = ({ buttonText, downloadHref, fileName }: DownloadWidgetProps) => {
  return (
    <div className="widget__item widget__download">
      <a
        className="download-btn"
        href={downloadHref}
        download={fileName}
        role="button"
      >
        <span>{buttonText}</span>
        <DownloadIcon />
      </a>
    </div>
  );
};

export default DownloadWidget;
