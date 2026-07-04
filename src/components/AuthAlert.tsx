// ponytail: server component — conditional rendering, no client JS

const ERROR_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const SUCCESS_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 py-2.5 px-3.5 mb-4 rounded-2 bg-[#FEF2F2] border border-danger text-[13px] font-medium leading-normal animate-[slideDown_0.2s_ease]" role="alert">
      {ERROR_ICON}
      {message}
    </div>
  );
}

export function AuthSuccess({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 py-2.5 px-3.5 mb-4 rounded-2 bg-[#F0FDF4] border border-success text-[13px] font-medium leading-normal animate-[slideDown_0.2s_ease]" role="status">
      {SUCCESS_ICON}
      {message}
    </div>
  );
}
