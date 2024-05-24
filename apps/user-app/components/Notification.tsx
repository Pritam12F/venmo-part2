interface AlertProps {
  title: string;
  message: string;
  handleClose: () => void;
}

export default function Alert({ title, message, handleClose }: AlertProps) {
  return (
    <div className="fixed top-4 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-md bg-white p-4 shadow-lg ">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
          <BellIcon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="mt-1 text-sm text-gray-500 ">{message}</p>
        </div>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          onClick={handleClose}
        >
          <XIcon className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
