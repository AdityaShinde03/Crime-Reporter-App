// src/components/report/ReportForm.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getGeolocation } from '../Geolocation';

const validationSchema = Yup.object({
  type: Yup.string().required('Type of crime is required'),
  location: Yup.string().required('Location is required'),
  time: Yup.string().required('Time is required'),
  description: Yup.string().required('Description is required'),
  media: Yup.mixed().nullable(),
});

const ReportForm = ({ onSubmit }) => {
  const [geolocation, setGeolocation] = useState({ lat: '', lng: '' });

  const formik = useFormik({
    initialValues: {
      type: '',
      location: '',
      time: '',
      description: '',
      media: null,
      isAnonymous: false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleGeolocation = async () => {
    const position = await getGeolocation();
    setGeolocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    formik.setFieldValue('location', `${position.coords.latitude}, ${position.coords.longitude}`);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="report-form space-y-4">
      <h2 className="text-xl font-bold mb-4">Submit a Crime Report</h2>

      <div>
        <label className="block text-sm font-medium">
          Type of Crime:
          <input
            type="text"
            {...formik.getFieldProps('type')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </label>
        {formik.touched.type && formik.errors.type ? (
          <div className="text-red-600 text-sm">{formik.errors.type}</div>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Location:
          <input
            type="text"
            {...formik.getFieldProps('location')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          <button
            type="button"
            onClick={handleGeolocation}
            className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
          >
            Use Current Location
          </button>
        </label>
        {formik.touched.location && formik.errors.location ? (
          <div className="text-red-600 text-sm">{formik.errors.location}</div>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Time:
          <input
            type="datetime-local"
            {...formik.getFieldProps('time')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </label>
        {formik.touched.time && formik.errors.time ? (
          <div className="text-red-600 text-sm">{formik.errors.time}</div>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Description:
          <textarea
            {...formik.getFieldProps('description')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </label>
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-600 text-sm">{formik.errors.description}</div>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Media Upload:
          <input
            type="file"
            name="media"
            onChange={(event) => formik.setFieldValue('media', event.currentTarget.files[0])}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </label>
      </div>

      <div>
        <label className="inline-flex items-center text-sm font-medium">
          <input
            type="checkbox"
            {...formik.getFieldProps('isAnonymous')}
            className="form-checkbox"
          />
          <span className="ml-2">Report Anonymously</span>
        </label>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Submit Report
      </button>
    </form>
  );
};

export default ReportForm;
