import React from 'react';
import { Button } from '../Button/Button';

interface IModalProps {
  isShowing: boolean;
  hide: () => void;
  title: string;
  children: React.ReactNode;
  disabled: boolean;
  handleSubmit: () => void;
  submitBtnText?: string;
}

const Modal: React.FC<IModalProps> = ({
  isShowing,
  hide,
  title = 'DEFAULT TITLE',
  children,
  disabled,
  handleSubmit,
  submitBtnText = 'SUBMIT',
}) =>
  isShowing ? (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-dark-500 bg-opacity-50">
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-dark-400 rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                hide();
              }}>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">{children}</div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                hide();
              }}>
              Cansel
            </Button>
            <button
              disabled={disabled}
              onClick={handleSubmit}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed">
              {submitBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

export default Modal;
