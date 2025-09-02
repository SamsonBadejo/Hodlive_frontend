
import { FiAlertCircle } from "react-icons/fi";

const ErrorMessages = ({ errorMsg, errorDes }) => {
  return (
    <div>
      <section className="h-[50vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <FiAlertCircle className="mx-auto text-red-500" size={56} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {errorMsg}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
            {errorDes}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ErrorMessages;
