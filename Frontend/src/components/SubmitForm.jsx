import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getGeolocation } from './Geolocation';
import { createReport } from '../../../Backend/controllers/reportcontroller';

const ReportForm = () => {
  const initialValues = {
    type: '',
    location: '',
    time: '',
    description: '',
    media: null,
    isAnonymous: false,
  };

  const validationSchema = Yup.object({
    type: Yup.string().required('Type of crime is required'),
    location: Yup.string().required('Location is required'),
    time: Yup.date().required('Time is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleGeolocation = async (setFieldValue) => {
    const position = await getGeolocation();
    const location = `${position.coords.latitude}, ${position.coords.longitude}`;
    setFieldValue('location', location);
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      latitude: values.location.split(',')[0].trim(),
      longitude: values.location.split(',')[1].trim(),
      crimeplace: values.location, // Adjust as necessary for actual crimeplace
      severity: 'High', // Set the severity statically or add a field for it
      type: values.type,
      description: values.description,
      crimetime: new Date(values.time).toISOString(),
      userId: '60b8d6c8f1b2b74e4f8b4567', // Replace with actual user ID
      media: values.media ? values.media.name : null, // Handle media appropriately
      isAnonymous: values.isAnonymous,
    };

    console.log(formattedValues);
    // Submit formattedValues to the backend here
    const data = await createReport(formattedValues)
    console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto p-4 my-[4rem] border bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">Submit a Crime Report</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            <div className="text-left mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Type of Crime
              </label>
              <Field
                name="type"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="text-left">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <Field
                name="location"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
              <button
                type="button"
                onClick={() => handleGeolocation(setFieldValue)}
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Use Current Location
              </button>
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Field
                name="time"
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Media Upload
              </label>
              <input
                name="media"
                type="file"
                onChange={(event) => {
                  setFieldValue('media', event.currentTarget.files[0]);
                }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="text-left gap-2 items-center flex">
              <label className="block text-sm font-medium text-gray-700">
                Report Anonymously
              </label>
              <Field
                name="isAnonymous"
                type="checkbox"
                className="mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit Report
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReportForm;
