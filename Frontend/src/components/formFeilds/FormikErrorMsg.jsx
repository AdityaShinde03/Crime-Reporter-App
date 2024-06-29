import { ErrorMessage } from "formik";

const FormikErrorMsg = ({ name, component,className }) => {
  return (
    <div>
      <ErrorMessage 
      name={name} 
      component={component} 
      className={`${className ? className : 'text-red-500 text-sm'}`}
      />
    </div>
  );
};

export default FormikErrorMsg;
