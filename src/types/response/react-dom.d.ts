declare module 'react-dom' {
    export const createRoot: (element: HTMLElement) => {
      render: (element: React.ReactElement) => void;
    };
  }